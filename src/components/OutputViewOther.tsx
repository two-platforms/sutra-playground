import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useAtom } from 'jotai';

import { LLMChunk, LLMReply } from '@two-platforms/ion-multilingual-types';

import { AnswerView } from './AnswerView';
import { Sutra, SutraCallbacks } from '../service/SutraClient';
import { buildCompletionRequest } from '../service/SutraModels';
import { log } from '../utils/log';
import { otherLoadingAtom, otherModelAtom, otherStatsAtom, userInputAtom } from '../state/atoms';

export function OutputViewOther() {
  const answer = useHookstate('');
  const [, setAnswer] = React.useState('');

  // from jotaiState
  const [loading, setLoading] = useAtom(otherLoadingAtom);
  const [model] = useAtom(otherModelAtom);
  const [stats, setStats] = useAtom(otherStatsAtom);
  const [userInput] = useAtom(userInputAtom);

  let timerStart = 0;
  let haveFirstToken = false;

  // console.log('OutputView', props.userInput);
  React.useEffect(() => {
    console.log('useEffect', userInput);
    if (userInput.length === 0) return;
    sendToSutra(userInput);
  }, [userInput]);

  // callbacks for streaming mode
  const sutraCallbacks: SutraCallbacks = {
    onLLMChunk: async (v: LLMChunk) => {
      if (!haveFirstToken) {
        haveFirstToken = true;
        const ttft = Date.now() - timerStart;
        const newStats = { ...stats, ttftClient: ttft };
        setStats(newStats);
      }
      answer.set((current) => current + v.content);
      // log.info(`${model.provider}: onLLMChunk:`, v.content);
      if (v.isFinal) setLoading(false);
      // await sleep(10);
    },
    onLLMReply: (v: LLMReply) => {
      const ttlt = Date.now() - timerStart;
      const tps = (1000 * v.tokenCount) / (v.ttltMsec - v.ttftMsec);
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
      // log.info(`${model.provider}: onLLMReply:`, v);
      log.info(`${model.provider}: onLLMReply:`, newStats);
      if (v.isFinal) {
        setAnswer(answer.get());
        setLoading(false);
      }
      if (v.wordCount > 10) {
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
    Sutra.postComplete(request, sutraCallbacks);
  };

  return (
    <React.Fragment>
      <AnswerView answer={answer} loading={loading} />
    </React.Fragment>
  );
}

// function sleep(ms: number): Promise<void> {
//   return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//   });
// }
