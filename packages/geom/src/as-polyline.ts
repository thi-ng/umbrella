import type { Maybe } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { set } from "@thi.ng/vectors/set";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Group } from "./api/group.js";
import { Path } from "./api/path.js";
import { Polyline } from "./api/polyline.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Converts given shape into an array of {@link Polyline}, optionally using
 * provided
 * [`SamplingOpts`](https://docs.thi.ng/umbrella/geom-api/interfaces/SamplingOpts.html)
 * or number of target vertices.
 *
 * @remarks
 * If the shape has a `__samples` attribute, it will be removed in the results
 * to avoid recursive application.
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Line}
 * - {@link Path}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param shape
 * @param opts
 */
export const asPolyline: MultiFn1O<
	IShape,
	number | Partial<SamplingOpts>,
	Polyline[]
> = defmulti<any, Maybe<number | Partial<SamplingOpts>>, Polyline[]>(
	__dispatch,
	{
		arc: "points",
		circle: "poly",
		cubic: "points",
		ellipse: "poly",
		line: "points",
		polyline: "points",
		quad: "poly",
		quadratic: "points",
		rect: "poly",
		tri: "poly",
	},
	{
		complexpoly: ($: ComplexPolygon, opts) => [
			...asPolyline($.boundary, opts),
			...mapcat((child) => asPolyline(child, opts), $.children),
		],

		group: ($: Group, opts) => [
			...mapcat((child) => asPolyline(child, opts), $.children),
		],

		points: ($, opts) => [new Polyline(vertices($, opts), __attribs($))],

		path: ($: Path, opts) => {
			const tmp = new Path();
			return [
				...map(
					(segments) => {
						tmp.segments = segments;
						const pts = vertices(tmp, opts);
						peek(segments).type === "z" &&
							pts.push(set([], pts[0]));
						return new Polyline(pts, __attribs($));
					},
					[$.segments, ...$.subPaths]
				),
			];
		},

		poly: ($, opts) => {
			const pts = vertices($, opts);
			pts.push(set([], pts[0]));
			return [new Polyline(pts, __attribs($))];
		},
	}
);
