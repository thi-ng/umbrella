import type { Maybe } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, IShape2, IShape3, SamplingOpts } from "@thi.ng/geom-api";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { set } from "@thi.ng/vectors/set";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Group } from "./api/group.js";
import { Path } from "./api/path.js";
import { Polyline } from "./api/polyline.js";
import { Polyline3 } from "./api/polyline3.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Function overrides for {@link asPolyline}.
 */
export type AsPolylineFn = {
	<T extends IShape2>(
		shape: T,
		opts?: number | Partial<SamplingOpts>
	): Polyline[];
	<T extends IShape3>(
		shape: T,
		opts?: number | Partial<SamplingOpts>
	): Polyline3[];
} & MultiFn1O<IShape, number | Partial<SamplingOpts>, (Polyline | Polyline3)[]>;

/**
 * Converts given shape boundary into an array of {@link Polyline}s or
 * {@link Polyline3}, optionally using provided
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
export const asPolyline = <AsPolylineFn>(
	defmulti<
		any,
		Maybe<number | Partial<SamplingOpts>>,
		(Polyline | Polyline3)[]
	>(
		__dispatch,
		{
			arc: "points",
			circle: "poly",
			cubic: "points",
			cubic3: "points3",
			ellipse: "poly",
			line: "points",
			line3: "points3",
			polyline: "points",
			polyline3: "points3",
			quad: "poly",
			quad3: "poly3",
			quadratic: "points",
			quadratic3: "points3",
			rect: "poly",
			tri: "poly",
			tri3: "poly3",
		},
		{
			complexpoly: ($: ComplexPolygon, opts) => [
				...asPolyline($.boundary, opts),
				...mapcat((child) => asPolyline(child, opts), $.children),
			],

			group: ($: Group, opts) => [
				...mapcat((child) => asPolyline(child, opts), $.children),
			],

			points: ($, opts) => [
				new Polyline(vertices($, opts), __attribs($)),
			],

			points3: ($, opts) => [
				new Polyline3(vertices($, opts), __attribs($)),
			],

			path: ($: Path, opts) => {
				const tmp = new Path([], [], $.attribs);
				return [$.segments, ...$.subPaths].map((segments) => {
					tmp.segments = segments;
					const pts = vertices(tmp, opts);
					peek(segments).type === "z" && pts.push(set([], pts[0]));
					return new Polyline(pts, __attribs($));
				});
			},

			poly: ($, opts) => {
				const pts = vertices($, opts);
				pts.push(set([], pts[0]));
				return [new Polyline(pts, __attribs($))];
			},

			poly3: ($, opts) => {
				const pts = vertices($, opts);
				pts.push(set([], pts[0]));
				return [new Polyline3(pts, __attribs($))];
			},
		}
	)
);
