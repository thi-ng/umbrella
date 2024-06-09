import type { Maybe } from "@thi.ng/api";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { copy } from "@thi.ng/vectors/copy";
import type { IShape, IShape2, IShape3, SamplingOpts } from "./api.js";
import type { Arc } from "./api/arc.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Path } from "./api/path.js";
import { Path3 } from "./api/path3.js";
import { Polygon } from "./api/polygon.js";
import { Polygon3 } from "./api/polygon3.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Function overrides for {@link asPolygon}.
 */
export type AsPolygonFn = {
	(shape: IShape2, opts?: number | Partial<SamplingOpts>): Polygon[];
	(shape: IShape3, opts?: number | Partial<SamplingOpts>): Polygon3[];
} & MultiFn1O<IShape, number | Partial<SamplingOpts>, (Polygon | Polygon3)[]>;

/**
 * Converts given shape boundary into an array of {@link Polygon}s or
 * {@link Polygon3}, optionally using provided
 * [`SamplingOpts`](https://docs.thi.ng/umbrella/geom/interfaces/SamplingOpts.html)
 * or number of target vertices.
 *
 * @remarks
 * If the input shape has a `__samples` attribute, it will be removed in the
 * results polys to avoid recursive application.
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Ellipse}
 * - {@link Line}  (will be closed)
 * - {@link Line3}  (will be closed)
 * - {@link Path}
 * - {@link Path3}
 * - {@link Polygon}
 * - {@link Polygon3}
 * - {@link Polyline} (will be closed)
 * - {@link Polyline3} (will be closed)
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Rect}
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * @param shape
 * @param opts
 */
export const asPolygon = <AsPolygonFn>(
	defmulti<
		any,
		Maybe<number | Partial<SamplingOpts>>,
		(Polygon | Polygon3)[]
	>(
		__dispatch,
		{
			circle: "points",
			ellipse: "points",
			line: "points",
			line3: "points3",
			poly: "points",
			poly3: "points3",
			polyline: "points",
			polyline3: "points3",
			quad: "points",
			quad3: "points3",
			rect: "points",
			tri: "points",
			tri3: "points3",
		},
		{
			arc: ($: Arc, opts) => {
				const pts = [copy($.pos), ...vertices($, opts)];
				return [new Polygon(pts, __attribs($))];
			},

			complexpoly: ($: ComplexPolygon, opts) =>
				[$.boundary, ...$.children].map(
					(x) => new Polygon(vertices(x, opts), __attribs($))
				),

			path: ($: Path, opts) => {
				const tmp = new Path([], [], $.attribs);
				return [$.segments, ...$.subPaths].map((segments) => {
					tmp.segments = segments;
					return new Polygon(vertices(tmp, opts), __attribs($));
				});
			},

			path3: ($: Path3, opts) => {
				const tmp = new Path3();
				return [$.segments, ...$.subPaths].map((segments) => {
					tmp.segments = segments;
					return new Polygon3(vertices(tmp, opts), __attribs($));
				});
			},

			points: ($: IShape2, opts) => [
				new Polygon(vertices($, opts), __attribs($)),
			],

			points3: ($: IShape3, opts) => [
				new Polygon3(vertices($, opts), __attribs($)),
			],
		}
	)
);
