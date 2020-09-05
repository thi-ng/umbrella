import { ILogger, NULL_LOGGER } from "@thi.ng/api";

/**
 * Unique symbol used for registering a default / fallback
 * implementation.
 */
export const DEFAULT: unique symbol = Symbol();

export let LOGGER: ILogger = NULL_LOGGER;

export const setLogger = (logger: ILogger) => (LOGGER = logger);
