import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import {
    Circle,
    IntersectionResult,
    IntersectionType,
    IShape,
    Line,
    PCLike,
    Ray,
    Rect,
    Sphere,
    Type
} from "../api";
import { dispatch2 } from "../internal/dispatch";
import { intersectCircleCircle } from "../isec/circle-circle";
import { intersectLineLine } from "../isec/line-line";
import { intersectRayCircle } from "../isec/ray-circle";
import { intersectRayPolyline } from "../isec/ray-poly";
import { intersectRectCircle } from "../isec/rect-circle";
import { testRectRect } from "../isec/rect-rect";

export const intersects: MultiFn2O<IShape, IShape, any, IntersectionResult> = defmulti(dispatch2);

intersects.addAll({

    [`${Type.CIRCLE}-${Type.CIRCLE}`]:
        (a: Sphere, b: Sphere) =>
            intersectCircleCircle(a.pos, b.pos, a.r, b.r),

    [`${Type.LINE}-${Type.LINE}`]:
        ({ points: a }: Line, { points: b }: Line) =>
            intersectLineLine(a[0], a[1], b[0], b[1]),

    [`${Type.RAY}-${Type.CIRCLE}`]:
        (ray: Ray, sphere: Sphere) => {
            const isec = intersectRayCircle(ray.pos, ray.dir, sphere.pos, sphere.r);
            return isec ?
                { type: IntersectionType.INTERSECT, isec } :
                { type: IntersectionType.NONE };
        },

    [`${Type.RAY}-${Type.POLYGON}`]:
        (ray: Ray, poly: PCLike) =>
            intersectRayPolyline(ray.pos, ray.dir, poly.points, true),

    [`${Type.RAY}-${Type.POLYLINE}`]:
        (ray: Ray, poly: PCLike) =>
            intersectRayPolyline(ray.pos, ray.dir, poly.points, false),

    [`${Type.RECT}-${Type.CIRCLE}`]:
        ({ pos: rp, size }: Rect, { pos: cp, r }: Circle) => ({
            type: intersectRectCircle(rp[0], rp[1], size[0], size[1], cp[0], cp[1], r) ?
                IntersectionType.INTERSECT :
                IntersectionType.NONE
        }),

    [`${Type.RECT}-${Type.RECT}`]:
        ({ pos: ap, size: as }: Rect,
            { pos: bp, size: bs }: Rect) => ({
                type: testRectRect(ap[0], ap[1], as[0], as[1], bp[0], bp[1], bs[0], bs[1]) ?
                    IntersectionType.INTERSECT :
                    IntersectionType.NONE
            }),

});

intersects.isa(`${Type.RAY}-${Type.SPHERE}`, `${Type.RAY}-${Type.CIRCLE}`);
intersects.isa(`${Type.RAY}-${Type.QUAD}`, `${Type.RAY}-${Type.POLYGON}`);
intersects.isa(`${Type.RAY}-${Type.TRIANGLE}`, `${Type.RAY}-${Type.POLYGON}`);
intersects.isa(`${Type.SPHERE}-${Type.SPHERE}`, `${Type.CIRCLE}-${Type.CIRCLE}`);
