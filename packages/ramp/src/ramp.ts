import type { ICopy, IEmpty } from "@thi.ng/api";
import { binarySearch } from "@thi.ng/arrays/binary-search";
import { peek } from "@thi.ng/arrays/peek";
import { compareNumAsc } from "@thi.ng/compare/numeric";
import { assert } from "@thi.ng/errors/assert";
import { absDiff } from "@thi.ng/math/abs";
import { clamp } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import type {
	Frame,
	IRamp,
	RampBounds,
	RampDomain,
	RampImpl,
	RampOpts,
} from "./api.js";
import { unconstrained } from "./domain.js";

/**
 * Syntax sugar for {@link Ramp} constructor using the given ramp interpolation
 * `impl`, keyframes `stops` (minimum 2) and options.
 *
 * @param impl
 * @param stops
 * @param opts
 */
export const ramp = <T>(
	impl: RampImpl<T>,
	stops: Frame<T>[],
	opts?: Partial<RampOpts>
) => new Ramp<T>(impl, stops, opts);

export class Ramp<T> implements ICopy<IRamp<T>>, IEmpty<IRamp<T>>, IRamp<T> {
	domain: RampDomain;

	constructor(
		public impl: RampImpl<T>,
		public stops: Frame<T>[],
		opts?: Partial<RampOpts>
	) {
		assert(stops.length >= 2, `require at least 2 keyframes/stops`);
		const $opts = { domain: unconstrained, ...opts };
		this.domain = $opts.domain;
		this.sort();
	}

	copy() {
		return new Ramp<T>(
			this.impl,
			this.stops.map((x) => <Frame<T>>x.slice())
		);
	}

	empty() {
		return new Ramp<T>(this.impl, []);
	}

	/**
	 * Samples the ramp at given time `t` and returns interpolated value.
	 *
	 * @remarks
	 * The given `t` is first processed by the configured time
	 * {@link Ramp.domain} function.
	 *
	 * @param t
	 */
	at(t: number) {
		const { domain, impl, stops } = this;
		const n = stops.length - 1;
		const first = stops[0];
		const last = stops[n];
		t = domain(t, first[0], last[0]);
		const i = this.timeIndex(t);
		return i < 0 ? first[1] : i >= n ? last[1] : impl.at(stops, i, t);
	}

	samples(n = 100, start?: number, end?: number) {
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
		const { impl, stops } = this;
		const n = stops.length;
		let min: T | null = null;
		let max: T | null = null;
		for (let i = n; i-- > 0; ) {
			const val = stops[i][1];
			min = impl.min(min, val);
			max = impl.max(max, val);
		}
		return {
			min: min!,
			max: max!,
			minT: stops[0][0],
			maxT: stops[n - 1][0],
		};
	}

	timeBounds(): [number, number] {
		return [this.stops[0][0], peek(this.stops)[0]];
	}

	setStopAt(t: number, val: T, eps = 0.01) {
		const idx = this.closestIndex(t, eps);
		if (idx < 0) {
			this.stops.push([t, val]);
			this.sort();
			return true;
		}
		this.stops[idx][1] = val;
		return false;
	}

	removeStopAt(t: number, eps = 0.01) {
		if (this.stops.length > 2) {
			const i = this.closestIndex(t, eps);
			if (i !== -1) {
				this.stops.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	closestIndex(t: number, eps = 0.01) {
		const stops = this.stops;
		for (let i = stops.length; i-- > 0; ) {
			if (absDiff(t, stops[i][0]) < eps) return i;
		}
		return -1;
	}

	clampedIndexTime(i: number, t: number, eps = 0.01) {
		const stops = this.stops;
		const n = stops.length - 1;
		return i == 0
			? Math.min(t, stops[1][0] - eps)
			: i === n
			? Math.max(t, stops[n - 1][0] + eps)
			: clamp(t, stops[i - 1][0] + eps, stops[i + 1][0] - eps);
	}

	sort() {
		this.stops.sort((a, b) => a[0] - b[0]);
	}

	uniform() {
		const n = this.stops.length - 1;
		this.stops.forEach((p, i) => (p[0] = i / n));
	}

	protected timeIndex(t: number) {
		const stops = this.stops;
		const n = stops.length;
		if (n < 256) {
			for (let i = n; i-- > 0; ) {
				if (t >= stops[i][0]) return i;
			}
			return -1;
		}
		return binarySearch(
			stops,
			<Frame<T>>[t, null],
			(x) => x[0],
			compareNumAsc
		);
	}
}
