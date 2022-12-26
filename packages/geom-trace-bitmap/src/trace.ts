import type { Fn, FnU2, Predicate } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { GridIterOpts, PointTransform } from "@thi.ng/grid-iterators";
import { columns2d } from "@thi.ng/grid-iterators/columns";
import { diagonal2d } from "@thi.ng/grid-iterators/diagonal";
import { rows2d } from "@thi.ng/grid-iterators/rows";
import { flipX, ident } from "@thi.ng/grid-iterators/transforms";
import { mulV23 } from "@thi.ng/matrices/mulv";
import type { Vec, VecPair } from "@thi.ng/vectors";
import type { TraceBitmapOpts, TraceOpts } from "./api.js";

/**
 * Main conversion/extraction function. According to given
 * {@link TraceBitmapOpts.flags}, extracts line segments and/or points from
 * given pixel buffer and returns object of results. By default _all_ line
 * directions and points are processed. If {@link TraceBitmapOpts.tx} is given,
 * all coordinates are transformed with that matrix.
 *
 * ```ts
 * traceBitmap({ img: ..., flags: Trace.DIAGONAL })
 * // { lines: [...], points: [] }
 * ```
 *
 * @param opts
 */
export const traceBitmap = (opts: TraceBitmapOpts) => {
	const tx = opts.tx;
	const { width, height } = opts.img;
	const lines: VecPair[] = [];
	const points: Vec[] = [];
	for (let d of opts.dir || "hvdp") {
		switch (d) {
			case "h":
				traceWithOrder(
					opts,
					rows2d,
					ident,
					__borderX(width, height),
					lines
				);
				break;
			case "v":
				traceWithOrder(
					opts,
					columns2d,
					ident,
					__borderY(width, height),
					lines
				);
				break;
			case "d": {
				const border = __borderXY(width, height);
				traceWithOrder(opts, diagonal2d, ident, border, lines);
				traceWithOrder(opts, diagonal2d, flipX, border, lines);
				break;
			}
			case "p":
				tracePoints(opts, points);
				break;
			default:
				illegalArgs(`invalid trace direction: ${d}`);
		}
	}
	if (tx) {
		lines.forEach((p) => {
			mulV23(null, tx, p[0]);
			mulV23(null, tx, p[1]);
		});
		points.forEach((p) => mulV23(null, tx, p));
	}
	return { lines, points };
};

/**
 * Extracts line segments in the orientation/order of given grid iterator and
 * stores results in `acc`.
 *
 * @param opts
 * @param order
 * @param tx
 * @param isBorder
 * @param acc
 */
export const traceWithOrder = (
	opts: TraceOpts,
	order: Fn<GridIterOpts, Iterable<[number, number]>>,
	tx: PointTransform,
	isBorder: Predicate<[number, number]>,
	acc: VecPair[] = []
) => {
	const { img, select, clear, min } = { clear: 0, min: 2, ...opts };
	let curr: [number, number][] = [];
	for (let p of order({ cols: img.width, rows: img.height, tx })) {
		const c = select(img.getAtUnsafe(p[0], p[1]));
		if (c) curr.push(p);
		if ((curr.length > 0 && !c) || (curr.length > 1 && isBorder(p))) {
			if (curr.length >= min) {
				acc.push([curr[0], p]);
				for (let q of curr) img.setAtUnsafe(q[0], q[1], clear);
			}
			curr = [];
		}
	}
	return acc;
};

/**
 * Extracts single pixels and stores their coordinates in `acc`.
 *
 * @param opts
 * @param acc
 */
export const tracePoints = (
	{ img, select, clear }: TraceOpts,
	acc: Vec[] = []
) => {
	if (clear === undefined) clear = 0;
	for (let i = 0, n = img.data.length, w = img.width; i < n; i++) {
		if (select(img.data[i])) {
			acc.push([i % w, (i / w) | 0]);
			img.data[i] = clear;
		}
	}
	return acc;
};

/** @internal */
type BorderFn = FnU2<number, Predicate<[number, number]>>;

/** @internal */
const __borderX: BorderFn = (w) => {
	w--;
	return (p) => p[0] === 0 || p[0] === w;
};

/** @internal */
const __borderY: BorderFn = (_, h) => {
	h--;
	return (p) => p[1] === 0 || p[1] === h;
};

/** @internal */
const __borderXY: BorderFn = (w, h) => {
	w--;
	h--;
	return (p) => p[0] === 0 || p[0] === w || p[1] === 0 || p[1] === h;
};
