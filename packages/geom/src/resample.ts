import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { resample as _resample } from "@thi.ng/geom-resample/resample";
import type { IShape, IShape2, IShape3, SamplingOpts } from "./api.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Cubic } from "./api/cubic.js";
import type { Cubic3 } from "./api/cubic3.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Line3 } from "./api/line3.js";
import type { Polygon } from "./api/polygon.js";
import type { Polygon3 } from "./api/polygon3.js";
import type { Polyline } from "./api/polyline.js";
import type { Polyline3 } from "./api/polyline3.js";
import type { Quad3 } from "./api/quad3.js";
import type { Quadratic } from "./api/quadratic.js";
import type { Quadratic3 } from "./api/quadratic3.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link resample}.
 */
export type ResampleFn = {
	(
		shape: ComplexPolygon,
		opts: number | Partial<SamplingOpts>
	): ComplexPolygon;
	(shape: Cubic, opts: number | Partial<SamplingOpts>): Polyline;
	(shape: Cubic3, opts: number | Partial<SamplingOpts>): Polyline3;
	(shape: Group, opts: number | Partial<SamplingOpts>): Group;
	(shape: Line, opts: number | Partial<SamplingOpts>): Polyline;
	(shape: Line3, opts: number | Partial<SamplingOpts>): Polyline3;
	(shape: Polyline, opts: number | Partial<SamplingOpts>): Polyline;
	(shape: Polyline3, opts: number | Partial<SamplingOpts>): Polyline3;
	(shape: Quadratic, opts: number | Partial<SamplingOpts>): Polyline;
	(shape: Quadratic3, opts: number | Partial<SamplingOpts>): Polyline3;
	(shape: Quad3, opts: number | Partial<SamplingOpts>): Polygon3;
	(shape: IShape2, opts: number | Partial<SamplingOpts>): Polygon;
	(shape: IShape3, opts: number | Partial<SamplingOpts>): IShape3;
} & MultiFn2<IShape, number | Partial<SamplingOpts>, IShape>;

/**
 * Resamples given shape with given options and returns result as polygon (if
 * closed) or polyline (if open).
 *
 * @remarks
 * If the shape has a `__samples` attribute, it will be removed in the result to
 * ensure idempotent behavior.
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Ellipse}
 * - {@link Line}
 * - {@link Line3}
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
 * @param shape
 * @param opts
 */
export const resample = <ResampleFn>(
	defmulti<any, number | Partial<SamplingOpts>, IShape>(
		__dispatch,
		{
			arc: "$aspolyline",
			circle: "$aspoly",
			complexpoly: "group",
			cubic: "$aspolyline",
			cubic3: "$aspolyline",
			ellipse: "$aspoly",
			line: "$aspolyline",
			line3: "$aspolyline",
			poly3: "poly",
			polyline3: "polyline",
			quad: "$aspoly",
			quad3: "$aspoly",
			quadratic: "$aspolyline",
			quadratic3: "$aspolyline",
			rect: "$aspoly",
			tri: "$aspoly",
			tri3: "$aspoly",
		},
		{
			$aspoly: ($: IShape, opts) => asPolygon($, opts)[0],

			$aspolyline: ($: IShape, opts) => asPolyline($, opts)[0],

			group: ($: Group, opts) =>
				$.copyTransformed((child) => resample(child, opts)),

			poly: ($: Polygon, opts) =>
				$.copyTransformed((points) =>
					_resample(points, opts, true, true)
				),

			polyline: ($: Polyline, opts) =>
				$.copyTransformed((points) =>
					_resample(points, opts, false, true)
				),
		}
	)
);
