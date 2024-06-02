import type { MultiFn1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, IShape2, PCLike } from "@thi.ng/geom-api";
import { grahamScan2 } from "@thi.ng/geom-hull/graham-scan";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Polygon } from "./api/polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Function overrides for {@link convexHull}.
 */
export type ConvexHullFn = {
	(shape: IShape2): Polygon;
} & MultiFn1<IShape, IShape>;

/**
 * Computes the convex hull for given shape and returns it as {@link Polygon}.
 *
 * @remarks
 * Internally uses
 * [`grahamScan2()`](https://docs.thi.ng/umbrella/geom-hull/functions/grahamScan2.html).
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Ellipse}
 * - {@link Group} (only the listed child shape types are considered)
 * - {@link Points}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param shape
 */
export const convexHull = <ConvexHullFn>defmulti<any, IShape>(
	__dispatch,
	{
		arc: "group",
		circle: "tri",
		cubic: "group",
		ellipse: "tri",
		line: "tri",
		path: "group",
		poly: "points",
		polyline: "points",
		quad: "points",
		quadratic: "group",
		rect: "tri",
	},
	{
		complexpoly: ($: ComplexPolygon) => convexHull($.boundary),

		group: ($: IShape) =>
			new Polygon(grahamScan2(vertices($)), __copyAttribs($.attribs)),

		points: ($: PCLike) =>
			new Polygon(grahamScan2($.points), __copyAttribs($.attribs)),

		tri: ($: IShape) => new Polygon(vertices($), __copyAttribs($.attribs)),
	}
);
