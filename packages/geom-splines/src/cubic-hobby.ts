import type { FnN3 } from "@thi.ng/api";
import { THIRD, TWO_THIRD } from "@thi.ng/math/api";
import { solveTridiagonal } from "@thi.ng/math/solve";
import {
	angleBetween2,
	mag2,
	type ReadonlyVec,
	type Vec,
} from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { rotate } from "@thi.ng/vectors/rotate";
import { sub2 } from "@thi.ng/vectors/sub";
import { set2 } from "@thi.ng/vectors/set";

/**
 * Fits a cubic bezier spline to the given array of `points` and tension param
 * `omega` (in [0,1] range), using John D. Hobby's algorithm/paper: "Smooth,
 * Easy to Compute Interpolating Splines".
 *
 * @remarks
 * References:
 * - https://link.springer.com/content/pdf/10.1007/BF02187690.pdf
 * - https://web.archive.org/web/20220816011347/https://ctan.math.washington.edu/tex-archive/graphics/pgf/contrib/hobby/hobby.pdf
 * - http://weitz.de/hobby/
 * - https://www.jakelow.com/blog/hobby-curves (based on Weitz)
 *
 * @param points
 * @param closed
 * @param omega
 */
export const cubicHobby2 = (
	points: ReadonlyVec[],
	closed = false,
	omega = 1
) => {
	const nump = points.length;
	if (closed) {
		// repeat 3 points on either side to obtain symmetric handles for first
		// vertex of the closed shape
		points = points.slice(nump - 3).concat(points, points.slice(0, 3));
	}
	const n = points.length - 1;
	const chords: Vec[] = new Array(n);
	const d: number[] = new Array(n);
	const alpha: number[] = new Array(n + 1);
	const gamma: number[] = new Array(n + 1);
	const A: number[] = new Array(n + 1);
	const B: number[] = new Array(n + 1);
	const C: number[] = new Array(n + 1);

	for (let i = 0; i < n; i++) {
		const delta = (chords[i] = sub2([], points[i + 1], points[i]));
		d[i] = mag2(delta);
		i > 0 && (gamma[i] = angleBetween2(chords[i - 1], delta));
	}

	B[0] = B[n] = 2 + omega;
	C[0] = A[n] = 2 * omega + 1;
	alpha[0] = -C[0] * gamma[1];
	alpha[n] = gamma[n] = 0;

	for (let i = 1; i < n; i++) {
		const dprev = d[i - 1];
		const dcurr = d[i];
		const invD = 1 / (dprev * dcurr);
		A[i] = 1 / dprev;
		B[i] = (2 * dprev + 2 * dcurr) * invD;
		C[i] = 1 / dcurr;
		alpha[i] = -(2 * gamma[i] * dcurr + gamma[i + 1] * dprev) * invD;
	}

	solveTridiagonal(A, B, C, alpha);

	const res: Vec[][] = [];
	const [from, to] = closed ? [3, 3 + nump] : [0, n];
	for (let i = from; i < to; i++) {
		const a = alpha[i];
		const b = i < n - 1 ? -gamma[i + 1] - alpha[i + 1] : -alpha[n];
		const c = chords[i];
		res.push([
			set2([], points[i]),
			add2(
				null,
				normalize2(null, rotate([], c, a), __rho(a, b, d[i])),
				points[i]
			),
			add2(
				null,
				// reuse chord vector for result to avoid extraneous allocation
				normalize2(null, rotate(null, c, -b), -__rho(b, a, d[i])),
				points[i + 1]
			),
			set2([], points[i + 1]),
		]);
	}
	return res;
};

/** @internal */
const __rho: FnN3 = (a, b, scale) =>
	(scale * TWO_THIRD) / (1 + TWO_THIRD * Math.cos(b) + THIRD * Math.cos(a));
