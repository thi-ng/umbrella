import { IToHiccup } from "@thi.ng/api/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { PI, TAU } from "@thi.ng/math/api";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import {
    asVec2,
    setS2,
    toCartesian2,
    Vec2
} from "@thi.ng/vectors/vec2";
import {
    Attribs,
    DEFAULT_SAMPLES,
    HiccupCircle2,
    IArcLength,
    IBounds,
    IBoundsRaw,
    ICentroid,
    IClassifyPoint,
    IPointInside,
    IToPolygon,
    IVertices,
    JsonCircle2,
    SamplingOpts
} from "./api";
import { circumCenter } from "./internal/circumcenter";
import { edges } from "./internal/edges";
import { Polygon2 } from "./polygon2";
import { Rect2 } from "./rect2";

export class Circle2 implements
    IArcLength,
    IBoundsRaw<Vec2>,
    IBounds<Rect2>,
    ICentroid<Vec2>,
    IClassifyPoint<Vec2>,
    IPointInside<Vec2>,
    IToHiccup,
    IToPolygon<number | Partial<SamplingOpts>>,
    IVertices<Vec2, number | Partial<SamplingOpts>> {

    static fromJSON(spec: JsonCircle2) {
        return new Circle2(
            new Vec2(spec.pos),
            spec.r,
            spec.attribs
        );
    }

    static fromHiccup(spec: HiccupCircle2) {
        return new Circle2(asVec2(spec[2]), spec[3], spec[1]);
    }

    static from2Points(a: Readonly<Vec2>, b: Readonly<Vec2>, attribs?: Attribs) {
        return new Circle2(a.mixNewN(b), a.dist(b) / 2, attribs);
    }
    static from3Points(a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>, attribs?: Attribs) {
        const o = circumCenter(a, b, c);
        if (o) {
            return new Circle2(o, a.dist(o), attribs);
        }
    }

    pos: Vec2;
    r: number;
    attribs: Attribs;

    constructor(pos: Vec2, r = 1, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    copy() {
        return new Circle2(this.pos.copy(), this.r, { ...this.attribs });
    }

    edges(opts?: Partial<SamplingOpts>) {
        return edges(this.vertices(opts));
    }

    vertices(opts?: number | Partial<SamplingOpts>) {
        let [num, last] = isNumber(opts) ?
            [opts, false] :
            [
                opts.theta ?
                    Math.floor(TAU / opts.theta) :
                    opts.dist ?
                        Math.floor(TAU / (opts.dist / this.r)) :
                        opts.num || DEFAULT_SAMPLES,
                opts.last === true
            ];
        const buf: Vec = [];
        const pos = this.pos.buf;
        const po = this.pos.i;
        const ps = this.pos.s;
        const r = this.r;
        const delta = TAU / num;
        last && num++;
        for (let i = 0; i < num; i++) {
            toCartesian2(
                setS2(buf, r, i * delta, i * 2),
                pos, i * 2, po, 1, ps
            );
        }
        return Vec2.mapBuffer(buf, num);
    }

    area() {
        return PI * this.r * this.r;
    }

    arcLength() {
        return TAU * this.r;
    }

    boundsRaw(): [Vec2, Vec2] {
        return [
            this.pos.subNewN(this.r),
            this.pos.addNewN(this.r)
        ];
    }

    bounds(): Rect2 {
        return new Rect2(
            this.pos.subNewN(this.r),
            new Vec2([this.r, this.r])
        );
    }

    centroid(c?: Vec2) {
        return c ? c.set(this.pos) : this.pos;
    }

    classifyPoint(p: Readonly<Vec2>) {
        const d = p.distSq(this.pos);
        const r = this.r * this.r;
        return eqDelta(d, r) ? 0 : d < r ? 1 : -1;
    }

    pointInside(p: Readonly<Vec2>) {
        return this.classifyPoint(p) >= 0;
    }

    toPolygon(opts?: number | Partial<SamplingOpts>) {
        return new Polygon2(this.vertices(opts));
    }

    toHiccup(): HiccupCircle2 {
        return ["circle", this.attribs || {}, this.pos, this.r];
    }

    toJSON() {
        return {
            type: "circle2",
            pos: this.pos.toJSON(),
            r: this.r,
            attribs: this.attribs,
        };
    }
}

export function circle2(r: number, attribs?: Attribs): Circle2;
export function circle2(x: number, y: number, attribs?: Attribs): Circle2;
export function circle2(x: number, y: number, r: number, attribs?: Attribs): Circle2;
export function circle2(pos: ReadonlyVec, attribs?: Attribs): Circle2;
export function circle2(pos: ReadonlyVec, r: number, attribs?: Attribs): Circle2;
export function circle2(...args: any[]) {
    let attribs;
    let n = args.length - 1;
    if (isPlainObject(args[n]) || args[n] == null) {
        attribs = args[n];
        n--;
    }
    if (isArrayLike(args[0])) {
        return new Circle2(
            asVec2(args[0]),
            n === 1 ? args[n] : 1,
            attribs
        );
    }
    if (n > 0) {
        return new Circle2(
            new Vec2([args[0], args[1]]),
            n === 2 ? args[n] : 1,
            attribs
        );
    }
    return new Circle2(new Vec2(), args[0], attribs);
}
