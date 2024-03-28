import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface Props {
  answer: string;
  loading: boolean;
}
export const AnswerViewSutra = ({ answer, loading }: Props) => {
  return (
    <div className="prose prose-xl prose-p:leading-normal max-w-[600px] text-black">
      <Markdown remarkPlugins={[remarkGfm, remarkMath]}>{answer + (loading && answer.length > 0 ? '●' : '')}</Markdown>
    </div>
  );
};
