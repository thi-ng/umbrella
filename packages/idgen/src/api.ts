import type { EVENT_ALL } from "@thi.ng/api";

export const EVENT_ADDED = "added";
export const EVENT_REMOVED = "removed";

export type IDGenEventType =
	| typeof EVENT_ADDED
	| typeof EVENT_REMOVED
	| typeof EVENT_ALL;
