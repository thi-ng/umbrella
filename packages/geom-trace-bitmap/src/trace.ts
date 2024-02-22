import type { Fn, Predicate } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { GridIterOpts2D, PointTransform2D } from "@thi.ng/grid-iterators";
import { columns2d } from "@thi.ng/grid-iterators/columns";
import { diagonal2d } from "@thi.ng/grid-iterators/diagonal";
import { rows2d } from "@thi.ng/grid-iterators/rows";
import { flipX, ident } from "@thi.ng/grid-iterators/transforms";
import { mulV23 } from "@thi.ng/matrices/mulv";
import type { Vec, VecPair } from "@thi.ng/vectors";
import type { TraceBitmapOpts, TraceDir, TraceOpts } from "./api.js";
import { borderX, borderXY, borderY } from "./border.js";

/**
 * Main conversion/extraction function. According to given
 * {@link TraceBitmapOpts.dir}, extracts line segments and/or points from given
 * pixel buffer and returns object of results. By default _all_ line directions
 * and points are processed. If {@link TraceBitmapOpts.mat} is given, all
 * coordinates are transformed with that matrix.
 *
 * ```ts
 * // extract horizontal line segments
 * traceBitmap({ img: ..., dir: ["h"] })
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
	for (let d of opts.dir || ["h", "v", "d1", "d2", "p"]) {
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
		switch (<TraceDir>d) {
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
			case "d1":
				traceLines(
					opts,
					diagonal2d,
					borderXY(width, height),
					ident,
					lines
				);
				break;
			case "d2":
				traceLines(
					opts,
					diagonal2d,
					borderXY(width, height),
					flipX,
					lines
				);
				break;
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
	order: Fn<GridIterOpts2D, Iterable<[number, number]>>,
	border: Predicate<[number, number]>,
	tx: PointTransform2D,
	acc: VecPair[] = []
) => {
	let { clear = 0, last = true, min = 2, max = Infinity, img, select } = opts;
	min--;
	let curr: [number, number][] = [];
	let prevBorder = false;
	const $record = () => {
		acc.push([curr[0], curr[curr.length - 1]]);
		for (let q of curr) img.setAtUnsafe(q[0], q[1], clear);
	};
	for (let p of order({ cols: img.width, rows: img.height, tx })) {
		const c = select(img.getAtUnsafe(p[0], p[1]), p);
		const isBorder = border(p);
		const n = curr.length;
		if (c) {
			if (isBorder || n >= max) {
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
		if (select(img.data[i], [i % w, (i / w) | 0])) {
			acc.push([i % w, (i / w) | 0]);
			img.data[i] = clear;
		}
	}
	return acc;
};
