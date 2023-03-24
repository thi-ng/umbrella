import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api/sample";
import { sample as _arcVertices } from "@thi.ng/geom-arc/sample";
import { resample } from "@thi.ng/geom-resample/resample";
import { sampleCubic } from "@thi.ng/geom-splines/cubic-sample";
import { sampleQuadratic } from "@thi.ng/geom-splines/quadratic-sample";
import { cossin } from "@thi.ng/math/angle";
import { TAU } from "@thi.ng/math/api";
import type { Vec } from "@thi.ng/vectors";
import { add2, add3 } from "@thi.ng/vectors/add";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { madd2 } from "@thi.ng/vectors/madd";
import { set2 } from "@thi.ng/vectors/set";
import type { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { Cubic } from "./api/cubic.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import type { Path } from "./api/path.js";
import type { Points } from "./api/points.js";
import { Polygon } from "./api/polygon.js";
import type { Polyline } from "./api/polyline.js";
import type { Quadratic } from "./api/quadratic.js";
import type { Rect } from "./api/rect.js";
import { __dispatch } from "./internal/dispatch.js";
import { __circleOpts, __sampleAttribs } from "./internal/vertices.js";

/**
 * Extracts/samples vertices from given shape's boundary and returns them as
 * array. Some shapes also support
 * [`SamplingOpts`](https://docs.thi.ng/umbrella/geom-api/interfaces/SamplingOpts.html).
 *
 * @remarks
 * The given sampling options (if any) can also be overridden per shape using
 * the special `__samples` attribute. If specified, these will be merged with
 * the options.
 *
 * @example
 * ```ts
 * // using default
 * vertices(circle(100))
 *
 * // specify resolution only
 * vertices(circle(100), 6)
 *
 * // specify more advanced options
 * vertices(circle(100), { dist: 10 })
 *
 * // using shape attribs
 * vertices(circle(100, { __samples: { dist: 10 } }))
 * ```
 *
 * Currently implemented for:
 *
 * - {@link AABB}
 * - {@link Arc}
 * - {@link BPatch}
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Line}
 * - {@link Path}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param shape
 * @param opts
 */
export const vertices: MultiFn1O<
	IShape,
	number | Partial<SamplingOpts>,
	Vec[]
> = defmulti<any, number | Partial<SamplingOpts> | undefined, Vec[]>(
	__dispatch,
	{
		line: "polyline",
		bpatch: "points",
		points3: "points",
		quad: "poly",
		tri: "poly",
	},
	{
		// e +----+ h
		//   |\   :\
		//   |f+----+ g
		//   | |  : |
		// a +-|--+d|
		//    \|   \|
		//   b +----+ c
		//
		aabb: ({ pos, size }: AABB) => {
			const [px, py, pz] = pos;
			const [qx, qy, qz] = add3([], pos, size);
			return [
				[px, py, pz], // a
				[px, py, qz], // b
				[qx, py, qz], // c
				[qx, py, pz], // d
				[px, qy, pz], // e
				[px, qy, qz], // f
				[qx, qy, qz], // g
				[qx, qy, pz], // h
			];
		},

		arc: ($: Arc, opts?): Vec[] =>
			_arcVertices(
				$.pos,
				$.r,
				$.axis,
				$.start,
				$.end,
				__sampleAttribs(opts, $.attribs)
			),

		circle: ($: Circle, opts = DEFAULT_SAMPLES) => {
			opts = __sampleAttribs(opts, $.attribs)!;
			const pos = $.pos;
			const r = $.r;
			let [num, start, last] = __circleOpts(opts, r);
			const delta = TAU / num;
			last && num++;
			const buf: Vec[] = new Array(num);
			for (let i = 0; i < num; i++) {
				buf[i] = cartesian2(null, [r, start + i * delta], pos);
			}
			return buf;
		},

		cubic: ($: Cubic, opts?) =>
			sampleCubic($.points, __sampleAttribs(opts, $.attribs)),

		ellipse: ($: Ellipse, opts = DEFAULT_SAMPLES) => {
			opts = __sampleAttribs(opts, $.attribs)!;
			const buf: Vec[] = [];
			const pos = $.pos;
			const r = $.r;
			let [num, start, last] = __circleOpts(
				opts,
				Math.max($.r[0], $.r[1])
			);
			const delta = TAU / num;
			last && num++;
			for (let i = 0; i < num; i++) {
				buf[i] = madd2([], cossin(start + i * delta), r, pos);
			}
			return buf;
		},

		group: ($: Group, opts?) => {
			opts = __sampleAttribs(opts, $.attribs);
			return $.children.reduce(
				(acc, $) => acc.concat(vertices($, opts)),
				<Vec[]>[]
			);
		},

		path: ($: Path, opts?) => {
			opts = __sampleAttribs(opts, $.attribs);
			const _opts = isNumber(opts) ? { num: opts } : opts;
			let verts: Vec[] = [];
			for (
				let segs = $.segments, n = segs.length - 1, i = 0;
				i <= n;
				i++
			) {
				const s = segs[i];
				if (s.geo) {
					verts = verts.concat(
						vertices(s.geo, {
							..._opts,
							last: i === n && !$.closed,
						})
					);
				}
			}
			return verts;
		},

		points: ($: Points) => $.points,

		poly: ($: Polygon, opts?) =>
			resample($.points, __sampleAttribs(opts, $.attribs), true),

		polyline: ($: Polyline, opts?) =>
			resample($.points, __sampleAttribs(opts, $.attribs)),

		quadratic: ($: Quadratic, opts?) =>
			sampleQuadratic($.points, __sampleAttribs(opts, $.attribs)),

		rect: ($: Rect, opts?) => {
			opts = __sampleAttribs(opts, $.attribs);
			const p = $.pos;
			const q = add2([], p, $.size);
			const verts = [set2([], p), [q[0], p[1]], q, [p[0], q[1]]];
			return opts != null ? vertices(new Polygon(verts), opts) : verts;
		},
	}
);

/**
 * Takes an array of vertices or an `IShape`. If the latter, calls
 * {@link vertices} with default options and returns result, else returns
 * original array.
 *
 * @param shape -
 */
export const ensureVertices = (shape: IShape | Vec[]) =>
	isArray(shape) ? shape : vertices(shape);
