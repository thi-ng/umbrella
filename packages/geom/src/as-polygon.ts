import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import { Polygon } from "./api/polygon.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Converts given shape into a {@link Polygon}, optionally using provided
 * [`SamplingOpts`](https://docs.thi.ng/umbrella/geom-api/interfaces/SamplingOpts.html)
 * or number of target vertices.
 *
 * @remarks
 * If the shape has a `__samples` attribute, it will be removed in the result to
 * avoid recursive application.
 *
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
		points: ($, opts) => new Polygon(vertices($, opts), __attribs($)),
	}
);
