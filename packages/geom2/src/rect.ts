import { implementations } from "@thi.ng/defmulti";
import { Mat } from "@thi.ng/matrices/api";
import { add2 } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { copy } from "@thi.ng/vectors3/copy";
import { div2 } from "@thi.ng/vectors3/div";
import { madd2 } from "@thi.ng/vectors3/madd";
import { maddN2 } from "@thi.ng/vectors3/maddn";
import { sub } from "@thi.ng/vectors3/sub";
import {
    arcLength,
    area,
    Attribs,
    bounds,
    centroid,
    clipConvex,
    ClipMode,
    edges,
    IShape,
    mapPoint,
    perimeter,
    pointAt,
    pointInside,
    Polygon2,
    Rect2,
    resample,
    SamplingOpts,
    tessellate,
    Tessellator,
    transform,
    translate,
    Type,
    union,
    unmapPoint,
    vertices
} from "./api";
import { unionBounds } from "./internal/bounds";
import { edges as _edges } from "./internal/edges";
import { booleanOp } from "./internal/greiner-hormann";
import { Sampler } from "./internal/sampler";
import { sutherlandHodgeman } from "./internal/sutherland-hodgeman";
import { transformPoints } from "./internal/transform";
import "./polygon";
import { tessellatePoints } from "./tessellate";

export function rect(pos: Vec, size: Vec, attribs?: Attribs) {
    return new Rect2(pos, size, attribs);
}

export const rectFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
    Rect2.fromMinMax(min, max, attribs);

implementations(
    Type.RECT2,

    {
        [Type.POLYGON2]: [
            resample,
        ]
    },

    arcLength,
    (rect: Rect2) =>
        2 * (rect.size[0] * rect.size[1]),

    area,
    (rect: Rect2) =>
        rect.size[0] * rect.size[1],

    bounds,
    (rect: Rect2) => rect,

    centroid,
    (rect: Rect2, o?: Vec) =>
        maddN2(o, rect.pos, rect.size, 0.5),

    clipConvex,
    (rect: Rect2, boundary: IShape) =>
        new Polygon2(
            sutherlandHodgeman(vertices(rect), vertices(boundary), centroid(boundary)),
            { ...rect.attribs }
        ),

    edges,
    (rect: Rect2, opts: number | Partial<SamplingOpts>) =>
        _edges(vertices(rect, opts), true),

    mapPoint,
    (rect: Rect2, p: ReadonlyVec, out: Vec = []) =>
        div2(null, sub(out, p, rect.pos), rect.size),

    perimeter,
    (rect: Rect2) =>
        2 * (rect.size[0] + rect.size[1]),

    pointAt,
    (rect: Rect2, t: number) =>
        new Sampler(vertices(rect), true).pointAt(t),

    pointInside,
    (rect: Rect2, [x, y]: ReadonlyVec) => {
        const [rx, ry] = rect.pos;
        const [sx, sy] = rect.size;
        return x >= rx && x <= rx + sx && y >= ry && y <= ry + sy;
    },

    tessellate,
    (rect: Rect2, tessel: Tessellator | Iterable<Tessellator>, iter?: number) =>
        tessellatePoints(vertices(rect), <any>tessel, iter),

    transform,
    (rect: Rect2, mat: Mat) =>
        new Polygon2(
            transformPoints(vertices(rect), mat),
            { ...rect.attribs }
        ),

    translate,
    (rect: Rect2, delta: ReadonlyVec) =>
        new Rect2(
            add2([], rect.pos, delta),
            copy(rect.size),
            { ...rect.attribs }
        ),

    union,
    (r1: Rect2, r2: IShape) =>
        r2 instanceof Rect2 ?
            [new Rect2(...unionBounds(r1.pos, r1.size, r2.pos, r2.size))] :
            booleanOp([vertices(r1)], vertices(r2), ClipMode.UNION)
                .map((pts) => new Polygon2(pts, { ...r1.attribs })),

    unmapPoint,
    (rect: Rect2, p: ReadonlyVec, out: Vec = []) =>
        madd2(out, rect.pos, rect.size, p),

    vertices,
    (rect: Rect2, opts: number | Partial<SamplingOpts>) => {
        const p = rect.pos;
        const q = add2([], p, rect.size);
        const verts = [copy(p), [q[0], p[1]], q, [p[0], q[1]]];
        return opts != null ?
            vertices(new Polygon2(verts), opts) :
            verts;
    },
);
