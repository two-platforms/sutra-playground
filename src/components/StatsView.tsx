import { Chip } from '@nextui-org/react';
import { useAtom, PrimitiveAtom } from 'jotai';
import { SutraStats } from '../service/SutraModels';

interface Props {
  statsAtom: PrimitiveAtom<SutraStats>;
  temperature: number;
  maxTokens: number;
}
export const StatsView = ({ statsAtom, temperature, maxTokens }: Props) => {
  const [stats] = useAtom(statsAtom);
  return (
    <div>
      LLM MSEC: <Chip color="primary">{stats.ttltService - stats.ttftService}</Chip> |
      TEMPERATURE: <Chip>{temperature}</Chip> |
      MAX TOKENS: <Chip color="success">{maxTokens}</Chip>
    </div>
  );
};
