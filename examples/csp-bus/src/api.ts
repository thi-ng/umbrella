import type { Channel } from "@thi.ng/csp";
import type { ILifecycle } from "@thi.ng/system";
import type { Counter, CounterGroup } from "./counter.js";
import type { EventBus } from "./events.js";

export type StartCounterEvent = ["start-counter", Counter];
export type StopAllEvent = ["stop"];
export type LogEvent = ["log", string];

export type Event = StartCounterEvent | StopAllEvent | LogEvent;

// our app consists of multiple app components
export interface App {
	bus: EventBus;
	counters: CounterGroup;
	logger: Channel<string>;
	ui: ILifecycle;
}
