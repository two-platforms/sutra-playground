import { Tooltip } from '@nextui-org/react';
import { useAtom, PrimitiveAtom } from 'jotai';
import { SutraStats } from '../service/SutraModels';
import { DashboardDots } from 'iconoir-react';

interface Props {
  statsAtom: PrimitiveAtom<SutraStats>;
  temperature: number;
  maxTokens: number;
}
export const StatsView = ({ statsAtom }: Props) => {
  const [stats] = useAtom(statsAtom);
  return (
    <div className="flex flex-row items-center gap-2 font-mono text-sm">
      <Tooltip content={stats.enTranslation} placement="top" className=" max-w-96">
        <DashboardDots />
      </Tooltip>
      |
      <div>
        <b>{stats.tps.toFixed(2)}</b> TOKENS/SEC
      </div>
      |
      <div>
        <b>{stats.tokenCount}</b> TOKENS
      </div>
      |
      <div>
        <b>{stats.ttftService}</b>ms 1ST TOKEN
      </div>
      |
      <div>
        <b>{(stats.ttltService/1000).toFixed(2)}</b> SEC
      </div>
      {/* <Chip size="md" color="primary">
        {stats.tps.toFixed(2)} Tokens/Sec
      </Chip>
      -<Chip size="md">{stats.tokenCount} Tokens</Chip>-<Chip size="md">{stats.ttftService}ms TTFB</Chip>-
      <Chip size="md" color="secondary">
        {stats.ttltService}ms TTLB
      </Chip>
      <Tooltip content={stats.enTranslation} placement="top" className=' max-w-96'>
      <Chip size="md">E</Chip>
      </Tooltip> */}
      {/* TEMPERATURE: <Chip size='sm'>{temperature}</Chip>
      MAX TOKENS: <Chip size='sm'>{maxTokens}</Chip> */}
    </div>
  );
};
