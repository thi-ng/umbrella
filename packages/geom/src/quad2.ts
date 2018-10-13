import { ICopy } from "@thi.ng/api";
import { ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import {
    Attribs,
    IArcLength,
    IArea,
    IEdges,
    IPointMap,
    ITessellateable,
    Tessellator
} from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./internal/arc-length";
import { args4 } from "./internal/args";
import { corner } from "./internal/corner";
import { edges } from "./internal/edges";
import { tessellate } from "./tessellate";

export class Quad2 extends PointContainer2 implements
    IArea,
    IArcLength,
    ICopy<Quad2>,
    IEdges<Vec2[]>,
    IPointMap<Vec2, Vec2>,
    ITessellateable<Vec2> {

    copy() {
        return new Quad2(this._copy(), { ...this.attribs });
    }

    arcLength() {
        return arcLength(this.points, true);
    }

    area(signed = true) {
        const [a, b, c, d] = this.points;
        const area = 0.5 * (corner(a, b, c) + corner(a, c, d));
        return signed ? area : Math.abs(area);
    }

    edges() {
        return edges(this.points, true);
    }

    mapPoint(_: Readonly<Vec2>, __?: Vec2): Vec2 {
        throw new Error("TODO");
    }

    unmapPoint(q: Readonly<Vec2>, out?: Vec2) {
        const p = this.points;
        const res = Vec2.mixBilinear(p[0], p[1], p[3], p[2], q.x, q.y);
        return out ? out.set(res) : res;
    }

    tessellate(tessel: Tessellator<Vec2>, iter?: number): Vec2[][];
    tessellate(tessel: Iterable<Tessellator<Vec2>>): Vec2[][];
    tessellate(...args: any[]) {
        return tessellate.apply(null, [this.points, ...args]);
    }

    toHiccup() {
        return this._toHiccup("polygon");
    }

    toJSON() {
        return this._toJSON("quad2");
    }
}

export function quad2(points: Vec, start?: number, cstride?: number, estride?: number, attribs?: Attribs): Quad2;
export function quad2(a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, attribs?: Attribs): Quad2;
export function quad2(points: ReadonlyVec[], attribs?: Attribs): Quad2;
export function quad2(...args: any[]) {
    const [points, attribs] = args4(args);
    return new Quad2(points, attribs);
}
