import { TAU } from "@thi.ng/vectors/math";
import { Vec2, setS2, mul2, rotate2, add2 } from "@thi.ng/vectors/vec2";
import { IVertices, IEdges } from "./api";
import { Vec } from "@thi.ng/vectors/api";
import { edges } from "./func/edges";

export class Arc2 implements
    IEdges<Vec2[]>,
    IVertices<Vec2> {

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
        const m = Vec2.sub(a, b).mulN(0.5);
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
        const c = new Vec2([co * tc.x - si * tc.y, si * tc.x + co * tc.y]).add(Vec2.mixN(a, b));
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

    static DEFAULT_RES = 20;

    pos: Vec2;
    r: Vec2;
    axis: number;
    start: number;
    end: number;
    xl: boolean;
    clockwise: boolean;

    constructor(pos: Vec2, r: Vec2, axis: number, start: number, end: number, xl = false, clockwise = false) {
        this.pos = pos;
        this.r = r;
        this.axis = axis;
        this.start = start;
        this.end = end;
        this.clockwise = clockwise;
        this.xl = xl;
    }

    edges(num = Arc2.DEFAULT_RES) {
        return edges(this.vertices(num));
    }

    vertices(num = Arc2.DEFAULT_RES) {
        const res: Vec = new Array(num * 2);
        const start = this.start;
        const delta = (this.end - start) / (num - 1);
        const pos = this.pos;
        const r = this.r;
        const axis = this.axis;
        for (let i = 0, j = 0; i < num; i++ , j += 2) {
            const t = start + i * delta;
            setS2(res, Math.cos(t), Math.sin(t), j);
            mul2(res, r.buf, j, r.i, 1, r.s);
            rotate2(res, axis, j);
            add2(res, pos.buf, j, pos.i, 1, pos.s);
        }
        return Vec2.mapBuffer(res, num);
    }
}