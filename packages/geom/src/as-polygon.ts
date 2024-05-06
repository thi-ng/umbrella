import type { Maybe } from "@thi.ng/api";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Path } from "./api/path.js";
import { Polygon } from "./api/polygon.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Converts given shape into an array of {@link Polygon}s, optionally using
 * provided
 * [`SamplingOpts`](https://docs.thi.ng/umbrella/geom-api/interfaces/SamplingOpts.html)
 * or number of target vertices.
 *
 * @remarks
 * If the input shape has a `__samples` attribute, it will be removed in the
 * results polys to avoid recursive application.
 *
 * Currently implemented for:
 *
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Ellipse}
 * - {@link Line}  (will be closed)
 * - {@link Path}
 * - {@link Polygon}
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
	Polygon[]
> = defmulti<any, Maybe<number | Partial<SamplingOpts>>, Polygon[]>(
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
		complexpoly: ($: ComplexPolygon, opts) =>
			[$.boundary, ...$.children].map(
				(x) => new Polygon(vertices(x, opts), __attribs($))
			),

		path: ($: Path, opts) => {
			const tmp = new Path();
			return [$.segments, ...$.subPaths].map((segments) => {
				tmp.segments = segments;
				return new Polygon(vertices(tmp, opts), __attribs($));
			});
		},

		points: ($: IShape, opts) => [
			new Polygon(vertices($, opts), __attribs($)),
		],
	}
);
