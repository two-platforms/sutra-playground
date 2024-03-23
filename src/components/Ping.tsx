import * as React from 'react';
import axios from 'axios';

import { K } from '../utils/K';
import { log } from '../utils/log';

export default function Ping() {
  const [ping, setPing] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${K.SUTRA_SERVICE_US.replace('sutra', 'ping')}`).then((response) => {
      setPing(response.data);
      log.debug({ ping });
    });
  }, []);

  if (!ping) return null;

  return <>{ping['httpCode']}</>;
}
