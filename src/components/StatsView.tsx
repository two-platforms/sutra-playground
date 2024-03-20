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
    <div className='text-sm font-mono'>
      <Chip size='md' color="primary">{stats.tps.toFixed(2)} Tokens/Sec</Chip>-
      <Chip size='md'>{stats.tokenCount} Tokens</Chip>-
      <Chip size='md'>{stats.ttftService}ms TTFB</Chip>-
      <Chip size='md' color="secondary">{stats.ttltService}ms TTLB</Chip>
      {/* TEMPERATURE: <Chip size='sm'>{temperature}</Chip>
      MAX TOKENS: <Chip size='sm'>{maxTokens}</Chip> */}
    </div>
  );
};
