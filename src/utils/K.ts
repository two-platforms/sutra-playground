export const DEBUG_LEVEL = 0;
export const INFO_LEVEL = 1;
export const WARN_LEVEL = 2;
export const ERROR_LEVEL = 3;
export const FATAL_LEVEL = 4;

const DEBUG_MODE_DISABLED = import.meta.env.VITE_DEBUG_MODE === 'false';

export const K = {
    // SUTRA_SERVICE: 'http://192.168.21.38:7010/sutra',
    SUTRA_SERVICE: 'https://sutra-server-tmwuc6vstq-uw.a.run.app/sutra',
    // SUTRA_SERVICE: 'https://api.two.ai/sutra',

    LOG_LEVEL: DEBUG_MODE_DISABLED ? WARN_LEVEL : INFO_LEVEL,
};
