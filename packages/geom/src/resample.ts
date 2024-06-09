import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { resample as _resample } from "@thi.ng/geom-resample/resample";
import type { IShape, IShape2, PCLike, SamplingOpts } from "./api.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
import type { Line } from "./api/line.js";
import { Polygon } from "./api/polygon.js";
import { Polygon3 } from "./api/polygon3.js";
import { Polyline } from "./api/polyline.js";
import { Polyline3 } from "./api/polyline3.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link resample}.
 */
export type ResampleFn = {
	(
		shape: ComplexPolygon,
		opts: number | Partial<SamplingOpts>
	): ComplexPolygon;
	(shape: Line, opts: number | Partial<SamplingOpts>): Polyline;
	(shape: Polyline, opts: number | Partial<SamplingOpts>): Polyline;
	(shape: IShape2, opts: number | Partial<SamplingOpts>): Polygon;
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
			cubic: "$aspolyline",
			cubic3: "$aspolyline",
			ellipse: "$aspoly",
			line: "polyline",
			line3: "polyline3",
			quad: "poly",
			quad3: "poly3",
			quadratic: "$aspolyline",
			quadratic3: "$aspolyline",
			rect: "circle",
			tri: "poly",
			tri3: "poly3",
		},
		{
			$aspoly: ($: IShape, opts) => asPolygon($, opts)[0],

			$aspolyline: ($: IShape, opts) => asPolyline($, opts)[0],

			complexpoly: ($: ComplexPolygon, opts) =>
				new ComplexPolygon(
					resample($.boundary, opts),
					$.children.map((child) => resample(child, opts)),
					__attribs($)
				),

			poly: ($: PCLike, opts) =>
				new Polygon(
					_resample($.points, opts, true, true),
					__attribs($)
				),

			poly3: ($: PCLike, opts) =>
				new Polygon3(
					_resample($.points, opts, true, true),
					__attribs($)
				),

			polyline: ($: PCLike, opts) =>
				new Polyline(
					_resample($.points, opts, false, true),
					__attribs($)
				),

			polyline3: ($: PCLike, opts) =>
				new Polyline3(
					_resample($.points, opts, false, true),
					__attribs($)
				),
		}
	)
);
