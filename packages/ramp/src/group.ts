import { mix } from "@thi.ng/math/mix";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import type {
	Frame,
	IRamp,
	IReadonlyRamp,
	RampBounds,
	RampDomain,
	RampOpts,
} from "./api.js";
import { unconstrained } from "./domain.js";

export type GroupImpl<T extends Record<string, any>> = {
	[P in keyof T]: IRamp<T[P]>;
};

/**
 * Creates a new nested ramp from given object of otherwise independent child
 * ramps (which can be groups themselves).
 *
 * @remarks
 * Similar to {@link nested}, but different in that groups are merely views of
 * independent timelines, each with their own set of keyframes, interpolation
 * logic, time domain functions.
 *
 * Groups can have their own time domain function (given via `opts`, default:
 * {@link unconstrained}), which will be applied _prior_ to evaluating any child ramps.
 *
 * @example
 * ```ts
 * const example = group({
 *   // named, independent child ramps/timelines
 *   a: linear([[0.1, 0], [0.5, -10]]),
 *   b: hermite([[0, 100], [1, 200]]),
 * });
 *
 * example.at(0.2)
 * // { a: -2.5, b: 110.4 }
 *
 * // set new keyframe for `b` ramp
 * // (in TS need to cast to proper type first)
 * (<Ramp<number>>example.children.b).setStopAt(0.5, 200);
 *
 * example.at(0.2)
 * // { a: -2.5, b: 135.2 }
 * ```
 *
 * @param children
 * @param opts
 */
export const group = <T extends Record<string, any>>(
	children: GroupImpl<T>,
	opts?: Partial<RampOpts>
) => new Group<T>(children, opts);

export class Group<T extends Record<string, any>> implements IReadonlyRamp<T> {
	domain: RampDomain;

	protected childEntries: [keyof T, IReadonlyRamp<any>][];

	constructor(public children: GroupImpl<T>, opts?: Partial<RampOpts>) {
		this.childEntries = <[keyof T, IReadonlyRamp<any>][]>(
			Object.entries(this.children)
		);
		this.domain = opts?.domain || unconstrained;
	}

	at(t: number): T {
		t = this.domain(t, ...this.timeBounds());
		return this.childEntries.reduce((acc, [id, ramp]) => {
			acc[id] = ramp.at(t);
			return acc;
		}, <T>{});
	}

	samples(n = 100, start?: number, end?: number): Iterable<Frame<T>> {
		if (start == undefined || end == undefined) {
			const bounds = this.timeBounds();
			start = start ?? bounds[0];
			end = end ?? bounds[1];
		}
		return map((t) => {
			t = mix(start!, end!, t);
			return <Frame<T>>[t, this.at(t)];
		}, normRange(n));
	}

	bounds(): RampBounds<T> {
		return this.childEntries.reduce(
			(acc, [id, ramp]) => {
				const bounds = ramp.bounds();
				acc.minT = Math.min(acc.minT, bounds.minT);
				acc.maxT = Math.max(acc.maxT, bounds.maxT);
				acc.min[id] = bounds.min;
				acc.max[id] = bounds.max;
				return acc;
			},
			<RampBounds<T>>{ minT: Infinity, maxT: -Infinity, min: {}, max: {} }
		);
	}

	timeBounds(): [number, number] {
		return this.childEntries.reduce(
			(acc, [_, ramp]) => {
				const bounds = ramp.timeBounds();
				acc[0] = Math.min(acc[0], bounds[0]);
				acc[1] = Math.max(acc[1], bounds[1]);
				return acc;
			},
			[Infinity, -Infinity]
		);
	}
}
