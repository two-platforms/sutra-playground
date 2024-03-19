import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useAtom, PrimitiveAtom } from 'jotai';

import { LLMChunk, LLMReply } from '@two-platforms/ion-multilingual-types';

import { AnswerView } from './AnswerView';
import { Sutra, SutraCallbacks } from '../service/SutraClient';
import { SutraModel, SutraStats, buildCompletionRequest } from '../service/SutraModels';
import { log } from '../utils/log';
import { otherLoadingAtom, otherStatsAtom } from '../state/atoms';

export function OutputViewSutra(props: { modelAtom: PrimitiveAtom<SutraModel>; statsAtom: PrimitiveAtom<SutraStats>, userInput: string }) {
  const answer = useHookstate('');
  const [loading, setLoading] = useAtom(otherLoadingAtom);
  const [, setAnswer] = React.useState('');

  // from jotaiState
  const [model] = useAtom(props.modelAtom);
  const [stats, setStats] = useAtom(props.statsAtom);

  let timerStart = 0;
  let haveFirstToken = false;

  // console.log('OutputView', props.userInput);
  React.useEffect(() => {
    console.log('useEffect', props.userInput);
    if (props.userInput.length === 0) return;
    sendToSutra(props.userInput);
  }, [props.userInput]);

  // callbacks for streaming mode
  const sutraCallbacks: SutraCallbacks = {
    onLLMChunk: (v: LLMChunk) => {
      if(!haveFirstToken) {
        haveFirstToken = true;
        const ttft = Date.now() - timerStart;
        const newStats = {...stats, ttftClient: ttft};
        setStats(newStats);
      }
      answer.set((current) => current + v.content);
      log.info(`${model.provider}: onLLMChunk:`, v.content);
      if (v.isFinal) setLoading(false);
    },
    onLLMReply: (v: LLMReply) => {
      const ttlt = Date.now() - timerStart;
      const tps = 1000 * v.tokenCount / (ttlt - stats.ttftClient);
      const newStats = {...stats, tokenCount: v.tokenCount, wordCount: v.wordCount, ttltClient: ttlt, tps};
      setStats(newStats);
      log.info(`${model.provider}: onLLMReply:`, v);
      log.info(`${model.provider}: onLLMReply:`, newStats);
      if (v.isFinal) {
        setAnswer(answer.get());
        setLoading(false);
      }
    },
    onError: (v: string) => {
      log.error(`${model.provider}: onError:`, v);
      setLoading(false);
    },
  };

  const sendToSutra = async (newText: string) => {
    timerStart = Date.now();
    answer.set('');
    haveFirstToken = false;
    const request = buildCompletionRequest(newText, model);
    setLoading(true);
    await Sutra.postComplete(request, sutraCallbacks);
  };

  return (
    <React.Fragment>
      <AnswerView answer={answer} loading={loading} />
    </React.Fragment>
  );
}
