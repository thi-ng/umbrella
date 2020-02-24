import type { ILogger } from "@thi.ng/api";

export const EVENT_ADDED = "added";
export const EVENT_PRE_DELETE = "pre-delete";
export const EVENT_CHANGED = "changed";

export let LOGGER: ILogger | null = null;

export const setLogger = (logger: ILogger) => (LOGGER = logger);
