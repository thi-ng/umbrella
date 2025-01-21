// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import * as sdc from "@thi.ng/geom-subdiv-curve/kernels";
import { subdivide } from "@thi.ng/geom-subdiv-curve/subdivide";
import { repeat } from "@thi.ng/transducers/repeat";
import type {
	IHiccupShape2,
	IShape,
	IShape2,
	IShape3,
	SubdivKernel,
} from "./api.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
import type { Ellipse } from "./api/ellipse.js";
import { Group } from "./api/group.js";
import { Group3 } from "./api/group3.js";
import type { Line } from "./api/line.js";
import type { Line3 } from "./api/line3.js";
import { Polygon } from "./api/polygon.js";
import { Polygon3 } from "./api/polygon3.js";
import { Polyline } from "./api/polyline.js";
import { Polyline3 } from "./api/polyline3.js";
import type { Quad } from "./api/quad.js";
import type { Quad3 } from "./api/quad3.js";
import type { Rect } from "./api/rect.js";
import type { Triangle } from "./api/triangle.js";
import type { Triangle3 } from "./api/triangle3.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link subdivCurve}.
 */
export type SubdivCurveFn = {
	(
		shape: Arc,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polyline;
	(
		shape: Circle,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon;
	(
		shape: Ellipse,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon;
	(
		shape: ComplexPolygon,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): ComplexPolygon;
	(shape: Group, kernel: SubdivKernel | SubdivKernel[], iter?: number): Group;
	(
		shape: Group3,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Group3;
	(
		shape: Line,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polyline;
	(
		shape: Line3,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polyline3;
	(
		shape: Polygon,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon;
	(
		shape: Polyline,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polyline;
	(
		shape: Polyline3,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polyline3;
	(
		shape: Quad,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon;
	(
		shape: Quad3,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon3;
	(
		shape: Rect,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon;
	(
		shape: Triangle,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon;
	(
		shape: Triangle3,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): Polygon3;
	(
		shape: IShape2,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): IShape2;
	(
		shape: IShape3,
		kernel: SubdivKernel | SubdivKernel[],
		iter?: number
	): IShape3;
} & MultiFn2O<IShape, SubdivKernel | SubdivKernel[], number, IShape>;

/**
 * Iteratively applies
 * [`SubdivKernel`](https://docs.thi.ng/umbrella/geom-subdiv-curve/interfaces/SubdivKernel.html)
 * (or array of kernels) to given shape. See
 * [thi.ng/geom-subdiv-curve](https://thi.ng/thi.ng/geom-subdiv-curve) package
 * for further details and description of available subdivision presets.
 *
 * @remarks
 * If only given a single subdivision kernel, a number of iterations can be
 * specified (by default only a single iteration is applied).
 *
 * The following subdivision algorithms are provided:
 *
 * - {@link SUBDIV_CHAIKIN}
 * - {@link SUBDIV_CUBIC}
 * - {@link SUBDIV_DISPLACE} (higher order kernel)
 * - {@link SUBDIV_DLG}
 * - {@link SUBDIV_MID}
 * - {@link SUBDIV_THIRDS}
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Ellipse}
 * - {@link Group} (if it only contains supported shapes)
 * - {@link Group3} (if it only contains supported shapes)
 * - {@link Line}
 * - {@link Line3}
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
 * @example
 * ```ts tangle:../export/subdiv-curve.ts
 * import { asSvg, rect, subdivCurve, SUBDIV_CHAIKIN_CLOSED } from "@thi.ng/geom";
 *
 * console.log(
 *   asSvg(subdivCurve(rect(100), SUBDIV_CHAIKIN_CLOSED))
 * );
 * // <polygon points="0,25 25,0 75,0 100,25 100,75 75,100 25,100 0,75"/>
 * ```
 *
 * @param shape
 * @param kernel
 * @param iter
 */
export const subdivCurve = <SubdivCurveFn>(
	defmulti<any, SubdivKernel | SubdivKernel[], Maybe<number>, IShape>(
		__dispatch,
		{
			arc: "$aspolyline",
			circle: "$aspoly",
			complexpoly: "group",
			ellipse: "$aspoly",
			group3: "group",
			line: "polyline",
			line3: "polyline",
			poly3: "poly",
			polyline3: "polyline",
			quad: "poly",
			quad3: "poly3",
			rect: "$aspoly",
			tri: "poly",
			tri3: "poly3",
		},
		{
			$aspolyline: ($, kernel, iter = 1) =>
				subdivCurve(asPolyline($)[0], kernel, iter),

			$aspoly: ($, kernel, iter = 1) =>
				subdivCurve(asPolygon($)[0], kernel, iter),

			group: ($: Group, kernel, iter) => {
				kernel = __kernelArray(kernel, iter);
				return $.copyTransformed(
					(child) => <IHiccupShape2>subdivCurve(child, kernel, iter)
				);
			},

			poly: ($: Polygon, kernel, iter) =>
				$.copyTransformed((points) =>
					subdivide(points, __kernelArray(kernel, iter), true)
				),

			polyline: ($: Polyline, kernel, iter) =>
				$.copyTransformed((points) =>
					subdivide(points, __kernelArray(kernel, iter))
				),
		}
	)
);

const __kernelArray = (kernel: SubdivKernel | SubdivKernel[], iter = 1) =>
	isArray(kernel) ? kernel : [...repeat(kernel, iter)];

/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_MID`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_MID.html)
 */
export const SUBDIV_MID = sdc.SUBDIV_MID;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_THIRDS`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_THIRDS.html)
 */
export const SUBDIV_THIRDS = sdc.SUBDIV_THIRDS;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_CHAIKIN`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_CHAIKIN.html)
 */
export const SUBDIV_CHAIKIN = sdc.SUBDIV_CHAIKIN;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_CUBIC`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_CUBIC.html)
 */
export const SUBDIV_CUBIC = sdc.SUBDIV_CUBIC;
/**
 * Higher-order subdiv kernel. Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_DISPLACE`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_DISPLACE.html)
 */
export const SUBDIV_DISPLACE = sdc.SUBDIV_DISPLACE;
/**
 * Re-export of thi.ng/geom-subdiv-curve
 * [`SUBDIV_DLG`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_DLG.html)
 */
export const SUBDIV_DLG = sdc.SUBDIV_DLG;
