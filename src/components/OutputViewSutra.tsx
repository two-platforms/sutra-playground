import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useAtom } from 'jotai';

import { LLMChunk, LLMReply } from '@two-platforms/ion-multilingual-types';

import { AnswerView } from './AnswerView';
import { Sutra, SutraCallbacks } from '../service/SutraClient';
import { buildCompletionRequest } from '../service/SutraModels';
import { log } from '../utils/log';
import { sutraLoadingAtom, sutraModelAtom, sutraStatsAtom, userInputAtom } from '../state/atoms';

export function OutputViewSutra() {
  const answer = useHookstate('');
  const [, setAnswer] = React.useState('');
  const timerStart = React.useRef(0);
  const ttftClient = React.useRef(0);

  // from jotaiState
  const [loading, setLoading] = useAtom(sutraLoadingAtom);
  const [model] = useAtom(sutraModelAtom);
  const [stats, setStats] = useAtom(sutraStatsAtom);
  const [userInput] = useAtom(userInputAtom);

  // console.log('OutputView', props.userInput);
  React.useEffect(() => {
    console.log('useEffect', userInput);
    if (userInput.length === 0) return;
    sendToSutra(userInput);
  }, [userInput]);

  // callbacks for streaming mode
  const sutraCallbacks: SutraCallbacks = {
    onLLMChunk: async (v: LLMChunk) => {
      if (!ttftClient.current) {
        ttftClient.current = Date.now() - timerStart.current;;
        // const ttft = Date.now() - timerStart.current;
        // const newStats = { ...stats, ttftClient: 900 }; //ttft };
        // setStats(newStats);
      }
      answer.set((current) => current + v.content);
      // log.info(`${model.provider}: onLLMChunk:`, v.content);
      if (v.isFinal) setLoading(false);
      // await sleep(10);
    },
    onLLMReply: (v: LLMReply) => {
      const ttlt = Date.now() - timerStart.current;
      const tps = (1000 * v.tokenCount) / (v.ttltMsec - v.ttftMsec);
      const newStats = {
        ...stats,
        ttftClient: ttftClient.current,
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
    },
    onError: (v: string) => {
      log.error(`${model.provider}: onError:`, v);
      setLoading(false);
    },
  };

  const sendToSutra = async (newText: string) => {
    timerStart.current = Date.now();
    ttftClient.current = 0;
    answer.set('');
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
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }
