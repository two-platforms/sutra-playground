import React from "react";
import { useHookstate } from "@hookstate/core";
import { useAtom, PrimitiveAtom } from "jotai";

import { LLMChunk, LLMReply, MultilingualUserInput } from "@two-platforms/ion-multilingual-types";

import { AnswerMain } from "./AnswerMain";
import { userInputAtom } from "../state/atoms";
import { Sutra, SutraCallbacks } from "../service/SutraClient";
import { SutraModel } from "../service/SutraModels";
import { log } from "../utils/log";

export function OutputView(props: { modelAtom: PrimitiveAtom<SutraModel> }) {
  const answer = useHookstate("");
  const [, setLoading] = React.useState(false);
  const [, setAnswer] = React.useState("");

  // from jotaiState
  const [userInput, setUserInput] = useAtom(userInputAtom);
  const [model] = useAtom(props.modelAtom);

  React.useEffect(() => {
    sendToSutra(userInput);
  }, [userInput]);

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
    setUserInput("");

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
        <div className="flex w-full  max-w-screen-sm flex-col gap-2 py-16">
          <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-5">
            <AnswerMain answer={answer} />
          </div>
        </div>
      </>
    </React.Fragment>
  );
}
