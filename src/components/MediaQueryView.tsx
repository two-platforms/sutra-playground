import React from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useAtom } from 'jotai';
import { isMobileAtom } from '../state/atoms';

export function MediaQueryView() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [, setIsMobile] = useAtom(isMobileAtom);

  React.useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile]);

  return <></>;
}
