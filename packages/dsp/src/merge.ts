import { AGen } from "./agen.js";
import { type IGen } from "./api.js";

/**
 * Returns a new {@link IGen} which merges signals from multiple mono
 * {@link IGen}s into a multi-channel (e.g. stereo) tuples/values.
 *
 * @param channels
 */
export const merge = (...channels: IGen<number>[]) => new Merge(channels, 0);

export const mergeT = <T>(channels: IGen<T>[], init: T) =>
	new Merge(channels, init);

export class Merge<T> extends AGen<T[]> {
	constructor(protected _channels: IGen<T>[], init: T) {
		super(new Array<T>(_channels.length).fill(init));
	}

	channel(i: number) {
		return this._channels[i];
	}

	next(): T[] {
		return this._channels.map((x) => x.next());
	}
}
