import type { ILogger } from "@thi.ng/api";
import { NULL_LOGGER } from "@thi.ng/api/logger";

export let LOGGER: ILogger = NULL_LOGGER;

export const setLogger = (logger: ILogger) => (LOGGER = logger);
