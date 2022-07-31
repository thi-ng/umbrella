import type { Fn, Fn0, Val1 } from "@thi.ng/api";

export const INC = "inc";
export const DEC = "dec";
export const RANDOM = "rnd";
export const DEFER = "defer";

// alias of possible event structures/signatures
export interface EventTypeMap {
	[INC]: [typeof INC, number];
	[DEC]: [typeof DEC, number];
	[RANDOM]: [typeof RANDOM];
	[DEFER]: [typeof DEFER, Fn0<void>, number];
}

export type EventType = keyof EventTypeMap;

export type Event = Val1<EventTypeMap, EventType>;

export type Callback = Fn0<void>;

export type Signal = Fn<Event, Callback>;
