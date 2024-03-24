import { Divider, Tooltip } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { DashboardDots } from 'iconoir-react';

import { sutraStatsAtom } from '../state/atoms';

export const StatsViewSutra = () => {
  const [stats] = useAtom(sutraStatsAtom);

  const tokenCountString = (): string => {
    const { tokenCount } = stats;
    if (tokenCount === 0) return '-';
    return `${tokenCount}`;
  };

  const tpsString = (): string => {
    const { ttftService, ttltService, tokenCount } = stats;
    if (tokenCount === 0) return '-';
    if (ttftService === 0 || ttltService === 0) return '-';

    const tps =
      ttftService === ttftService
        ? (1000 * tokenCount) / ttltService
        : (1000 * tokenCount) / (ttltService - ttftService);
    return `${tps.toFixed(2)}`;
  };

  const serviceSecsString = (): string => {
    const { ttftService, ttltService } = stats;
    if (ttftService === 0 || ttltService === 0) return `0`;

    const serviceSecs = ttftService === ttftService ? ttltService / 1000 : (ttltService - ttftService) / 1000;
    return `${serviceSecs.toFixed(2)}`;
  };

  return (
    <div className="flex flex-row items-center gap-4 font-mono text-sm">
      <Tooltip content={stats.enTranslation} placement="top" className="max-w-96">
        <DashboardDots className="ml-1" />
      </Tooltip>
      <Divider orientation="vertical" className="h-10" />
      <div>
        <div className="text-medium font-bold">{tpsString()}</div>
        <div>TOKENS/SEC</div>
      </div>
      <Divider orientation="vertical" className="h-10" />
      <div>
        <div className="text-medium font-bold">{tokenCountString()}</div>
        <div>TOKENS</div>
      </div>
      <Divider orientation="vertical" className="h-10" />
      <div>
        <div className="text-medium font-bold">{stats.wordCount}</div>
        <div>WORDS</div>
      </div>
      <Divider orientation="vertical" className="h-10" />
      <div>
        <div className="text-medium font-bold">{stats.ttftService} ms</div>
        <div>1ST TOKEN</div>
      </div>
      <Divider orientation="vertical" className="h-10" />
      <div>
        <div className="text-medium font-bold">{serviceSecsString()} sec</div>
        <div>TOTAL</div>
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
