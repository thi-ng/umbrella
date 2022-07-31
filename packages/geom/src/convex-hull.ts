import type { MultiFn1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { grahamScan2 } from "@thi.ng/geom-hull/graham-scan";
import { Polygon } from "./api/polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Computes the convex hull for given shape and returns it as {@link Polygon}.
 *
 * @remarks
 * Internally uses {@link @thi.ng/geom-hull#grahamScan2}.
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
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
export const convexHull: MultiFn1<IShape, IShape> = defmulti<any, IShape>(
	__dispatch,
	{
		arc: "group",
		circle: "tri",
		cubic: "group",
		ellipse: "tri",
		line: "tri",
		poly: "points",
		polyline: "points",
		quad: "points",
		quadratic: "group",
		rect: "tri",
	},
	{
		group: ($: IShape) =>
			new Polygon(grahamScan2(vertices($)), __copyAttribs($)),

		points: ($: PCLike) =>
			new Polygon(grahamScan2($.points), __copyAttribs($)),

		tri: ($: IShape) => new Polygon(vertices($), __copyAttribs($)),
	}
);
