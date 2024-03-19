import { K, DEBUG_LEVEL, INFO_LEVEL, WARN_LEVEL, ERROR_LEVEL, FATAL_LEVEL } from "./K";

export const log = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (...args: any[]) => {
        if (DEBUG_LEVEL >= K.LOG_LEVEL) console.debug(...args);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: (...args: any[]) => {
        if (INFO_LEVEL >= K.LOG_LEVEL) console.log(...args);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn: (...args: any[]) => {
        if (WARN_LEVEL >= K.LOG_LEVEL) console.warn(...args);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (...args: any[]) => {
        if (ERROR_LEVEL >= K.LOG_LEVEL) console.error(...args);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fatal: (...args: any[]) => {
        if (FATAL_LEVEL >= K.LOG_LEVEL) console.error(...args);
    },
};
