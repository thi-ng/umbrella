import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import {
    intersectCircleCircle,
    IntersectionResult,
    IntersectionType,
    intersectLineLine,
    intersectRayCircle,
    intersectRayPolyline,
    testRectCircle,
    testRectRect
} from "@thi.ng/geom-isec";
import {
    Circle,
    IShape,
    Line,
    PCLike,
    Ray,
    Rect,
    Sphere,
    Type
} from "../api";
import { dispatch2 } from "../internal/dispatch";

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
            type: testRectCircle(rp, size, cp, r) ?
                IntersectionType.INTERSECT :
                IntersectionType.NONE
        }),

    [`${Type.RECT}-${Type.RECT}`]:
        ({ pos: ap, size: as }: Rect,
            { pos: bp, size: bs }: Rect) => ({
                type: testRectRect(ap, as, bp, bs) ?
                    IntersectionType.INTERSECT :
                    IntersectionType.NONE
            }),

});

intersects.isa(`${Type.RAY}-${Type.SPHERE}`, `${Type.RAY}-${Type.CIRCLE}`);
intersects.isa(`${Type.RAY}-${Type.QUAD}`, `${Type.RAY}-${Type.POLYGON}`);
intersects.isa(`${Type.RAY}-${Type.TRIANGLE}`, `${Type.RAY}-${Type.POLYGON}`);
intersects.isa(`${Type.SPHERE}-${Type.SPHERE}`, `${Type.CIRCLE}-${Type.CIRCLE}`);
