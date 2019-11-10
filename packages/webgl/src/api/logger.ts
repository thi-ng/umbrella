import { ILogger, NULL_LOGGER } from "@thi.ng/api";

export let LOGGER: ILogger = NULL_LOGGER;

export const setLogger = (logger: ILogger) => (LOGGER = logger);
