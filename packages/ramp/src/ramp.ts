import type { ICopy, IEmpty } from "@thi.ng/api";
import { binarySearch } from "@thi.ng/arrays/binary-search";
import { peek } from "@thi.ng/arrays/peek";
import { compareNumAsc } from "@thi.ng/compare/numeric";
import { assert } from "@thi.ng/errors/assert";
import { absDiff } from "@thi.ng/math/abs";
import { clamp } from "@thi.ng/math/interval";
import { comp } from "@thi.ng/transducers/comp";
import { concat } from "@thi.ng/transducers/concat";
import { extendSides } from "@thi.ng/transducers/extend-sides";
import { iterator } from "@thi.ng/transducers/iterator";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { partition } from "@thi.ng/transducers/partition";
import type { Frame, IRamp, RampBounds, RampImpl } from "./api.js";

/**
 * Syntax sugar for {@link Ramp} constructor using the given ramp interpolation
 * impl and stops (aka keyframes, minimum 2).
 *
 * @param impl
 * @param stops
 */
export const ramp = <T>(impl: RampImpl<T>, stops: Frame<T>[]) =>
	new Ramp<T>(impl, stops);

export class Ramp<T> implements ICopy<IRamp<T>>, IEmpty<IRamp<T>>, IRamp<T> {
	constructor(public impl: RampImpl<T>, public stops: Frame<T>[]) {
		assert(stops.length >= 2, `require at least 2 keyframes/stops`);
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

	at(t: number) {
		const { impl, stops } = this;
		const n = stops.length - 1;
		const i = this.timeIndex(t);
		if (i < 0) {
			return stops[0][1];
		} else if (i >= n) {
			return stops[n][1];
		} else {
			return impl.at(stops, i, t);
		}
	}

	interpolatedPoints(res = 20) {
		const {
			impl: {
				interpolate: { left, right, size, fn },
			},
			stops,
		} = this;
		return concat(
			iterator(
				comp(
					partition(size, 1),
					mapcat((chunk) => fn(chunk, res))
				),
				extendSides(stops, left, right)
			),
			[peek(stops)]
		);
	}

	bounds(): RampBounds<T> {
		const { impl, stops } = this;
		const n = stops.length;
		let min: T | null = null;
		let max: T | null = null;
		for (let i = n; i-- > 0; ) {
			const y = stops[i][1];
			min = impl.min(min, y);
			max = impl.max(max, y);
		}
		return {
			min: min!,
			max: max!,
			minT: stops[0][0],
			maxT: stops[n - 1][0],
		};
	}

	addStopAt(t: number, y: T, eps = 0.01) {
		if (this.closestIndex(t, eps) !== -1) {
			this.stops.push([t, y]);
			this.sort();
			return true;
		}
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
