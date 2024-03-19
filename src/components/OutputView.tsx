import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useAtom, PrimitiveAtom } from 'jotai';

import { LLMChunk, LLMReply, MultilingualUserInput } from '@two-platforms/ion-multilingual-types';

import { AnswerMain } from './AnswerMain';
import { Sutra, SutraCallbacks } from '../service/SutraClient';
import { SutraModel } from '../service/SutraModels';
import { log } from '../utils/log';



export function OutputView(props: { modelAtom: PrimitiveAtom<SutraModel>; userInput: string }) {
  const answer = useHookstate('');
  const [, setLoading] = React.useState(false);
  const [, setAnswer] = React.useState('');

  // from jotaiState
  const [model] = useAtom(props.modelAtom);

  console.log('OutputView', props.userInput);
  React.useEffect(() => {
    console.log('useEffect', props.userInput);
    if (props.userInput.length === 0) return;
    sendToSutra(props.userInput);
  }, [props.userInput]);

  // callbacks for streaming mode
  const sutraCallbacks: SutraCallbacks = {
    onLLMChunk: (v: LLMChunk) => {
      answer.set((current) => current + v.content);
      log.info(`${model.provider}: onLLMChunk:`, v.content);
      if (v.isFinal) setLoading(false);
    },
    onLLMReply: (v: LLMReply) => {
      //setllmMsec(v.llmMsec);
      log.info(`${model.provider}: onLLMReply:`, v);
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
    const request: MultilingualUserInput = {
      ...model,
      prompt: newText,
    };

    setLoading(true);
    await Sutra.postComplete(request, sutraCallbacks);
  };

  return (
    <React.Fragment>
      <>
        <AnswerMain answer={answer} />
      </>
    </React.Fragment>
  );
}
