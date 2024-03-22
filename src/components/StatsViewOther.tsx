import { Tooltip } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { DashboardDots } from 'iconoir-react';

import { otherStatsAtom } from '../state/atoms';

export const StatsViewOther = () => {
  const [stats] = useAtom(otherStatsAtom);

  const tokenCountString =  (): string => {
    const { tokenCount } = stats;
    if (tokenCount === 0) return '-';
    return `${tokenCount}`;
  }

  const tpsString = (): string => {
    const { ttftService, ttltService, tokenCount } = stats;
    if (tokenCount === 0) return '-';
    if (ttftService === 0 || ttltService === 0) return '-';
    const tps = (ttftService === ttftService) ? (1000 * tokenCount) / ttltService : (1000 * tokenCount) / (ttltService - ttftService);
    return `${tps.toFixed(2)}`
  }

  return (
    <div className="flex flex-row items-center gap-2 font-mono text-sm">
      <Tooltip content={stats.enTranslation} placement="top" className=" max-w-96">
        <DashboardDots />
      </Tooltip>
      |
      <div>
        <b>{tpsString()}</b> TOKENS/SEC
      </div>
      |
      <div>
        <b>{tokenCountString()}</b> TOKENS
      </div>
      |
      <div>
        <b>{stats.ttftService}</b>ms 1ST TOKEN
      </div>
      |
      <div>
        <b>{stats.ttltService}</b> MSEC
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
