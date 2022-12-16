import type { IReset } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { AGen } from "./agen.js";

/**
 * White noise gen with customizable gain and
 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html)
 * source.
 *
 * @param gain -
 * @param rnd -
 */
export const whiteNoise = (gain?: number, rnd?: IRandom) =>
	new WhiteNoise(gain, rnd);

export class WhiteNoise extends AGen<number> implements IReset {
	constructor(protected _gain = 1, protected _rnd: IRandom = SYSTEM) {
		super(0);
	}

	reset() {
		return this;
	}

	next() {
		return (this._val = this._rnd.norm(this._gain));
	}
}
