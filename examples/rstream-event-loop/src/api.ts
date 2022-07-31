import type { Val1 } from "@thi.ng/api";

// event ID constants
export const PREV = "prev";
export const NEXT = "next";
export const PAGE_READY = "page-ready";

// alias of possible event structures/signatures
export interface EventTypeMap {
	[PREV]: [typeof PREV, number];
	[NEXT]: [typeof NEXT, number];
	[PAGE_READY]: [typeof PAGE_READY];
}

export type EventType = keyof EventTypeMap;

export type Event = Val1<EventTypeMap, EventType>;

export interface AppState {
	pageID: number;
	nextPageID: number;
	isLoading: boolean;
	timeoutID?: number;
}
