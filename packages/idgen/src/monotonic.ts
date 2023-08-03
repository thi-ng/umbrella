import {
	INotifyMixin,
	type Event,
	type IIDGen,
	type INotify,
	type Listener,
} from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { EVENT_ADDED, EVENT_REMOVED, type IDGenEventType } from "./api.js";

/**
 * Simple monotonically increasing numeric ID generator. Unbounded and depending
 * on numeric range covered, inprecise (e.g. for values outside the JS safe
 * integer range).
 *
 * Unlike {@link IDGen}, this class doesn't keep track of generated IDs and the
 * {@link MonotonicID.free} implementation only checks if a given ID could
 * possibly already have been generated.
 */
@INotifyMixin
export class MonotonicID implements IIDGen<number>, INotify<IDGenEventType> {
	nextID: number;

	constructor(public start = 0, public step = 1) {
		assert(step > 0, "invalid step size");
		this.nextID = start;
	}

	next(): number {
		const id = this.nextID;
		this.nextID += this.step;
		this.notify({ id: EVENT_ADDED, target: this, value: id });
		return id;
	}

	free(id: number): boolean {
		if (!(id >= this.start && id < this.nextID)) return false;
		this.notify({ id: EVENT_REMOVED, target: this, value: id });
		return true;
	}

	// @ts-ignore: mixin
	// prettier-ignore
	addListener(id: IDGenEventType, fn: Listener<IDGenEventType>, scope?: any): boolean {}

	// @ts-ignore: mixin
	// prettier-ignore
	removeListener(id: IDGenEventType, fn: Listener<IDGenEventType>, scope?: any): boolean {}

	// @ts-ignore: mixin
	notify(event: Event<IDGenEventType>): boolean {}
}

/**
 * Returns a new {@link MonotonicID} instance with given `start` offset
 * (default: 0) and `step` size (default: 1).
 *
 * @param start
 * @param step
 */
export const monotonic = (start?: number, step?: number) =>
	new MonotonicID(start, step);
