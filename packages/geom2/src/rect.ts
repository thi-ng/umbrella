import { implementations, relations } from "@thi.ng/defmulti";
import {
    addNew,
    copy,
    div,
    madd,
    maddNewN,
    ReadonlyVec,
    set,
    subNew,
    Vec
} from "@thi.ng/vectors2/api";
import { Mat23 } from "@thi.ng/vectors2/mat23";
import { unionBounds } from "./internal/bounds";
import { edges as _edges } from "./internal/edges";
import { booleanOp } from "./internal/greiner-hormann";
import { sutherlandHodgeman } from "./internal/sutherland-hodgeman";
import { transformPoints } from "./internal/transform";
import "./polygon";
import { tessellatePoints } from "./tessellate";
import {
    area,
    Attribs,
    bounds,
    centroid,
    clipConvex,
    ClipMode,
    IShape,
    mapPoint,
    perimeter,
    Polygon2,
    Rect2,
    tessellate,
    Tessellator,
    Type,
    union,
    unmapPoint,
    vertices,
    transform,
    SamplingOpts,
    edges,
    translate,
    resample,
    pointAt,
    pointInside,
} from "./api";
import { Sampler } from "./internal/sampler";

export function rect(pos: Vec, size: Vec, attribs?: Attribs) {
    return new Rect2(pos, size, attribs);
}

export const rectFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
    Rect2.fromMinMax(min, max, attribs);

const type = Type.RECT2;

relations(
    type,
    {
        [Type.POLYGON2]: [
            resample,
        ]
    }
);

implementations(
    type,

    area,
    (rect: Rect2) => rect.size[0] * rect.size[1],

    bounds,
    (rect: Rect2) => rect,

    centroid,
    (rect: Rect2, o?: Vec) => maddNewN(rect.pos, rect.size, 0.5, o),

    clipConvex,
    (rect: Rect2, boundary: IShape) =>
        new Polygon2(
            sutherlandHodgeman(vertices(rect), vertices(boundary), centroid(boundary)),
            { ...rect.attribs }
        ),

    edges,
    (rect: Rect2, opts: number | SamplingOpts) =>
        _edges(vertices(rect, opts), true),

    mapPoint,
    (rect: Rect2, p: ReadonlyVec, out?: Vec) => {
        return div(subNew(p, rect.pos, out), rect.size);
    },

    perimeter,
    (rect: Rect2) => 2 * (rect.size[0] + rect.size[1]),

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
    (rect: Rect2, mat: Mat23) =>
        new Polygon2(
            transformPoints(vertices(rect), mat),
            { ...rect.attribs }
        ),

    translate,
    (rect: Rect2, delta: ReadonlyVec) =>
        new Rect2(
            addNew(rect.pos, delta),
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
    (rect: Rect2, p: ReadonlyVec, out?: Vec) => {
        return madd((out ? set(out, rect.pos) : copy(rect.pos)), rect.size, p);
    },

    vertices,
    (rect: Rect2, opts: number | SamplingOpts) => {
        const p = rect.pos;
        const q = addNew(p, rect.size);
        const verts = [copy(p), [q[0], p[1]], q, [p[0], q[1]]];
        return opts != null ?
            vertices(new Polygon2(verts), opts) :
            verts;
    },
);
