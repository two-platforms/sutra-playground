import * as React from 'react';
import { useAtom } from 'jotai';

import { Sutra } from '../service/SutraClient';
import { serviceURLAtom } from '../state/atoms';

export default function Ping() {
  const [pingTime, setPingTime] = React.useState(0);

  // from jotaiState
  const [serviceURL] = useAtom(serviceURLAtom);

  const pingTimeString = () => {
    if (pingTime === 0) return '-';
    return `${pingTime} ms`;
  };

  React.useEffect(() => {
    const getPing = async () => {
      const newTime = await Sutra.ping(serviceURL);
      if (newTime) setPingTime(newTime);
    };
    getPing();
  }, [serviceURL]);

  return <>Ping: {pingTimeString()}</>;
}
