import type { Maybe } from "@thi.ng/api";
import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SubdivKernel } from "@thi.ng/geom-api";
import * as sdc from "@thi.ng/geom-subdiv-curve/api";
import { subdivide } from "@thi.ng/geom-subdiv-curve/subdivide";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link subdivCurve}.
 */
export type SubdivCurveFn = {
	(
		shape: ComplexPolygon,
		kernel: SubdivKernel,
		iter?: number
	): ComplexPolygon;
	(shape: Polygon, kernel: SubdivKernel, iter?: number): Polygon;
	(shape: Polyline, kernel: SubdivKernel, iter?: number): Polyline;
} & MultiFn2O<IShape, SubdivKernel, number, IShape>;

/**
 * Recursively applies
 * [`SubdivKernel`](https://docs.thi.ng/umbrella/geom-api/interfaces/SubdivKernel.html)
 * to given shape/boundary. See
 * [thi.ng/geom-subdiv-curve](https://thi.ng/thi.ng/geom-subdiv-curve) package
 * for further details.
 *
 * @remarks
 * By default only applies a single iteration.
 *
 * Currently only implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Ellipse}
 * - {@link Line}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @example
 * ```ts
 *
 * ```
 *
 * @param shape
 * @param kernel
 * @param iter
 */
export const subdivCurve = <SubdivCurveFn>(
	defmulti<any, SubdivKernel, Maybe<number>, IShape>(
		__dispatch,
		{
			arc: "$aspolyline",
			circle: "$aspoly",
			ellipse: "$aspoly",
			line: "polyline",
			quad: "poly",
			rect: "$aspoly",
			tri: "poly",
		},
		{
			$aspolyline: ($, kernel, iter = 1) =>
				subdivCurve(asPolyline($)[0], kernel, iter),

			$aspoly: ($, kernel, iter = 1) =>
				subdivCurve(asPolygon($)[0], kernel, iter),

			complexpoly: ($: ComplexPolygon, kernel, iter) =>
				new ComplexPolygon(
					subdivCurve($.boundary, kernel, iter),
					$.children.map((child) => subdivCurve(child, kernel, iter)),
					__copyAttribs($)
				),

			poly: ($: Polygon, kernel, iter = 1) =>
				new Polygon(
					subdivide($.points, kernel, iter),
					__copyAttribs($)
				),

			polyline: ($: Polyline, kernel, iter = 1) =>
				new Polyline(
					subdivide($.points, kernel, iter),
					__copyAttribs($)
				),
		}
	)
);

/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_MID_OPEN`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_MID_OPEN.html)
 */
export const SUBDIV_MID_OPEN = sdc.SUBDIV_MID_OPEN;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_MID_CLOSED`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_MID_CLOSED.html)
 */
export const SUBDIV_MID_CLOSED = sdc.SUBDIV_MID_CLOSED;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_THIRDS_OPEN`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_THIRDS_OPEN.html)
 */
export const SUBDIV_THIRDS_OPEN = sdc.SUBDIV_THIRDS_OPEN;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_THIRDS_CLOSED`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_THIRDS_CLOSED.html)
 */
export const SUBDIV_THIRDS_CLOSED = sdc.SUBDIV_THIRDS_CLOSED;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_CHAIKIN_OPEN`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_CHAIKIN_OPEN.html)
 */
export const SUBDIV_CHAIKIN_OPEN = sdc.SUBDIV_CHAIKIN_OPEN;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_CHAIKIN_CLOSED`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_CHAIKIN_CLOSED.html)
 */
export const SUBDIV_CHAIKIN_CLOSED = sdc.SUBDIV_CHAIKIN_CLOSED;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_CUBIC_CLOSED`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_CUBIC_CLOSED.html)
 */
export const SUBDIV_CUBIC_CLOSED = sdc.SUBDIV_CUBIC_CLOSED;
