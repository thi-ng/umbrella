import type { MultiFn2O } from "@thi.ng/defmulti";
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
import { testRectRect } from "@thi.ng/geom-isec/rect-rect";
import type { AABB } from "../api/aabb";
import type { Circle } from "../api/circle";
import type { Line } from "../api/line";
import type { Plane } from "../api/plane";
import type { Ray } from "../api/ray";
import type { Rect } from "../api/rect";
import type { Sphere } from "../api/sphere";
import { dispatch2 } from "../internal/dispatch";

export const intersects: MultiFn2O<IShape, IShape, any, IntersectionResult> =
    defmulti(
        dispatch2,
        {
            "ray-sphere": "ray-circle",
            "ray-quad": "ray-poly",
            "ray-tri": "ray-poly",
            "sphere-sphere": "circle-circle",
        },
        {
            "circle-circle": (a: Sphere, b: Sphere) =>
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
