import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IntersectionResult, IShape, PCLike } from "@thi.ng/geom-api";
import { IntersectionType } from "@thi.ng/geom-api/isec";
import { intersectCircleCircle } from "@thi.ng/geom-isec/circle-circle";
import { intersectLineLine } from "@thi.ng/geom-isec/line-line";
import { intersectPlanePlane } from "@thi.ng/geom-isec/plane-plane";
import { intersectRayCircle } from "@thi.ng/geom-isec/ray-circle";
import { intersectRayPlane } from "@thi.ng/geom-isec/ray-plane";
import { intersectRayPolyline } from "@thi.ng/geom-isec/ray-poly";
import { intersectRayAABB, intersectRayRect } from "@thi.ng/geom-isec/ray-rect";
import { testRectCircle } from "@thi.ng/geom-isec/rect-circle";
import { testAabbAabb, testRectRect } from "@thi.ng/geom-isec/rect-rect";
import type { AABB } from "./api/aabb.js";
import type { Circle } from "./api/circle.js";
import type { Line } from "./api/line.js";
import type { Plane } from "./api/plane.js";
import type { Ray } from "./api/ray.js";
import type { Rect } from "./api/rect.js";
import type { Sphere } from "./api/sphere.js";
import { __dispatch2 } from "./internal/dispatch.js";

/**
 * Performs intersection tests on given 2 shapes and returns
 * [`IntersectionResult`](https://docs.thi.ng/umbrella/geom-api/interfaces/IntersectionResult.html).
 *
 * @remarks
 * Currently supported pairs:
 *
 * - {@link Circle} / {@link Circle}
 * - {@link Line} / {@link Line}
 * - {@link Plane} / {@link Plane}
 * - {@link Ray} / {@link AABB}
 * - {@link Ray} / {@link Circle}
 * - {@link Ray} / {@link Plane}
 * - {@link Ray} / {@link Polygon}
 * - {@link Ray} / {@link Polyline}
 * - {@link Ray} / {@link Quad}
 * - {@link Ray} / {@link Rect}
 * - {@link Ray} / {@link Sphere}
 * - {@link Ray} / {@link Triangle}
 * - {@link Rect} / {@link Rect}
 * - {@link Sphere} / {@link Sphere}
 *
 * @param a
 * @param b
 */
export const intersects: MultiFn2<IShape, IShape, IntersectionResult> =
	defmulti<any, any, IntersectionResult>(
		__dispatch2,
		{
			"ray-sphere": "ray-circle",
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

			"line-line": ({ points: a }: Line, { points: b }: Line) =>
				intersectLineLine(a[0], a[1], b[0], b[1]),

			"plane-plane": (a: Plane, b: Plane) =>
				intersectPlanePlane(a.normal, a.w, b.normal, b.w),

			"ray-aabb": (ray: Ray, box: AABB) =>
				intersectRayAABB(ray.pos, ray.dir, box.pos, box.max()),

			"ray-circle": (ray: Ray, sphere: Sphere) =>
				intersectRayCircle(ray.pos, ray.dir, sphere.pos, sphere.r),

			"ray-plane": (ray: Ray, plane: Plane) =>
				intersectRayPlane(ray.pos, ray.dir, plane.normal, plane.w),

			"ray-poly": (ray: Ray, poly: PCLike) =>
				intersectRayPolyline(ray.pos, ray.dir, poly.points, true),

			"ray-polyline": (ray: Ray, poly: PCLike) =>
				intersectRayPolyline(ray.pos, ray.dir, poly.points, false),

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
