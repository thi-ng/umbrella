import type { MultiFn2O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { Attribs, CubicOpts, IShape, PathSegment } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { copy } from "@thi.ng/vectors/copy";
import type { Arc } from "./api/arc.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import type { Polygon } from "./api/polygon.js";
import type { Polyline } from "./api/polyline.js";
import { asCubic } from "./as-cubic.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { pathFromCubics } from "./path.js";

export interface AsPathOpts extends CubicOpts {
	/**
	 * If true (default: false), creates path consisting of linear segments
	 * only.
	 */
	linear: boolean;
}

/**
 * Converts given shape into a {@link Path} (by default via {@link asCubic} and
 * {@link pathFromCubics}).
 *
 * @remarks
 * If {@link AsPathOpts.linear} is enabled the shape will be converted into a
 * path consisting only of linear segments (NOT cubic beziers). As an interim
 * step this will involve a conversion via {@link asPolygon} or
 * {@link asPolyline} with default opts.
 *
 * @param src
 * @param attribs
 */
export const asPath: ((
	shape: IShape,
	opts?: Partial<AsPathOpts>,
	attribs?: Attribs
) => Path) &
	MultiFn2O<IShape, Partial<AsPathOpts> | undefined, Attribs, Path> =
	defmulti<any, Partial<AsPathOpts> | undefined, Attribs | undefined, Path>(
		__dispatch,
		{
			line: "polyline",
			quad: "poly",
			tri: "poly",
		},
		{
			[DEFAULT]: (
				src: IShape,
				opts?: Partial<AsPathOpts>,
				attribs?: Attribs
			) =>
				opts?.linear
					? asPath(
							asPolygon(src)[0],
							opts,
							attribs || __copyAttribs(src)
					  )
					: __defaultImpl(src, opts, attribs),

			arc: ($: Arc, opts, attribs) =>
				opts?.linear
					? asPath(
							asPolyline($)[0],
							opts,
							attribs || __copyAttribs($)
					  )
					: __defaultImpl($, opts, attribs),

			complexpoly: ($: ComplexPolygon, opts, attribs) => {
				attribs = attribs || __copyAttribs($);
				if (opts?.linear) {
					return new Path(
						__lineSegments($.boundary.points, true),
						$.children.map((c) => __lineSegments(c.points, true)),
						attribs
					);
				}
				const res = pathFromCubics(asCubic($.boundary, opts), attribs);
				for (let child of $.children) {
					res.addSubPaths(
						pathFromCubics(asCubic(child, opts)).segments
					);
				}
				return res;
			},

			poly: ($: Polygon, opts, attribs) =>
				opts?.linear
					? new Path(
							__lineSegments($.points, true),
							[],
							attribs || __copyAttribs($)
					  )
					: __defaultImpl($, opts, attribs),

			polyline: ($: Polyline, opts, attribs) =>
				opts?.linear
					? new Path(
							__lineSegments($.points, false),
							[],
							attribs || __copyAttribs($)
					  )
					: __defaultImpl($, opts, attribs),
		}
	);

const __defaultImpl = (
	src: IShape,
	opts?: Partial<CubicOpts>,
	attribs?: Attribs
) => pathFromCubics(asCubic(src, opts), attribs || __copyAttribs(src));

const __lineSegments = (points: ReadonlyVec[], closed: boolean) => {
	if (!points.length) return [];
	const segments: PathSegment[] = [{ type: "m", point: copy(points[0]) }];
	for (let i = 1, n = points.length; i < n; i++)
		segments.push({
			type: "l",
			geo: new Line([copy(points[i - 1]), copy(points[i])]),
		});
	if (closed) segments.push({ type: "z" });
	return segments;
};
