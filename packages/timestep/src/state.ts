import type { IDeref } from "@thi.ng/api";
import { mix } from "@thi.ng/math/mix";
import type { ReadonlyVec, Vec, VecOpV, VecOpVVN } from "@thi.ng/vectors";
import { mixN, mixN2, mixN3, mixN4 } from "@thi.ng/vectors/mixn";
import { set, set2, set3, set4 } from "@thi.ng/vectors/set";
import type { ITimeStep, ReadonlyTimeStep, StateUpdate } from "./api.js";

export class NumericState implements IDeref<number>, ITimeStep {
	curr!: number;
	prev!: number;

	constructor(public value: number, public update: StateUpdate<number>) {
		this.reset(value);
	}

	deref() {
		return this.value;
	}

	/**
	 * Sets {@link NumericState.prev}, {@link NumericState.curr} and
	 * {@link NumericState.value} to given new value.
	 *
	 * @param value
	 */
	reset(value: number) {
		this.prev = this.curr = this.value = value;
	}

	integrate(dt: number, ctx: ReadonlyTimeStep) {
		this.prev = this.curr;
		this.curr = this.update(this.curr, dt, ctx);
	}

	interpolate(alpha: number): void {
		this.value = mix(this.prev, this.curr, alpha);
	}
}

export class VectorState implements IDeref<ReadonlyVec>, ITimeStep {
	prev: Vec;
	curr: Vec;

	constructor(
		public value: Vec,
		public setFn: VecOpV,
		public mixFn: VecOpVVN,
		public update: StateUpdate<ReadonlyVec>
	) {
		this.prev = [...value];
		this.curr = [...value];
	}

	deref(): ReadonlyVec {
		return this.value;
	}

	/**
	 * Copies given vector to {@link VectorState.prev}, {@link VectorState.curr}
	 * and {@link VectorState.value}.
	 *
	 * @param value
	 */
	reset(value: ReadonlyVec) {
		const set = this.setFn;
		set(this.prev, value);
		set(this.curr, value);
		set(this.value, value);
	}

	integrate(dt: number, ctx: ReadonlyTimeStep) {
		this.setFn(this.prev, this.curr);
		this.update(this.curr, dt, ctx);
	}

	interpolate(alpha: number) {
		this.mixFn(this.value, this.prev, this.curr, alpha);
	}
}

/**
 * Returns a new {@link NumericState} wrapper for given value `x` and its update
 * function for use with {@link TimeStep.update}.
 *
 * @param x
 * @param update
 */
export const defNumeric = (x: number, update: StateUpdate<number>) =>
	new NumericState(x, update);

/**
 * Returns a new {@link VectorState} wrapper for given vector `v` (arbitrary
 * length) and its update function for use with {@link TimeStep.update}.
 *
 * @remarks
 * **IMPORTANT:** The `update` function MUST manipulate the vector received as
 * 1st arg (which is {@link VectorState.curr}).
 *
 * Also see {@link defVector2}, {@link defVector3}, {@link defVector4}.
 *
 * @param x
 * @param update
 */
export const defVector = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState(v, set, mixN, update);

/**
 * 2D optimized version of {@link defVector}.
 *
 * @param v
 * @param update
 */
export const defVector2 = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState(v, set2, mixN2, update);

/**
 * 3D optimized version of {@link defVector}.
 *
 * @param v
 * @param update
 */
export const defVector3 = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState(v, set3, mixN3, update);

/**
 * 4D optimized version of {@link defVector}.
 *
 * @param v
 * @param update
 */
export const defVector4 = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState(v, set4, mixN4, update);
