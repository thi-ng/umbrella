import type { IHash, NumericArray } from "@thi.ng/api";
import { EPS } from "@thi.ng/math/api";
import {
	MAX2,
	MIN2,
	ONE2,
	X2,
	Y2,
	ZERO2,
	type IVector,
	type ReadonlyVec,
	type Vec,
} from "./api.js";
import { AVec } from "./avec.js";
import { intoStridedBuffer, mapStridedBuffer } from "./buffer.js";
import { declareIndices } from "./compile/accessors.js";
import { eqDelta2 } from "./eqdelta.js";
import { hash } from "./hash.js";
import { stridedValues, vecIterator } from "./iterator.js";
import { setS2 } from "./sets.js";

export class Vec2 extends AVec implements IHash<number>, IVector<Vec2> {
	/**
	 * Returns array of memory mapped {@link Vec2} instances using given
	 * backing array and stride settings: The `cstride` is the step size
	 * between individual XY vector components. `estride` is the step
	 * size between successive vectors. This arrangement allows for
	 * different storage approaches, incl. SOA, AOS, striped /
	 * interleaved etc.
	 *
	 * @param buf - backing array
	 * @param num - num vectors
	 * @param start -  start index
	 * @param cstride - component stride
	 * @param estride - element stride
	 */
	static mapBuffer(
		buf: NumericArray,
		num: number = buf.length >> 1,
		start = 0,
		cstride = 1,
		estride = 2
	) {
		return mapStridedBuffer(Vec2, buf, num, start, cstride, estride);
	}

	/**
	 * Merges given `src` iterable of {@link Vec2}s into single array `buf`.
	 * Vectors will be arranged according to given component and element
	 * strides, starting at `start` index. It's the user's
	 * responsibility to ensure the target buffer has sufficient
	 * capacity to hold the input vectors. See `Vec2.mapBuffer` for the
	 * inverse operation. Returns `buf`.
	 *
	 * @param buf -
	 * @param src -
	 * @param start -
	 * @param cstride -
	 * @param estride -
	 */
	static intoBuffer(
		buf: NumericArray,
		src: Iterable<Vec2>,
		start = 0,
		cstride = 1,
		estride = 2
	) {
		return intoStridedBuffer(setS2, buf, src, start, cstride, estride);
	}

	static iterator(
		buf: NumericArray,
		num: number,
		start = 0,
		cstride = 1,
		estride = 2
	) {
		return vecIterator(Vec2, buf, num, start, cstride, estride);
	}

	static readonly X_AXIS = new Vec2(<NumericArray>X2);
	static readonly Y_AXIS = new Vec2(<NumericArray>Y2);
	static readonly MIN = new Vec2(<NumericArray>MIN2);
	static readonly MAX = new Vec2(<NumericArray>MAX2);
	static readonly ZERO = new Vec2(<NumericArray>ZERO2);
	static readonly ONE = new Vec2(<NumericArray>ONE2);

	x!: number;
	y!: number;
	[id: number]: number;

	constructor(buf?: NumericArray, offset = 0, stride = 1) {
		super(buf || [0, 0], offset, stride);
	}

	[Symbol.iterator]() {
		return stridedValues(this.buf, 2, this.offset, this.stride);
	}

	get length() {
		return 2;
	}

	copy() {
		return new Vec2([this.x, this.y]);
	}

	copyView() {
		return new Vec2(this.buf, this.offset, this.stride);
	}

	empty() {
		return new Vec2();
	}

	eqDelta(v: ReadonlyVec, eps = EPS) {
		return eqDelta2(this, v, eps);
	}

	hash() {
		return hash(this);
	}

	toJSON() {
		return [this.x, this.y];
	}
}

declareIndices(Vec2.prototype, ["x", "y"]);

export const vec2 = (x = 0, y = 0) => new Vec2([x, y]);

export const vec2n = (n: number) => new Vec2([n, n]);

export const asVec2 = (x: Vec) =>
	x instanceof Vec2
		? x
		: new Vec2(x.length >= 2 ? <NumericArray>x : [x[0] || 0, x[1] || 0]);
