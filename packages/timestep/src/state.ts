import type { IDeref } from "@thi.ng/api";
import { mix } from "@thi.ng/math/mix";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";
import type {
	IUpdatable,
	ReadonlyTimeStep,
	StateInterpolation,
	StateUpdate,
} from "./api.js";

/**
 * Abstract base class for simulation state wrappers.
 *
 * @remarks
 * See {@link defNumeric} and {@link defVector}.
 */
export abstract class AState<T> implements IDeref<T>, IUpdatable {
	curr: T;
	prev: T;

	constructor(
		public value: T,
		public update: StateUpdate<T>,
		public mix: StateInterpolation<T>
	) {
		this.prev = this.curr = value;
	}

	deref() {
		return this.value;
	}

	integrate(dt: number, ctx: ReadonlyTimeStep) {
		this.prev = this.curr;
		this.curr = this.update(this.curr, dt, ctx);
	}

	interpolate(alpha: number, ctx: ReadonlyTimeStep): void {
		this.value = this.mix(this.prev, this.curr, alpha, ctx);
	}
}

export class NumericState extends AState<number> {
	constructor(x: number, update: StateUpdate<number>) {
		super(x, update, mix);
	}
}

export class VectorState extends AState<ReadonlyVec> {
	constructor(x: ReadonlyVec, update: StateUpdate<ReadonlyVec>) {
		super(x, update, (a, b, t) => mixN([], a, b, t));
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
 * Returns a new {@link VectorState} wrapper for given vector `v` and its update
 * function for use with {@link TimeStep.update}.
 *
 * @param x
 * @param update
 */
export const defVector = (v: ReadonlyVec, update: StateUpdate<ReadonlyVec>) =>
	new VectorState(v, update);
