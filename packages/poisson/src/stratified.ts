import { isNumber } from "@thi.ng/checks/is-number";
import { SYSTEM } from "@thi.ng/random/system";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add2, add3 } from "@thi.ng/vectors/add";
import { distSq2, distSq3 } from "@thi.ng/vectors/distsq";
import { mul2, mul3 } from "@thi.ng/vectors/mul";
import { random2, random3 } from "@thi.ng/vectors/random";
import type { StratifiedGridOpts } from "./api.js";

/**
 * Yields iterator of 2D point samples of for given stratified grid
 * config.
 *
 * @remarks
 * All samples will be in `[[0,0] .. [dimx,dimy])` interval
 *
 * @param opts -
 */
export function* stratifiedGrid2(opts: StratifiedGridOpts) {
	let { rnd = SYSTEM, separation: sep = Math.SQRT1_2 } = opts;
	sep *= sep;
	const scale =
		opts.scale !== undefined
			? isNumber(opts.scale)
				? [opts.scale, opts.scale]
				: opts.scale
			: undefined;
	const [sx, sy] = opts.dim;
	const sx1 = sx - 1;
	const tmp = [0, 0];
	let prevY: ReadonlyVec[] = [];
	let currY: ReadonlyVec[] = [];
	let q;
	for (let y = 0; y < sy; y++) {
		for (let x = 0; x < sx; x++) {
			do {
				q = add2(null, [x, y], random2(tmp, 0, 1, rnd));
			} while (
				(x > 0 && distSq2(currY[x - 1], q) < sep) ||
				(y > 0 &&
					(distSq2(prevY[x], q) < sep ||
						(x > 0 && distSq2(prevY[x - 1], q) < sep) ||
						(x < sx1 && distSq2(prevY[x + 1], q) < sep)))
			);
			currY.push(q);
			yield scale ? mul2([], q, scale) : q;
		}
		prevY = currY;
		currY = [];
	}
}

/**
 * Yields iterator of 3D point samples of for given stratified grid
 * config.
 *
 * @remarks
 * All samples will be in `[[0,0,0] .. [dimx,dimy,dimz])` interval
 *
 * @param opts -
 */
export function* stratifiedGrid3(opts: StratifiedGridOpts) {
	let { rnd = SYSTEM, separation: sep = Math.SQRT1_2 } = opts;
	sep *= sep;
	const scale =
		opts.scale !== undefined
			? isNumber(opts.scale)
				? [opts.scale, opts.scale]
				: opts.scale
			: undefined;
	const [sx, sy, sz] = opts.dim;
	const sx1 = sx - 1;
	const tmp = [0, 0, 0];
	let prevY: ReadonlyVec[] = [];
	let prevZ: ReadonlyVec[][] = [];
	let currY: ReadonlyVec[] = [];
	let currZ: ReadonlyVec[][] = [];
	let q;
	for (let z = 0; z < sz; z++) {
		for (let y = 0; y < sy; y++) {
			for (let x = 0; x < sx; x++) {
				do {
					q = add3(null, [x, y, z], random3(tmp, 0, 1, rnd));
				} while (
					(x > 0 && distSq3(currY[x - 1], q) < sep) ||
					(y > 0 && __inRange3(q, prevY, x, sx1, sep)) ||
					(z > 0 &&
						(__inRange3(q, prevZ[y], x, sx1, sep) ||
							(y > 0 &&
								__inRange3(q, prevZ[y - 1], x, sx1, sep))))
				);
				currY.push(q);
				yield scale ? mul3([], q, scale) : q;
			}
			currZ.push(currY);
			prevY = currY;
			currY = [];
		}
		prevZ = currZ;
		currZ = [];
	}
}

const __inRange3 = (
	q: ReadonlyVec,
	prev: ReadonlyVec[],
	x: number,
	maxX: number,
	sep: number
) =>
	distSq3(prev[x], q) < sep ||
	(x > 0 && distSq3(prev[x - 1], q) < sep) ||
	(x < maxX && distSq3(prev[x + 1], q) < sep);
