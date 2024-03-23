import { State } from '@hookstate/core';

interface Props {
  answer: State<string>;
  loading: boolean;
}
export const AnswerViewSutra = ({ answer, loading }: Props) => {
  return (
    <div className="prose prose-xl prose-p:leading-normal max-w-[600px] leading-normal text-black">
      {answer.get() + (loading && answer.get().length > 0 ? '●' : '')}
    </div>
  );
};
