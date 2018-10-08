import { IObjectOf } from "@thi.ng/api/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { Vec2 } from "@thi.ng/vectors/vec2";
import {
    CollateOpts,
    IBounds,
    ICentroid,
    ICollate,
    IVertices,
    IBoundsRaw
} from "./api";
import { collateWith } from "./internal/collate";
import { edges } from "./internal/edges";

export class Rect2 implements
    ICollate,
    IBoundsRaw<Vec2>,
    IBounds<Rect2>,
    ICentroid<Vec2>,
    IVertices<Vec2, void> {

    static fromMinMax(min: Vec2, max: Vec2) {
        return new Rect2(min, max.subNew(min));
    }

    pos: Vec2;
    size: Vec2;
    attribs: IObjectOf<any>;

    constructor(pos: Vec2, size: Vec2, attribs?: any) {
        this.pos = pos;
        this.size = size;
        this.attribs = attribs;
    }

    copy() {
        const buf = Vec2.intoBuffer([], [this.pos, this.size]);
        return new Rect2(new Vec2(buf, 0), new Vec2(buf, 2), { ...this.attribs })
    }

    collate(opts?: Partial<CollateOpts>) {
        return collateWith(Vec2.intoBuffer, [this.pos, this.size], opts, 2);
    }

    boundsRaw(): [Vec2, Vec2] {
        return [this.pos.copy(), this.pos.addNew(this.size)];
    }

    bounds() {
        return this;
    }

    centroid(c?: Vec2) {
        return this.pos.maddNewN(this.size, 0.5, c);
    }

    center(origin?: Readonly<Vec2>) {
        const d = this.centroid().neg();
        this.pos.add(origin ? d.add(origin) : d);
        return this;
    }

    mapPoint(p: Vec2, out?: Vec2) {
        return p.subNew(this.pos, out).div(this.size);
    }

    unmapPoint(p: Vec2, out?: Vec2) {
        return (out ? out.set(this.pos) : this.pos.copy()).madd(this.size, p);
    }

    scale(v: Readonly<Vec2>) {
        this.pos.mul(v);
        this.size.mul(v);
        return this;
    }

    scaleN(n: number) {
        this.pos.mulN(n);
        this.size.mulN(n);
        return this;
    }

    translate(v: Readonly<Vec2>) {
        this.pos.add(v);
        return this;
    }

    union(r: Rect2) {
        const p = this.pos.addNew(this.size);
        const q = r.pos.addNew(r.size);
        this.pos.min(r.pos);
        this.size.set(p.max(q).sub(this.pos));
        return this;
    }

    edges() {
        return edges(this.vertices(), true);
    }

    vertices() {
        const [x, y] = this.pos;
        const [w, h] = this.size;
        return Vec2.mapBuffer([x, y, x + w, y, x + w, y + h, x, y + h], 4);
    }

    toHiccup() {
        return ["rect", this.attribs, this.pos, this.size.x, this.size.y];
    }

    toJSON() {
        return {
            type: "rect2",
            pos: this.pos.toJSON(),
            size: this.size.toJSON(),
        };
    }
}

export function rect2(x: number, y: number, w: number, h: number, attribs?: IObjectOf<any>): Rect2;
export function rect2(x: number, y: number, w: number, attribs?: IObjectOf<any>): Rect2;
export function rect2(w: number, h: number, attribs?: IObjectOf<any>): Rect2;
export function rect2(pos: Vec2, w: number, attribs?: IObjectOf<any>): Rect2;
export function rect2(pos: Vec2, size: Vec2, attribs?: IObjectOf<any>): Rect2;
export function rect2(w: number, attribs?: IObjectOf<any>): Rect2;
export function rect2(...args: any[]) {
    let attribs;
    let n = args.length - 1;
    if (isPlainObject(args[n]) || args[n] == null) {
        attribs = args[n];
        n--;
    }
    if (args[0] instanceof Vec2) {
        const size = args[1];
        return new Rect2(
            args[0],
            size instanceof Vec2 ?
                size :
                new Vec2([size, size]),
            attribs
        );
    }
    if (n > 1) {
        return new Rect2(
            new Vec2([args[0], args[1]]),
            new Vec2(
                n === 2 ?
                    [args[2], args[2]] :
                    [args[2], args[3]]
            ),
            attribs
        );
    }
    return new Rect2(
        new Vec2([0, 0]),
        new Vec2(n > 0 ? [args[0], args[1]] : [args[0], args[0]]),
        attribs
    );
};
