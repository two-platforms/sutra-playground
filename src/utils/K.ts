export const DEBUG_LEVEL = 0;
export const INFO_LEVEL = 1;
export const WARN_LEVEL = 2;
export const ERROR_LEVEL = 3;
export const FATAL_LEVEL = 4;

const DEBUG_MODE_DISABLED = import.meta.env.VITE_DEBUG_MODE === 'false';

export const K = {
    // for testing
    // SUTRA_SERVICE_US: 'http://192.168.21.38:7010/sutra',
    // SUTRA_SERVICE_US: 'https://sutra-server-tmwuc6vstq-uw.a.run.app/sutra',

    // modify as deployed
    SUTRA_SERVICE_US: 'https://api.two.ai/sutra',
    SUTRA_SERVICE_IN: 'https://api.two.ai/sutra',
    SUTRA_SERVICE_KR: 'https://api.two.ai/sutra',

    LOG_LEVEL: DEBUG_MODE_DISABLED ? WARN_LEVEL : INFO_LEVEL,
};
