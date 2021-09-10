import type { ILogger } from "@thi.ng/api";
import { NULL_LOGGER } from "@thi.ng/api/logger";

/**
 * Unique symbol used for registering a default / fallback
 * implementation.
 */
export const DEFAULT: unique symbol = Symbol();

export let LOGGER: ILogger = NULL_LOGGER;

export const setLogger = (logger: ILogger) => (LOGGER = logger);
