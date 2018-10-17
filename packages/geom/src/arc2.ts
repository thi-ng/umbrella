import { ICopy } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { HALF_PI, PI, TAU } from "@thi.ng/math/api";
import { inRange } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { range } from "@thi.ng/transducers/iter/range";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import { Vec } from "@thi.ng/vectors/api";
import {
    add2,
    asVec2,
    rotate2,
    setS2,
    Vec2
} from "@thi.ng/vectors/vec2";
import {
    Attribs,
    DEFAULT_SAMPLES,
    HiccupArc2,
    IBounds,
    IBoundsRaw,
    IEdges,
    IVertices,
    JsonArc2,
    SamplingOpts
} from "./api";
import { bounds } from "./internal/bounds";
import { edges } from "./internal/edges";
import { Rect2 } from "./rect2";
import { Sampler } from "./sampler";

export class Arc2 implements
    IBounds<Rect2>,
    IBoundsRaw<Vec2>,
    ICopy<Arc2>,
    IEdges<Vec2[]>,
    IVertices<Vec2, number | Partial<SamplingOpts>> {

    static fromJSON(spec: JsonArc2) {
        return new Arc2(
            new Vec2(spec.pos),
            new Vec2(spec.r),
            spec.axis,
            spec.start,
            spec.end,
            spec.xl,
            spec.clockwise,
            spec.attribs
        );
    }

    static fromHiccup(spec: HiccupArc2) {
        return new Arc2(
            asVec2(spec[2]),
            asVec2(spec[3]),
            spec[4],
            spec[5],
            spec[6],
            spec[7],
            spec[8],
            spec[1]
        );
    }

    static from2Points(
        a: Readonly<Vec2>,
        b: Readonly<Vec2>,
        radii: Readonly<Vec2>,
        axisTheta = 0,
        large = false,
        clockwise = true) {

        const r = radii.copy().abs();
        const co = Math.cos(axisTheta);
        const si = Math.sin(axisTheta);
        const m = a.subNew(b).mulN(0.5);
        const p = new Vec2([co * m.x + si * m.y, -si * m.x + co * m.y]);
        const px2 = p.x * p.x;
        const py2 = p.y * p.y;
        const l = px2 / (r.x * r.x) + py2 / (r.y * r.y);
        l > 1 && r.mulN(Math.sqrt(l));
        const rx2 = r.x * r.x;
        const ry2 = r.y * r.y;
        const rxpy = rx2 * py2;
        const rypx = ry2 * px2;
        const root = ((large === clockwise) ? -1 : 1) *
            Math.sqrt(Math.abs((rx2 * ry2 - rxpy - rypx)) / (rxpy + rypx));
        const tc = new Vec2([r.x * p.y / r.y, -r.y * p.x / r.x]).mulN(root);
        const c = new Vec2([co * tc.x - si * tc.y, si * tc.x + co * tc.y]).add(a.mixNewN(b));
        const d1 = new Vec2([(p.x - tc.x) / r.x, (p.y - tc.y) / r.y]);
        const d2 = new Vec2([(-p.x - tc.x) / r.x, (-p.y - tc.y) / r.y]);
        const theta = Vec2.X_AXIS.angleBetween(d1, true);
        let delta = d1.angleBetween(d2, true);
        if (clockwise && delta < 0) {
            delta += TAU;
        } else if (!clockwise && delta > 0) {
            delta -= TAU;
        }
        return new Arc2(c, r, axisTheta, theta, theta + delta, large, clockwise);
    }

    pos: Vec2;
    r: Vec2;
    axis: number;
    start: number;
    end: number;
    xl: boolean;
    clockwise: boolean;
    attribs: Attribs;

    constructor(
        pos: Vec2,
        r: Vec2,
        axis: number,
        start: number,
        end: number,
        xl = false,
        clockwise = false,
        attribs?: Attribs) {

        this.pos = pos;
        this.r = r;
        this.axis = axis;
        this.start = start;
        this.end = end;
        this.clockwise = clockwise;
        this.xl = xl;
        this.attribs = attribs;
    }

    copy() {
        return new Arc2(
            this.pos.copy(),
            this.r.copy(),
            this.axis,
            this.start,
            this.end,
            this.xl,
            this.clockwise,
            { ...this.attribs }
        );
    }

    boundsRaw() {
        // https://stackoverflow.com/a/1336739/294515
        const pts = transduce(
            map<number, Vec2>(this.pointAtTheta.bind(this)),
            push(),
            [
                this.start,
                this.end,
                // multiples of HALF_PI in arc range
                ...filter(
                    (t: number) => inRange(t, this.start, this.end),
                    range(-3 * PI, 3.01 * PI, HALF_PI)
                )
            ]
        );
        return bounds(pts, Vec2.MAX.copy(), Vec2.MIN.copy());
    }

    bounds() {
        return Rect2.fromMinMax(...this.boundsRaw());
    }

    edges(opts?: number | Partial<SamplingOpts>) {
        return edges(this.vertices(opts));
    }

    pointAt(t: number) {
        return this.pointAtTheta(mix(this.start, this.end, t));
    }

    pointAtTheta(theta: number) {
        return new Vec2([Math.cos(theta), Math.sin(theta)])
            .mul(this.r)
            .rotate(this.axis)
            .add(this.pos);
    }

    vertices(opts?: number | Partial<SamplingOpts>): Vec2[] {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(this.vertices((<any>opts).num || DEFAULT_SAMPLES))
                .sampleUniform((<any>opts).dist, (<any>opts).last !== false);
        }
        opts = isNumber(opts) ?
            { num: opts, last: true } :
            { num: DEFAULT_SAMPLES, ...opts };
        let num: number;
        const start = this.start;
        let delta = this.end - start;
        num = opts.theta ?
            Math.round(delta / opts.theta) :
            opts.num;
        delta /= num;
        opts.last !== false && num++;
        const pts: Vec = new Array(num * 2);
        const pos = this.pos;
        const [rx, ry] = this.r;
        const axis = this.axis;
        for (let i = 0, j = 0; i < num; i++ , j += 2) {
            const t = start + i * delta;
            setS2(pts, Math.cos(t) * rx, Math.sin(t) * ry, j);
            rotate2(pts, axis, j);
            add2(pts, pos.buf, j, pos.i, 1, pos.s);
        }
        return Vec2.mapBuffer(pts, num);
    }

    toHiccup() {
        return ["path", this.attribs,
            [
                ["M", this.pointAtTheta(this.start)],
                ...this.toHiccupPathSegments()
            ]
        ];
    }

    toHiccupPathSegments() {
        return [["A",
            this.r,
            this.axis,
            this.xl ? 1 : 0,
            this.clockwise ? 1 : 0,
            this.pointAtTheta(this.end)
        ]];
    }

    toJSON(): JsonArc2 {
        return {
            type: "arc2",
            pos: this.pos.toJSON(),
            r: this.r.toJSON(),
            start: this.start,
            end: this.end,
            axis: this.axis,
            xl: this.xl,
            clockwise: this.clockwise,
            attribs: this.attribs,
        };
    }
}
