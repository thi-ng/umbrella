import type { IDeref } from "@thi.ng/api";
import { mix } from "@thi.ng/math/mix";
import type {
	ReadonlyVec,
	Vec,
	VecAPI,
	VecOpV,
	VecOpVVN,
} from "@thi.ng/vectors";
import { mixN2, mixN3, mixN4 } from "@thi.ng/vectors/mixn";
import { set2, set3, set4 } from "@thi.ng/vectors/set";
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

	interpolate(alpha: number, _: ReadonlyTimeStep): void {
		this.value = mix(this.prev, this.curr, alpha);
	}
}

export class VectorState implements IDeref<ReadonlyVec>, ITimeStep {
	prev: Vec;
	curr: Vec;
	setFn: VecOpV;
	mixFn: VecOpVVN;

	constructor(
		api: Pick<VecAPI, "set" | "mixN">,
		public value: Vec,
		public update: StateUpdate<ReadonlyVec>
	) {
		this.setFn = api.set;
		this.mixFn = api.mixN;
		this.prev = this.setFn([], value);
		this.curr = this.setFn([], value);
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
 * length) and its update function for use with {@link TimeStep.update}. The
 * `api` object is used to provide dedicated vector ops used internally.
 *
 * @remarks
 * **IMPORTANT:** The `update` function MUST update the vector received as 1st
 * arg (which is {@link VectorState.curr}).
 *
 * Also see {@link defVector2}, {@link defVector3}, {@link defVector4} for
 * pre-configured versions.
 *
 * @param api
 * @param v
 * @param update
 */
export const defVector = (
	api: Pick<VecAPI, "set" | "mixN">,
	v: ReadonlyVec,
	update: StateUpdate<ReadonlyVec>
) => new VectorState(api, v, update);

/**
 * 2D optimized version of {@link defVector}.
 *
 * @param v
 * @param update
 */
export const defVector2 = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState({ set: set2, mixN: mixN2 }, v, update);

/**
 * 3D optimized version of {@link defVector}.
 *
 * @param v
 * @param update
 */
export const defVector3 = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState({ set: set3, mixN: mixN3 }, v, update);

/**
 * 4D optimized version of {@link defVector}.
 *
 * @param v
 * @param update
 */
export const defVector4 = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState({ set: set4, mixN: mixN4 }, v, update);
