import { ILogger, LogLevel } from "./api.js";

/**
 * No-op {@link ILogger} implementation, used as default logger for most
 * packages (where used).
 */
export const NULL_LOGGER: ILogger = Object.freeze({
    level: LogLevel.NONE,
    fine() {},
    debug() {},
    info() {},
    warn() {},
    severe() {},
});
