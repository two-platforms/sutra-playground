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
      LLM MSEC: <Chip color="primary">{stats.ttltService}</Chip> |
      E2E MSEC:{' '} <Chip color="primary">{stats.ttltClient}</Chip> |
      TEMPERATURE: <Chip>{temperature}</Chip> |
      MAX TOKENS: <Chip>{maxTokens}</Chip> |
      OUTPUT TOKENS: <Chip color="success">{stats.tokenCount}</Chip>|
      TOKENS/SEC:{' '} <Chip color="success">{stats.tps.toFixed(2)}</Chip>
    </div>
  );
};
