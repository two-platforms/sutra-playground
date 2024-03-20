import { Chip, Tooltip } from '@nextui-org/react';
import { useAtom, PrimitiveAtom } from 'jotai';
import { SutraStats } from '../service/SutraModels';

interface Props {
  statsAtom: PrimitiveAtom<SutraStats>;
  temperature: number;
  maxTokens: number;
}
export const StatsView = ({ statsAtom }: Props) => {
  const [stats] = useAtom(statsAtom);
  return (
    <div className="font-mono text-sm">

      <Chip size="md" color="primary">
        {stats.tps.toFixed(2)} Tokens/Sec
      </Chip>
      -<Chip size="md">{stats.tokenCount} Tokens</Chip>-<Chip size="md">{stats.ttftService}ms TTFB</Chip>-
      <Chip size="md" color="secondary">
        {stats.ttltService}ms TTLB
      </Chip>
      <Tooltip content={stats.enTranslation} placement="top" className=' max-w-96'>
      <Chip size="md">En</Chip>
      </Tooltip>
      {/* TEMPERATURE: <Chip size='sm'>{temperature}</Chip>
      MAX TOKENS: <Chip size='sm'>{maxTokens}</Chip> */}
    </div>
  );
};
