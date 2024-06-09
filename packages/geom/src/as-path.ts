import type { Maybe } from "@thi.ng/api";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type {
	CubicOpts,
	IShape,
	IShape2,
	IShape3,
	PCLikeConstructor,
	PathSegment,
	PathSegment2,
	PathSegment3,
} from "./api.js";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { copy } from "@thi.ng/vectors/copy";
import type { APC } from "./api/apc.js";
import type { Arc } from "./api/arc.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Line } from "./api/line.js";
import { Line3 } from "./api/line3.js";
import { Path } from "./api/path.js";
import { Path3 } from "./api/path3.js";
import type { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { asCubic } from "./as-cubic.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { pathFromCubics } from "./path.js";
import { pathFromCubics3 } from "./path3.js";

export interface AsPathOpts extends CubicOpts {
	/**
	 * If true (default: false), creates path consisting of linear segments
	 * only.
	 */
	linear: boolean;
}

/**
 * Function overrides for {@link asPath}.
 */
export type AsPathFn = {
	(shape: IShape2, opts?: Partial<AsPathOpts>): Path;
	(shape: IShape3, opts?: Partial<AsPathOpts>): Path3;
} & MultiFn1O<IShape, Partial<AsPathOpts>, Path | Path3>;

/**
 * Converts given shape boundary into a {@link Path} (by default via
 * {@link asCubic} and {@link pathFromCubics}).
 *
 * @remarks
 * If {@link AsPathOpts.linear} is enabled the shape will be converted into a
 * path consisting only of linear segments (NOT cubic beziers). As an interim
 * step this will involve a conversion via {@link asPolygon} or
 * {@link asPolyline} with default opts.
 *
 * @param src
 * @param opts
 */
export const asPath = <AsPathFn>(
	defmulti<any, Maybe<Partial<AsPathOpts>>, Path | Path3>(
		__dispatch,
		{
			line: "polyline",
			quad: "poly",
			tri: "poly",
		},
		{
			[DEFAULT]: (src: IShape2, opts?: Partial<AsPathOpts>) =>
				opts?.linear
					? asPath(asPolygon(src)[0], opts)
					: __defaultImpl(src, opts),

			arc: ($: Arc, opts) =>
				opts?.linear
					? asPath(asPolyline($)[0], opts)
					: __defaultImpl($, opts),

			complexpoly: (
				{ boundary, children, attribs }: ComplexPolygon,
				opts
			) => {
				attribs = __copyAttribs(attribs);
				if (opts?.linear) {
					return __linearPath(
						boundary,
						children.map((c) =>
							__lineSegments(Line, c.points, true)
						),
						true
					);
				}
				const res = pathFromCubics(asCubic(boundary, opts), attribs);
				for (let child of children) {
					res.addSubPaths(
						pathFromCubics(asCubic(child, opts)).segments
					);
				}
				return res;
			},

			poly: ($: Polygon, opts) =>
				opts?.linear
					? __linearPath($, [], true)
					: __defaultImpl($, opts),

			polyline: ($: Polyline, opts) =>
				opts?.linear
					? __linearPath($, [], false)
					: __defaultImpl($, opts),
		}
	)
);

/**
 * TODO update to support Path3
 *
 * @internal
 */
const __defaultImpl = (src: IShape, opts?: Partial<CubicOpts>) =>
	(src.dim === 2 ? pathFromCubics : pathFromCubics3)(
		<any>asCubic(src, { attribs: false, ...opts }),
		__copyAttribs(src.attribs)
	);

/**
 * TODO update to support Path3
 *
 * @internal
 */
function __lineSegments(
	ctor: PCLikeConstructor<Line>,
	points: ReadonlyVec[],
	closed: boolean
): PathSegment2[];
function __lineSegments(
	ctor: PCLikeConstructor<Line3>,
	points: ReadonlyVec[],
	closed: boolean
): PathSegment3[];
function __lineSegments(
	ctor: PCLikeConstructor<any>,
	points: ReadonlyVec[],
	closed: boolean
): PathSegment[] {
	const n = points.length;
	if (!n) return [];
	const segments: PathSegment[] = [{ type: "m", point: copy(points[0]) }];
	for (let i = 1; i < n; i++)
		segments.push({
			type: "l",
			geo: new ctor([copy(points[i - 1]), copy(points[i])]),
		});
	if (closed) {
		segments.push(
			{
				type: "l",
				geo: new ctor([copy(points[n - 1]), copy(points[0])]),
			},
			{ type: "z" }
		);
	}
	return segments;
}

/** @internal */
const __linearPath = (
	shape: APC,
	subPaths: PathSegment[][],
	closed = false
) => {
	const attribs = __copyAttribs(shape.attribs);
	return shape.dim === 2
		? new Path(
				__lineSegments(Line, shape.points, closed),
				<PathSegment2[][]>subPaths,
				attribs
		  )
		: new Path3(
				__lineSegments(Line3, shape.points, closed),
				<PathSegment3[][]>subPaths,
				attribs
		  );
};
