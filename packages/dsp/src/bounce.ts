import type { NumericArray } from "@thi.ng/api";
import { AProc } from "./aproc.js";

/**
 * Returns a new {@link Bounce} processor, which receives a multi-track tuple
 * input (e.g. as produced by {@link multiplex}) and yields its "bounced down"
 * (aka summed), single channel output.
 */
export const bounce = () => new Bounce();

export class Bounce extends AProc<NumericArray, number> {
	constructor() {
		super(0);
	}

	next(src: NumericArray) {
		let res = 0;
		for (let i = src.length; i-- > 0; ) res += src[i];
		return (this._val = res);
	}
}
