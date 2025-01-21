// SPDX-License-Identifier: Apache-2.0
import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { intersectCircleCircle } from "@thi.ng/geom-isec/circle-circle";
import { intersectLineLine } from "@thi.ng/geom-isec/line-line";
import { intersectLinePolylineAll } from "@thi.ng/geom-isec/line-poly";
import { intersectPlanePlane } from "@thi.ng/geom-isec/plane-plane";
import { intersectRayCircle } from "@thi.ng/geom-isec/ray-circle";
import { intersectRayPlane } from "@thi.ng/geom-isec/ray-plane";
import {
	intersectRayPolyline,
	intersectRayPolylineAll,
} from "@thi.ng/geom-isec/ray-poly";
import { intersectRayAABB, intersectRayRect } from "@thi.ng/geom-isec/ray-rect";
import { testRectCircle } from "@thi.ng/geom-isec/rect-circle";
import { testAabbAabb, testRectRect } from "@thi.ng/geom-isec/rect-rect";
import type { Vec } from "@thi.ng/vectors";
import { dist2 } from "@thi.ng/vectors/dist";
import { distSq2 } from "@thi.ng/vectors/distsq";
import { magSq2 } from "@thi.ng/vectors/magsq";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { sub2 } from "@thi.ng/vectors/sub";
import {
	IntersectionType,
	NONE,
	type IShape,
	type IntersectionResult,
	type PCLike,
} from "./api.js";
import type { AABB } from "./api/aabb.js";
import type { Circle } from "./api/circle.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Plane } from "./api/plane.js";
import { Ray } from "./api/ray.js";
import type { Ray3 } from "./api/ray3.js";
import type { Rect } from "./api/rect.js";
import type { Sphere } from "./api/sphere.js";
import { __dispatch2 } from "./internal/dispatch.js";

export interface IntersectOpts {
	/**
	 * Force returning all intersections, if possible (and supported).
	 */
	all: boolean;
}

/**
 * Performs intersection tests on given 2 shapes and returns
 * [`IntersectionResult`](https://docs.thi.ng/umbrella/geom-isec/interfaces/IntersectionResult.html).
 *
 * @remarks
 * Currently supported pairs:
 *
 * - {@link AABB} / {@link AABB}
 * - {@link Circle} / {@link Circle}
 * - {@link Line} / {@link Group}
 * - {@link Line} / {@link Line}
 * - {@link Line} / {@link Polygon}
 * - {@link Line} / {@link Polyline}
 * - {@link Plane} / {@link Plane}
 * - {@link Ray} / {@link AABB}
 * - {@link Ray} / {@link Circle}
 * - {@link Ray} / {@link Line}
 * - {@link Ray3} / {@link Plane}
 * - {@link Ray} / {@link Polygon}
 * - {@link Ray} / {@link Polyline}
 * - {@link Ray} / {@link Quad}
 * - {@link Ray} / {@link Rect}
 * - {@link Ray3} / {@link Sphere}
 * - {@link Ray} / {@link Triangle}
 * - {@link Rect} / {@link Rect}
 * - {@link Sphere} / {@link Sphere}
 *
 * If {@link IntersectOpts.all} is enabled (default: false) and if the
 * intersection pair supports it, all possible intersections will be returned
 * (for some implementations this always the case anyway). Currently, this is
 * option is only implemented for the following pairings:
 *
 * - {@link Ray} / {@link Polygon}
 * - {@link Ray} / {@link Polyline}
 *
 * @param a
 * @param b
 * @param opts
 */
export const intersects: MultiFn2O<
	IShape,
	IShape,
	Partial<IntersectOpts>,
	IntersectionResult
> = defmulti<any, any, any, IntersectionResult>(
	__dispatch2,
	{
		"ray-line": "ray-polyline",
		"ray3-sphere": "ray3-circle",
		"ray-quad": "ray-poly",
		"ray-tri": "ray-poly",
		"sphere-sphere": "circle-circle",
	},
	{
		"aabb-aabb": (a: AABB, b: AABB) => ({
			type: testAabbAabb(a.pos, a.size, b.pos, b.size)
				? IntersectionType.INTERSECT
				: IntersectionType.NONE,
		}),

		"circle-circle": (a: Circle, b: Circle) =>
			intersectCircleCircle(a.pos, b.pos, a.r, b.r),

		"line-group": (
			{ points: [a, b] }: Line,
			group: Group,
			opts?: Partial<IntersectOpts>
		) => {
			const dir = sub2([], b, a);
			const max = magSq2(dir);
			const res = intersects(
				new Ray(a, normalize2(null, dir)),
				group,
				opts
			);
			if (res === NONE) return res;
			res.isec = res.isec!.filter((p) => distSq2(a, p) <= max);
			if (res.isec.length) {
				res.alpha = dist2(a, res.isec![0]);
				return res;
			}
			return NONE;
		},

		"line-line": ({ points: a }: Line, { points: b }: Line) =>
			intersectLineLine(a[0], a[1], b[0], b[1]),

		"line-poly": ({ points: a }: Line, poly: PCLike) =>
			intersectLinePolylineAll(a[0], a[1], poly.points, true),

		"line-polyline": ({ points: a }: Line, poly: PCLike) =>
			intersectLinePolylineAll(a[0], a[1], poly.points, false),

		"plane-plane": (a: Plane, b: Plane) =>
			intersectPlanePlane(a.normal, a.w, b.normal, b.w),

		"ray-aabb": (ray: Ray, box: AABB) =>
			intersectRayAABB(ray.pos, ray.dir, box.pos, box.max()),

		"ray-circle": (ray: Ray, sphere: Sphere) =>
			intersectRayCircle(ray.pos, ray.dir, sphere.pos, sphere.r),

		"ray-group": (
			ray: Ray,
			{ children }: Group,
			opts?: Partial<IntersectOpts>
		) => {
			let minD = Infinity;
			const points: Vec[] = [];
			const all = opts?.all;
			let inside = false;
			for (let child of children) {
				let $res = intersects(ray, child, opts);
				if ($res.type !== IntersectionType.INTERSECT) continue;
				if ($res.inside) inside = true;
				const first = $res.isec![0];
				const alpha =
					$res.alpha !== undefined
						? $res.alpha
						: dist2(ray.pos, first);
				if (all) {
					points.push(...$res.isec!);
					minD = Math.min(minD, alpha);
				} else if (alpha < minD) {
					minD = alpha;
					points[0] = first;
				}
			}
			return minD < Infinity
				? {
						type: IntersectionType.INTERSECT,
						isec: points,
						alpha: minD,
						inside,
				  }
				: NONE;
		},

		"ray3-plane": (ray: Ray3, plane: Plane) =>
			intersectRayPlane(ray.pos, ray.dir, plane.normal, plane.w),

		"ray-poly": (ray: Ray, poly: PCLike, opts?: IntersectOpts) =>
			opts?.all
				? intersectRayPolylineAll(ray.pos, ray.dir, poly.points, true)
				: intersectRayPolyline(ray.pos, ray.dir, poly.points, true),

		"ray-polyline": (ray: Ray, poly: PCLike, opts?: IntersectOpts) =>
			opts?.all
				? intersectRayPolylineAll(ray.pos, ray.dir, poly.points, false)
				: intersectRayPolyline(ray.pos, ray.dir, poly.points, false),

		"ray-rect": (ray: Ray, rect: Rect) =>
			intersectRayRect(ray.pos, ray.dir, rect.pos, rect.max()),

		"rect-circle": (rect: Rect, circle: Circle) => ({
			type: testRectCircle(rect.pos, rect.size, circle.pos, circle.r)
				? IntersectionType.INTERSECT
				: IntersectionType.NONE,
		}),

		"rect-rect": (a: Rect, b: Rect) => ({
			type: testRectRect(a.pos, a.size, b.pos, b.size)
				? IntersectionType.INTERSECT
				: IntersectionType.NONE,
		}),
	}
);
