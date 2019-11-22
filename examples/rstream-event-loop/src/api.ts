// event ID constants
export const PREV = "prev";
export const NEXT = "next";
export const PAGE_READY = "page-ready";

export type EventType = typeof PREV | typeof NEXT | typeof PAGE_READY;

// alias of possible event structures/signatures
export type Event =
    | [typeof PREV, number]
    | [typeof NEXT, number]
    | [typeof PAGE_READY];

export interface AppState {
    pageID: number;
    nextPageID: number;
    isLoading: boolean;
    timeoutID?: number;
}
