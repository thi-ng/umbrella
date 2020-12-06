import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import {
    IntersectionResult,
    IntersectionType,
    IShape,
    PCLike,
    Type,
} from "@thi.ng/geom-api";
import {
    intersectCircleCircle,
    intersectLineLine,
    intersectPlanePlane,
    intersectRayAABB,
    intersectRayCircle,
    intersectRayPlane,
    intersectRayPolyline,
    intersectRayRect,
    testRectCircle,
    testRectRect,
} from "@thi.ng/geom-isec";
import type { AABB } from "../api/aabb";
import type { Circle } from "../api/circle";
import type { Line } from "../api/line";
import type { Plane } from "../api/plane";
import type { Ray } from "../api/ray";
import type { Rect } from "../api/rect";
import type { Sphere } from "../api/sphere";
import { dispatch2 } from "../internal/dispatch";
import type { IObjectOf } from "@thi.ng/api";

export const intersects: MultiFn2O<
    IShape,
    IShape,
    any,
    IntersectionResult
> = defmulti(dispatch2);

intersects.addAll(<
    IObjectOf<Implementation2O<unknown, unknown, any, IntersectionResult>>
>{
    [`${Type.CIRCLE}-${Type.CIRCLE}`]: (a: Sphere, b: Sphere) =>
        intersectCircleCircle(a.pos, b.pos, a.r, b.r),

    [`${Type.LINE}-${Type.LINE}`]: ({ points: a }: Line, { points: b }: Line) =>
        intersectLineLine(a[0], a[1], b[0], b[1]),

    [`${Type.PLANE}-${Type.PLANE}`]: (a: Plane, b: Plane) =>
        intersectPlanePlane(a.normal, a.w, b.normal, b.w),

    [`${Type.RAY}-${Type.AABB}`]: (ray: Ray, box: AABB) =>
        intersectRayAABB(ray.pos, ray.dir, box.pos, box.max()),

    [`${Type.RAY}-${Type.CIRCLE}`]: (ray: Ray, sphere: Sphere) =>
        intersectRayCircle(ray.pos, ray.dir, sphere.pos, sphere.r),

    [`${Type.RAY}-${Type.PLANE}`]: (ray: Ray, plane: Plane) =>
        intersectRayPlane(ray.pos, ray.dir, plane.normal, plane.w),

    [`${Type.RAY}-${Type.POLYGON}`]: (ray: Ray, poly: PCLike) =>
        intersectRayPolyline(ray.pos, ray.dir, poly.points, true),

    [`${Type.RAY}-${Type.POLYLINE}`]: (ray: Ray, poly: PCLike) =>
        intersectRayPolyline(ray.pos, ray.dir, poly.points, false),

    [`${Type.RAY}-${Type.RECT}`]: (ray: Ray, rect: Rect) =>
        intersectRayRect(ray.pos, ray.dir, rect.pos, rect.max()),

    [`${Type.RECT}-${Type.CIRCLE}`]: (rect: Rect, circle: Circle) => ({
        type: testRectCircle(rect.pos, rect.size, circle.pos, circle.r)
            ? IntersectionType.INTERSECT
            : IntersectionType.NONE,
    }),

    [`${Type.RECT}-${Type.RECT}`]: (a: Rect, b: Rect) => ({
        type: testRectRect(a.pos, a.size, b.pos, b.size)
            ? IntersectionType.INTERSECT
            : IntersectionType.NONE,
    }),
});

intersects.isa(`${Type.RAY}-${Type.SPHERE}`, `${Type.RAY}-${Type.CIRCLE}`);
intersects.isa(`${Type.RAY}-${Type.QUAD}`, `${Type.RAY}-${Type.POLYGON}`);
intersects.isa(`${Type.RAY}-${Type.TRIANGLE}`, `${Type.RAY}-${Type.POLYGON}`);
intersects.isa(
    `${Type.SPHERE}-${Type.SPHERE}`,
    `${Type.CIRCLE}-${Type.CIRCLE}`
);
