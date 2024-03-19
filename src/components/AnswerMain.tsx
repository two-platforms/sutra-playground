
import { State } from "@hookstate/core";

interface Props {
  answer: State<string>;
}
export const AnswerMain = ({ answer }: Props) => {

  return (
    <div className="prose prose-xl prose-p:leading-normal max-w-[600px] leading-normal text-black">
      {answer.get() + (answer.get().length > 0 ? "●●" : "")}
    </div>
  );
};
