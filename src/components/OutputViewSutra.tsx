import React from 'react';
import { useAtom } from 'jotai';

import { LLMChunk, LLMReply } from '@two-platforms/ion-multilingual-types';

import { AnswerViewSutra } from './AnswerViewSutra';
import { Sutra, SutraCallbacks } from '../service/SutraClient';
import { buildCompletionRequest } from '../service/SutraModels';
import { log } from '../utils/log';
import {
  serviceURLAtom,
  searchLocationAtom,
  sutraLoadingAtom,
  sutraModelAtom,
  sutraStatsAtom,
  sutraUserInputAtom,
} from '../state/atoms';

export function OutputViewSutra() {
  const [answer, setAnswer] = React.useState('');
  const timerStart = React.useRef(0);
  const haveFirstToken = React.useRef(false);

  // from jotaiState
  const [serviceURL] = useAtom(serviceURLAtom);
  const [searchLocation] = useAtom(searchLocationAtom);
  const [loading, setLoading] = useAtom(sutraLoadingAtom);
  const [model] = useAtom(sutraModelAtom);
  const [stats, setStats] = useAtom(sutraStatsAtom);
  const [sutraUserInput] = useAtom(sutraUserInputAtom);

  React.useEffect(() => {
    const sendToSutra = async () => {
      timerStart.current = Date.now();
      haveFirstToken.current = false;
      setAnswer('');
      const request = buildCompletionRequest(sutraUserInput, model);
      setLoading(true);
      Sutra.postComplete(serviceURL, request, sutraCallbacks, searchLocation);
    };
    if (sutraUserInput.length === 0) return;
    sendToSutra();
  }, [model, sutraUserInput]);

  // callbacks for streaming mode
  // const sutraCallbacks: SutraCallbacks = React.useMemo(() => ({
  const sutraCallbacks: SutraCallbacks = {
    onLLMChunk: (v: LLMChunk) => {
      if (!haveFirstToken.current) {
        haveFirstToken.current = true;
        const ttft = Date.now() - timerStart.current;
        const newStats = { ...stats, ttftClient: ttft };
        setStats(newStats);
      }
      setAnswer((current) => current + v.content);
      if (v.isFinal) setLoading(false);
    },
    onLLMReply: (v: LLMReply) => {
      const ttlt = Date.now() - timerStart.current;
      const tps = (1000 * v.tokenCount) / (ttlt - stats.ttftClient);
      const newStats = {
        ...stats,
        ttltClient: ttlt,
        tps,
        tokenCount: v.tokenCount,
        wordCount: v.wordCount,
        ttftService: v.ttftMsec,
        ttltService: v.ttltMsec,
        enTranslation: v.enOutput,
      };
      setStats(newStats);
      console.log('sutra', newStats);
      if (v.isFinal) {
        setLoading(false);
      }
    },
    onError: (v: string) => {
      log.error(`${model.provider}: onError:`, v);
      setLoading(false);
    },
  };

  return (
    <React.Fragment>
      <AnswerViewSutra answer={answer} loading={loading} />
    </React.Fragment>
  );
}
