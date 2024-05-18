import type { Maybe } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape2, IShape, IShape2 } from "@thi.ng/geom-api";
import { clipLineSegmentPoly } from "@thi.ng/geom-clip-line/clip-poly";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { Polygon } from "./api/polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { ensureVertices, vertices } from "./vertices.js";

export type ClipConvexFn = {
	(
		shape: ComplexPolygon,
		boundary: IShape2 | ReadonlyVec[]
	): Maybe<ComplexPolygon>;
	(shape: Group, boundary: IShape2 | ReadonlyVec[]): Maybe<Group>;
	(shape: Line, boundary: IShape2 | ReadonlyVec[]): Maybe<Line>;
	(shape: Path, boundary: IShape2 | ReadonlyVec[]): Maybe<Path>;
	(shape: IShape2, boundary: IShape2 | ReadonlyVec[]): Maybe<Polygon>;
} & MultiFn2<IShape, IShape | ReadonlyVec[], Maybe<IShape>>;

/** @internal */
const __clipVertices = ($: IShape, boundary: IShape | ReadonlyVec[]) => {
	boundary = ensureVertices(boundary);
	const pts = sutherlandHodgeman(vertices($), boundary, centroid(boundary));
	return pts.length ? new Polygon(pts, __copyAttribs($)) : undefined;
};

/**
 * Takes a shape and a boundary (both convex), then uses the Sutherland-Hodgeman
 * algorithm to compute a clipped version of the shape (against the boundary)
 * and returns resulting clipped shape or `undefined` if there're no remaining
 * result vertices (i.e. if the original shape was clipped entirely).
 *
 * @remarks
 * Internally uses
 * [`sutherlandHodgeman()`](https://docs.thi.ng/umbrella/geom-clip-poly/functions/sutherlandHodgeman.html).
 * For groups, calls itself for each child shape individually and returns a new
 * group of results (if any).
 *
 * For {@link ComplexPolygon}s, children are only processed if the main boundary
 * hasn't been completely clipped. Similarly for paths, where sub-paths are only
 * processed if the main path has remaining vertices. Paths are
 * sampled/converted to polygons and are only processed if the main path is
 * {@link Path.closed}.
 *
 * Currently implemented for:
 *
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Line}
 * - {@link Path}
 * - {@link Polygon}
 * - {@link Quad}
 * - {@link Triangle}
 *
 * @param shape
 * @param boundary
 */
export const clipConvex = <ClipConvexFn>(
	defmulti<any, IShape | ReadonlyVec[], Maybe<IShape>>(
		__dispatch,
		{
			circle: "rect",
			ellipse: "rect",
			quad: "poly",
			tri: "poly",
		},
		{
			complexpoly: ($: ComplexPolygon, boundary) => {
				boundary = ensureVertices(boundary);
				const c = centroid(boundary)!;
				let clipped = sutherlandHodgeman(
					$.boundary.points,
					boundary,
					c
				);
				if (!clipped.length) return undefined;
				const res: Polygon[] = [new Polygon(clipped)];
				for (let child of $.children) {
					clipped = sutherlandHodgeman(child.points, boundary, c);
					if (clipped.length) res.push(new Polygon(clipped));
				}
				return new ComplexPolygon(
					res[0],
					res.slice(1),
					__copyAttribs($)
				);
			},

			group: ({ children, attribs }: Group, boundary) => {
				boundary = ensureVertices(boundary);
				const clipped: IHiccupShape2[] = [];
				for (let c of children) {
					const res = clipConvex(c, boundary);
					if (res) clipped.push(<IHiccupShape2>res);
				}
				return clipped.length
					? new Group({ ...attribs }, clipped)
					: undefined;
			},

			line: ($: Line, boundary) => {
				const segments = clipLineSegmentPoly(
					$.points[0],
					$.points[1],
					ensureVertices(boundary)
				);
				return segments && segments.length
					? new Line(segments[0], __copyAttribs($))
					: undefined;
			},

			path: ($: Path, boundary) => {
				if ($.closed) return undefined;
				boundary = ensureVertices(boundary);
				let clipped = __clipVertices($, boundary);
				if (!clipped) return undefined;
				const res = new ComplexPolygon(clipped, [], __copyAttribs($));
				for (let sub of $.subPaths) {
					clipped = __clipVertices(
						new Path(sub, [], __copyAttribs($)),
						boundary
					);
					if (clipped) {
						clipped.attribs = undefined;
						res.addChild(clipped);
					}
				}
				return res;
			},

			poly: ($: Polygon, boundary) => {
				boundary = ensureVertices(boundary);
				const pts = sutherlandHodgeman(
					$.points,
					boundary,
					centroid(boundary)
				);
				return pts.length
					? new Polygon(pts, __copyAttribs($))
					: undefined;
			},

			rect: __clipVertices,
		}
	)
);
