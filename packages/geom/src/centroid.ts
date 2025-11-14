// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { centroid as _centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { Vec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { addmN, addmN2 } from "@thi.ng/vectors/addmn";
import { maddN } from "@thi.ng/vectors/maddn";
import { mulN } from "@thi.ng/vectors/muln";
import { set } from "@thi.ng/vectors/set";
import type { AABBLike, IShape, PCLike } from "./api.js";
import type { Circle } from "./api/circle.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Plane } from "./api/plane.js";
import type { Polygon } from "./api/polygon.js";
import type { Triangle } from "./api/triangle.js";
import { bounds } from "./bounds.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Computes the unweighted centroid of given shape, writes result in optionally
 * provided output vector (or creates new one if omitted).
 *
 * @remarks
 * For vertex based shapes, this computes the simple mean position of the
 * vertices. Also see {@link centroidOfBounds}, {@link centerOfWeight}.
 *
 * Currently implemented for:
 *
 * - {@link AABB}
 * - {@link Arc}
 * - {@link BPatch}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Extra} (returns `undefined`)
 * - {@link Group}
 * - {@link Line}
 * - {@link Path}
 * - {@link Polygon}
 * - {@link Polygon3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Quadratic}
 * - {@link Quadratic3}
 * - {@link Text} (returns position, not considering body or alignment)
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * @param shape
 * @param out
 */
export const centroid: MultiFn1O<IShape, Vec, Maybe<Vec>> = defmulti<
	any,
	Maybe<Vec>,
	Maybe<Vec>
>(
	__dispatch,
	{
		arc: "circle",
		bpatch: "points",
		ellipse: "circle",
		cubic: "points",
		cubic3: "points",
		line3: "line",
		path: "group",
		points3: "points",
		poly: "points",
		poly3: "points",
		polyline: "points",
		polyline3: "points",
		quad: "points",
		quad3: "points",
		quadratic: "points",
		quadratic3: "points",
		rect: "aabb",
		sphere: "circle",
		text: "circle",
		tri3: "tri",
	},
	{
		aabb: ($: AABBLike, out?) => maddN(out || [], $.size, 0.5, $.pos),

		circle: ($: Circle, out?) => set(out || [], $.pos),

		complexpoly: ($: ComplexPolygon, out?) =>
			_centroid($.boundary.points, out),

		extra: () => undefined,

		group: ($: Group, out?) => {
			const b = bounds($);
			return b ? centroid(b, out) : undefined;
		},

		line: ({ points }: Line, out?) =>
			addmN2(out || [], points[0], points[1], 0.5),

		points: ($: PCLike, out?) => _centroid($.points, out),

		plane: ($: Plane, out?) => mulN(out || [], $.normal, $.w),

		tri: ({ points: [a, b, c] }: Triangle, out?) =>
			addmN(null, add(out || [], a, b), c, 1 / 3),
	}
);
