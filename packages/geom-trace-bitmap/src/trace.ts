import type { Fn, Predicate } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { GridIterOpts, PointTransform } from "@thi.ng/grid-iterators";
import { columns2d } from "@thi.ng/grid-iterators/columns";
import { diagonal2d } from "@thi.ng/grid-iterators/diagonal";
import { rows2d } from "@thi.ng/grid-iterators/rows";
import { flipX, ident } from "@thi.ng/grid-iterators/transforms";
import { mulV23 } from "@thi.ng/matrices/mulv";
import type { Vec, VecPair } from "@thi.ng/vectors";
import type { TraceBitmapOpts, TraceOpts } from "./api.js";
import { borderX, borderXY, borderY } from "./border.js";

/**
 * Main conversion/extraction function. According to given
 * {@link TraceBitmapOpts.flags}, extracts line segments and/or points from
 * given pixel buffer and returns object of results. By default _all_ line
 * directions and points are processed. If {@link TraceBitmapOpts.mat} is given,
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
	const mat = opts.mat;
	const { width, height } = opts.img;
	const lines: VecPair[] = [];
	const points: Vec[] = [];
	for (let d of opts.dir || "hvdp") {
		if (typeof d !== "string") {
			traceLines(
				opts,
				d.order,
				(d.border || borderXY)(width, height),
				d.tx || ident,
				lines
			);
			continue;
		}
		switch (d) {
			case "h":
				traceLines(opts, rows2d, borderX(width, height), ident, lines);
				break;
			case "v":
				traceLines(
					opts,
					columns2d,
					borderY(width, height),
					ident,
					lines
				);
				break;
			case "d": {
				const border = borderXY(width, height);
				traceLines(opts, diagonal2d, border, ident, lines);
				traceLines(opts, diagonal2d, border, flipX, lines);
				break;
			}
			case "p":
				tracePoints(opts, points);
				break;
			default:
				illegalArgs(`invalid trace direction: ${d}`);
		}
	}
	if (mat) {
		lines.forEach((p) => {
			mulV23(null, mat, p[0]);
			mulV23(null, mat, p[1]);
		});
		points.forEach((p) => mulV23(null, mat, p));
	}
	return { lines, points };
};

/**
 * Extracts line segments in the orientation/order of given grid iterator and
 * stores results in `acc`.
 *
 * @param opts
 * @param order
 * @param border
 * @param tx
 * @param acc
 */
export const traceLines = (
	opts: TraceOpts,
	order: Fn<GridIterOpts, Iterable<[number, number]>>,
	border: Predicate<[number, number]>,
	tx: PointTransform,
	acc: VecPair[] = []
) => {
	let { img, select, clear, last, min } = {
		clear: 0,
		last: true,
		min: 2,
		...opts,
	};
	min--;
	let curr: [number, number][] = [];
	let prevBorder = false;
	const $record = () => {
		acc.push([curr[0], curr[curr.length - 1]]);
		for (let q of curr) img.setAtUnsafe(q[0], q[1], clear);
	};
	for (let p of order({ cols: img.width, rows: img.height, tx })) {
		const c = select(img.getAtUnsafe(p[0], p[1]));
		const isBorder = border(p);
		const n = curr.length;
		if (c) {
			if (isBorder) {
				if (n > 0) {
					if (prevBorder) {
						if (n > min) $record();
						curr = [p];
					} else {
						if (n >= min) {
							curr.push(p);
							$record();
						}
						curr = [];
					}
				} else {
					curr.push(p);
				}
			} else {
				curr.push(p);
			}
		} else if (n > 0) {
			if (n > min) {
				if (last) curr.push(p);
				$record();
			}
			curr = [];
		}
		prevBorder = isBorder;
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
