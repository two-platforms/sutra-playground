// import { State } from '@hookstate/core';

interface Props {
  answer: string;
  loading: boolean;
}
export const AnswerViewSutra = ({ answer, loading }: Props) => {
  return (
    <div className="prose prose-xl prose-p:leading-normal max-w-[600px] leading-normal text-black">
      {answer + (loading && answer.length > 0 ? '●' : '')}
    </div>
  );
};
