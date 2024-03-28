import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface Props {
  answer: string;
  loading: boolean;
}
export const AnswerViewOther = ({ answer, loading }: Props) => {
  return (
    <div className="prose prose-lg prose-p:leading-normal md:prose-xl max-w-[600px] leading-normal text-black">
      <Markdown remarkPlugins={[remarkGfm, remarkMath]}>{answer + (loading && answer.length > 0 ? '●' : '')}</Markdown>
    </div>
  );
};
