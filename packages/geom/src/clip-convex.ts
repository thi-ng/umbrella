// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape2, IShape, IShape2 } from "./api.js";
import {
	clipLineSegmentPoly,
	clipPolylinePoly,
} from "@thi.ng/geom-clip-line/clip-poly";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";
import { ensureVertices, vertices } from "./vertices.js";

/**
 * Function overrides for {@link clipConvex}.
 */
export type ClipConvexFn = {
	(shape: ComplexPolygon, boundary: IShape2 | ReadonlyVec[]): Maybe<
		ComplexPolygon[]
	>;
	(shape: Group, boundary: IShape2 | ReadonlyVec[]): Maybe<Group[]>;
	(shape: Line, boundary: IShape2 | ReadonlyVec[]): Maybe<Line[]>;
	(shape: Path, boundary: IShape2 | ReadonlyVec[]): Maybe<Path[]>;
	(shape: Polyline, boundary: IShape2 | ReadonlyVec[]): Maybe<Polyline[]>;
	(shape: IShape2, boundary: IShape2 | ReadonlyVec[]): Maybe<Polygon[]>;
} & MultiFn2<IShape, IShape | ReadonlyVec[], Maybe<IShape[]>>;

/** @internal */
const __clipVertices = ($: IShape, boundary: IShape | ReadonlyVec[]) => {
	boundary = ensureVertices(boundary);
	const pts = sutherlandHodgeman(vertices($), boundary, centroid(boundary));
	return pts.length
		? [new Polygon(pts, __copyAttribs($.attribs))]
		: undefined;
};

/**
 * Takes a shape and a boundary (both convex), then uses the Sutherland-Hodgeman
 * algorithm to compute a clipped version of the shape (against the boundary)
 * and returns an array of resulting clipped shape(s) or `undefined` if there're
 * no remaining result vertices (i.e. if the original shape was clipped
 * entirely).
 *
 * @remarks
 * Internally uses
 * [`sutherlandHodgeman`](https://docs.thi.ng/umbrella/geom-clip-poly/functions/sutherlandHodgeman.html).
 * For groups, calls itself for each child shape individually and returns a new
 * group of results (if any).
 *
 * For {@link ComplexPolygon}s, children are only processed if the main boundary
 * hasn't been completely clipped. Similarly for closed paths, where sub-paths
 * (holes) are only processed if the clipped main path has remaining vertices.
 *
 * Paths are always first sampled/converted to polygons or polylines.
 *
 * Currently implemented for:
 *
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Ellipse}
 * - {@link Extra}
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
	defmulti<any, IShape | ReadonlyVec[], Maybe<IShape[]>>(
		__dispatch,
		{
			circle: "$verts",
			ellipse: "$verts",
			quad: "poly",
			rect: "$verts",
			tri: "poly",
		},
		{
			$verts: __clipVertices,

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
				for (const child of $.children) {
					clipped = sutherlandHodgeman(child.points, boundary, c);
					if (clipped.length) res.push(new Polygon(clipped));
				}
				return [
					new ComplexPolygon(
						res[0],
						res.slice(1),
						__copyAttribs($.attribs)
					),
				];
			},

			extra: ($) => [$],

			group: ({ children, attribs }: Group, boundary) => {
				boundary = ensureVertices(boundary);
				const clipped: IHiccupShape2[] = [];
				for (const c of children) {
					const res = clipConvex(c, boundary);
					if (res) clipped.push(...(<IHiccupShape2[]>res));
				}
				return clipped.length
					? [new Group({ ...attribs }, clipped)]
					: undefined;
			},

			line: ($: Line, boundary) => {
				const segments = clipLineSegmentPoly(
					$.points[0],
					$.points[1],
					ensureVertices(boundary)
				);
				return segments?.length
					? [new Line(segments[0], __copyAttribs($.attribs))]
					: undefined;
			},

			path: ($: Path, boundary) => {
				boundary = ensureVertices(boundary);
				if (!$.closed) {
					return [
						...mapcat(
							(poly) => clipConvex(poly, boundary),
							asPolyline($)
						),
					];
				}
				let clipped = __clipVertices($, boundary);
				if (!clipped) return undefined;
				const res = new ComplexPolygon(
					clipped[0],
					[],
					__copyAttribs($.attribs)
				);
				for (const sub of $.subPaths) {
					clipped = __clipVertices(
						new Path(sub, [], __copyAttribs($.attribs)),
						boundary
					);
					if (clipped) {
						clipped[0].attribs = undefined;
						res.addChild(clipped[0]);
					}
				}
				return [res];
			},

			poly: ($: Polygon, boundary) => {
				boundary = ensureVertices(boundary);
				const pts = sutherlandHodgeman(
					$.points,
					boundary,
					centroid(boundary)
				);
				return pts.length
					? [new Polygon(pts, __copyAttribs($.attribs))]
					: undefined;
			},

			polyline: ({ points, attribs }: Polyline, boundary) =>
				__pointArraysAsShapes(
					Polyline,
					clipPolylinePoly(points, ensureVertices(boundary)),
					attribs
				),
		}
	)
);
