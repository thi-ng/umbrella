import {
	INotifyMixin,
	type Event,
	type IIDGen,
	type INotify,
	type Listener,
} from "@thi.ng/api";
import { EVENT_ADDED, EVENT_REMOVED, type IDGenEventType } from "./api.js";

/**
 * Wrapped ID generator for creating string-based IDs derived from a backing ID gen.
 */
@INotifyMixin
export class PrefixedID implements IIDGen<string>, INotify {
	constructor(
		public readonly prefix: string,
		public readonly gen: IIDGen<number>
	) {}

	next() {
		const id = this.prefix + this.gen.next();
		this.notify({ id: EVENT_ADDED, target: this, value: id });
		return id;
	}

	free(id: string): boolean {
		if (
			!(
				id.startsWith(this.prefix) &&
				this.gen.free(Number(id.substring(this.prefix.length)))
			)
		)
			return false;
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
 * Syntax sugar for {@link PrefixedID} constructor.
 *
 * @param prefix
 * @param gen
 */
export const prefixed = (prefix: string, gen: IIDGen<number>) =>
	new PrefixedID(prefix, gen);
