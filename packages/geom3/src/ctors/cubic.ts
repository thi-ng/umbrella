import {
    EPS,
    HALF_PI,
    roundEps,
    sincos
} from "@thi.ng/math";
import {
    add2,
    magSq2,
    mixN2,
    set2,
    Vec
} from "@thi.ng/vectors3";
import { Arc, Attribs, Cubic } from "../api";
import { argAttribs } from "../internal/args";

export function cubic(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Cubic;
export function cubic(pts: Vec[], attribs?: Attribs): Cubic;
export function cubic(...args: any[]) {
    const attr = argAttribs(args);
    return new Cubic(args.length === 1 ? args[0] : args, attr);
}

export const cubicFromArc =
    (arc: Arc) => {
        const p = arc.pointAtTheta(arc.start);
        const q = arc.pointAtTheta(arc.end);
        const [rx, ry] = arc.r;
        const [sphi, cphi] = sincos(arc.axis);
        const dx = cphi * (p[0] - q[0]) / 2 + sphi * (p[1] - q[1]) / 2;
        const dy = -sphi * (p[0] - q[0]) / 2 + cphi * (p[1] - q[1]) / 2;
        if ((dx === 0 && dy === 0) || magSq2(arc.r) < EPS) {
            return [cubicFromLine(p, q, { ...arc.attribs })];
        }

        const mapP = (x: number, y: number) => {
            x *= rx;
            y *= ry;
            return add2(
                null,
                [
                    cphi * x - sphi * y,
                    sphi * x + cphi * y
                ],
                arc.pos
            );
        };

        const res: Cubic[] = [];
        const delta = arc.end - arc.start;
        const n = Math.max(roundEps(Math.abs(delta) / HALF_PI), 1);
        // https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/core/svg/svg_path_parser.cc#L253
        const d = delta / n;
        const t = 8 / 6 * Math.tan(0.25 * d);
        if (!isFinite(t)) {
            return [cubicFromLine(p, q, { ...arc.attribs })];
        }
        for (let i = n, theta = arc.start; i > 0; i-- , theta += d) {
            const [s1, c1] = sincos(theta);
            const [s2, c2] = sincos(theta + d);
            const curve = new Cubic(
                [
                    mapP(c1, s1),
                    mapP(c1 - s1 * t, s1 + c1 * t),
                    mapP(c2 + s2 * t, s2 - c2 * t),
                    mapP(c2, s2),
                ],
                { ...arc.attribs }
            );
            res.push(curve);
        }
        return res;
    };

export const cubicFromLine =
    (a: Vec, b: Vec, attribs?: Attribs) =>
        new Cubic([a, mixN2([], a, b, 1 / 3), mixN2([], b, a, 1 / 3), b], attribs);

export const cubicFromQuadratic =
    (a: Vec, b: Vec, c: Vec, attribs?: Attribs) =>
        new Cubic(
            [
                set2([], a),
                mixN2([], a, b, 2 / 3),
                mixN2([], c, b, 2 / 3),
                set2([], c)
            ],
            attribs
        );
