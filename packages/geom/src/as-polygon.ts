import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import { Polygon } from "./api/polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Converts given shape into a {@link Polygon}, optionally using provided
 * {@link @thi.ng/geom-api#SamplingOpts} or number of target vertices.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Circle}
 * - {@link Ellipse}
 * - {@link Line}
 * - {@link Path}
 * - {@link Poly}
 * - {@link Polyline} (will be closed)
 * - {@link Quad}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param shape
 * @param opts
 */
export const asPolygon: MultiFn1O<
	IShape,
	number | Partial<SamplingOpts>,
	Polygon
> = defmulti<IShape, number | Partial<SamplingOpts> | undefined, Polygon>(
	__dispatch,
	{
		circle: "points",
		ellipse: "points",
		line: "points",
		path: "points",
		poly: "points",
		polyline: "points",
		quad: "points",
		rect: "points",
		tri: "points",
	},
	{
		points: ($, opts) => new Polygon(vertices($, opts), __copyAttribs($)),
	}
);
