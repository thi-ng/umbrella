import { QUARTER_PI } from "@thi.ng/math/api";
import { clamp11 } from "@thi.ng/math/interval";
import type { IGen } from "./api.js";
import { AProc } from "./aproc.js";
import { __ensureGenN } from "./internal/ensure.js";
import type { NumericArray } from "@thi.ng/api";

/**
 * Positions and converts a mono signal into a stereo signal using given `pos`
 * in the [-1..1] range to control the panning (-1 = left, +1 = right).
 *
 * @remarks
 * Reference:
 * https://www.musicdsp.org/en/latest/Effects/255-stereo-field-rotation-via-transformation-matrix.html
 *
 * @param pos
 */
export const pan = (pos?: number | IGen<number>) => new Pan(pos);

export class Pan extends AProc<number, NumericArray> {
	protected _pos!: IGen<number>;

	constructor(pos: number | IGen<number> = 0) {
		super([0, 0]);
		this.pos = pos;
	}

	get pos() {
		return this._pos.deref();
	}

	set pos(pos: number | IGen<number>) {
		this._pos = __ensureGenN(pos, clamp11);
	}

	next(x: number): NumericArray {
		const pos = this._pos.next() * QUARTER_PI;
		const s = x * Math.sin(pos);
		const c = x * Math.cos(pos);
		return [c - s, s + c];
	}
}
