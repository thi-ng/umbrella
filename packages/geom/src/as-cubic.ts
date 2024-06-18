import type { Maybe } from "@thi.ng/api";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	Attribs,
	CubicOpts,
	IShape,
	IShape2,
	IShape3,
	PCLike,
} from "./api.js";
import {
	closedCubicFromBreakPoints,
	openCubicFromBreakPoints,
} from "@thi.ng/geom-splines/cubic-from-breakpoints";
import {
	closedCubicFromControlPoints,
	openCubicFromControlPoints,
} from "@thi.ng/geom-splines/cubic-from-controlpoints";
import { cubicHobby2 } from "@thi.ng/geom-splines/cubic-hobby";
import { TAU } from "@thi.ng/math/api";
import { concat } from "@thi.ng/transducers/concat";
import { flatten1 } from "@thi.ng/transducers/flatten1";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { BPatch } from "./api/bpatch.js";
import type { Circle } from "./api/circle.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Cubic } from "./api/cubic.js";
import { Cubic3 } from "./api/cubic3.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Path } from "./api/path.js";
import type { Polygon } from "./api/polygon.js";
import type { Polygon3 } from "./api/polygon3.js";
import type { Polyline } from "./api/polyline.js";
import type { Polyline3 } from "./api/polyline3.js";
import type { Quadratic } from "./api/quadratic.js";
import type { Quadratic3 } from "./api/quadratic3.js";
import type { Rect } from "./api/rect.js";
import { arc } from "./arc.js";
import { asPolygon } from "./as-polygon.js";
import { cubicFromArc, cubicFromLine, cubicFromQuadratic } from "./cubic.js";
import { cubicFromLine3, cubicFromQuadratic3 } from "./cubic3.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";

export interface AsCubicOpts extends CubicOpts {
	attribs: boolean;
}

/**
 * Function overrides for {@link asCubic}.
 */
export type AsCubicFn = {
	<T extends IShape2>(shape: T, opts?: Partial<AsCubicOpts>): Cubic[];
	<T extends IShape3>(shape: T, opts?: Partial<AsCubicOpts>): Cubic3[];
} & MultiFn1O<IShape, Partial<AsCubicOpts>, (Cubic | Cubic3)[]>;

/**
 * Converts given shape boundary into an array of {@link Cubic} or
 * {@link Cubic3} curves. For some shapes (see below) the conversion supports
 * optionally provided {@link CubicOpts}.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link BPatch}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Group3}
 * - {@link Line}
 * - {@link Line3}
 * - {@link Path}
 * - {@link Path3}
 * - {@link Polygon}
 * - {@link Polygon3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Quadratic}
 * - {@link Quadratic3}
 * - {@link Rect}
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * Shape types supporting custom conversion options (see
 * [@thi.ng/geom-splines](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-splines#cubic-curve-conversion-from-polygons--polylines)
 * for more details):
 *
 * - {@link Group} (only used for eligible children)
 * - {@link Group3} (only used for eligible children)
 * - {@link ComplexPolygon}
 * - {@link Polygon}
 * - {@link Polygon3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Rect}
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * @param shape
 * @param opts
 */
export const asCubic = <AsCubicFn>(
	defmulti<any, Maybe<Partial<AsCubicOpts>>, (Cubic | Cubic3)[]>(
		__dispatch,
		{
			cubic3: "cubic",
			ellipse: "circle",
			group3: "group",
			quad: "poly",
			quad3: "poly3",
			rect: "$aspoly",
			tri: "poly",
		},
		{
			$aspoly: ($, opts) => asCubic(asPolygon($)[0], opts),

			arc: cubicFromArc,

			bpatch: ({ points, attribs }: BPatch, opts) =>
				[
					[0, 4],
					[12, 1],
					[15, -4],
					[3, -1],
				].map(
					([i, s]) =>
						new Cubic(
							[
								points[i],
								points[i + s],
								points[i + 2 * s],
								points[i + 3 * s],
							],
							__attribs(opts, attribs)
						)
				),

			circle: ($: Circle, opts) =>
				asCubic(
					arc(
						$.pos,
						$.r,
						0,
						0,
						TAU,
						true,
						true,
						__attribs(opts, $.attribs)
					)
				),

			complexpoly: (
				{ boundary, children, attribs }: ComplexPolygon,
				opts
			) => [
				...mapcat(
					(x) =>
						asCubic(x, opts).map(
							(x) => ((x.attribs = __attribs(opts, attribs)), x)
						),
					[boundary, ...children]
				),
			],

			cubic: ($: Cubic, opts) => {
				const res = $.copy();
				if (opts?.attribs === false) res.attribs = undefined;
				return [res];
			},

			extra: () => [],

			group: ($: Group, opts) => [
				...mapcat((x) => asCubic(x, opts), $.children),
			],

			line: ({ points, attribs }: Line, opts) => [
				cubicFromLine(points[0], points[1], __attribs(opts, attribs)),
			],

			line3: ({ points, attribs }: Line, opts) => [
				cubicFromLine3(points[0], points[1], __attribs(opts, attribs)),
			],

			path: ($: Path) => [
				...mapcat(
					(segment) => (segment.geo ? asCubic(segment.geo) : null),
					concat($.segments, flatten1($.subPaths))
				),
			],

			poly: ($: Polygon, opts) =>
				__polyCubic(Cubic, $, opts, {
					default: closedCubicFromControlPoints,
					break: closedCubicFromBreakPoints,
					hobby: (pts, scale) => cubicHobby2(pts, true, scale),
				}),

			poly3: ($: Polygon3, opts) =>
				__polyCubic(Cubic3, $, opts, {
					default: closedCubicFromControlPoints,
					break: closedCubicFromBreakPoints,
				}),

			polyline: ($: Polyline, opts) =>
				__polyCubic(Cubic, $, opts, {
					default: openCubicFromControlPoints,
					break: openCubicFromBreakPoints,
					hobby: (pts, scale) => cubicHobby2(pts, false, scale),
				}),

			polyline3: ($: Polyline3, opts) =>
				__polyCubic(Cubic3, $, opts, {
					default: openCubicFromControlPoints,
					break: openCubicFromBreakPoints,
				}),

			quadratic: ({ points: [a, b, c], attribs }: Quadratic, opts) => [
				cubicFromQuadratic(a, b, c, __attribs(opts, attribs)),
			],

			quadratic3: ({ points: [a, b, c], attribs }: Quadratic3, opts) => [
				cubicFromQuadratic3(a, b, c, __attribs(opts, attribs)),
			],
		}
	)
);

type CubicConstructor<T extends Cubic | Cubic3> = {
	new (pts: Vec[], attribs?: Attribs): T;
};

type CubicConversions = Record<
	CubicOpts["mode"],
	(points: ReadonlyVec[], scale?: number, uniform?: boolean) => Vec[][]
>;

/**
 * @internal
 */
const __polyCubic = <T extends Cubic | Cubic3>(
	ctor: CubicConstructor<T>,
	{ points, attribs }: PCLike,
	opts: Maybe<Partial<CubicOpts>>,
	conversions: Partial<CubicConversions>
) => {
	opts = { mode: "default", uniform: false, scale: 1 / 3, ...opts };
	const fn = conversions[opts.mode!];
	if (!fn) unsupported(`conversion mode: ${opts.mode}`);
	return fn(points, opts.scale, opts.uniform).map(
		(pts) => new ctor(pts, __attribs(opts, attribs))
	);
};

const __attribs = (opts?: Partial<AsCubicOpts>, attribs?: Attribs) =>
	attribs && opts?.attribs !== false ? __copyAttribs(attribs) : undefined;
