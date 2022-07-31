import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SubdivKernel } from "@thi.ng/geom-api";
import { subdivide } from "@thi.ng/geom-subdiv-curve/subdivide";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Recursively applies {@link @thi.ng/geom-api#SubdivKernel} to given
 * shape/boundary. See {@link @thi.ng/geom-subdiv-curve#} package for further
 * details.
 *
 * @remarks
 * By default only applies a single iteration.
 *
 * Currently only implemented for:
 *
 * - {@link Polygon}
 * - {@link Polyline}
 *
 * @param shape
 * @param kernel
 * @param iter
 */
export const subdivCurve: MultiFn2O<IShape, SubdivKernel, number, IShape> =
	defmulti<any, SubdivKernel, number | undefined, IShape>(
		__dispatch,
		{},
		{
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
	);
