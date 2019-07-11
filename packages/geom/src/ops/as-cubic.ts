import { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation1, MultiFn1O } from "@thi.ng/defmulti";
import { CubicOpts, IShape, Type } from "@thi.ng/geom-api";
import { closedCubicFromBreakPoints, closedCubicFromControlPoints } from "@thi.ng/geom-splines";
import {
    EPS,
    HALF_PI,
    roundEps,
    sincos
} from "@thi.ng/math";
import { mapcat } from "@thi.ng/transducers";
import { add2, magSq2 } from "@thi.ng/vectors";
import {
    Arc,
    Cubic,
    Line,
    Path,
    Polygon,
    Quadratic
} from "../api";
import { cubic, cubicFromLine, cubicFromQuadratic } from "../ctors/cubic";
import { dispatch } from "../internal/dispatch";

export const asCubic: MultiFn1O<IShape, Partial<CubicOpts>, Cubic[]> = defmulti(
    dispatch
);

asCubic.addAll(<IObjectOf<Implementation1<unknown, Cubic[]>>>{
    [Type.ARC]: ($: Arc) => {
        const p = $.pointAtTheta($.start);
        const q = $.pointAtTheta($.end);
        const [rx, ry] = $.r;
        const [sphi, cphi] = sincos($.axis);
        const dx = (cphi * (p[0] - q[0])) / 2 + (sphi * (p[1] - q[1])) / 2;
        const dy = (-sphi * (p[0] - q[0])) / 2 + (cphi * (p[1] - q[1])) / 2;
        if ((dx === 0 && dy === 0) || magSq2($.r) < EPS) {
            return [cubicFromLine(p, q, { ...$.attribs })];
        }

        const mapP = (x: number, y: number) => {
            x *= rx;
            y *= ry;
            return add2(
                null,
                [cphi * x - sphi * y, sphi * x + cphi * y],
                $.pos
            );
        };

        const res: Cubic[] = [];
        const delta = $.end - $.start;
        const n = Math.max(roundEps(Math.abs(delta) / HALF_PI, 1e-3), 1);
        // https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/core/svg/svg_path_parser.cc#L253
        const d = delta / n;
        const t = (8 / 6) * Math.tan(0.25 * d);
        if (!isFinite(t)) {
            return [cubicFromLine(p, q)];
        }
        for (let i = n, theta = $.start; i > 0; i--, theta += d) {
            const [s1, c1] = sincos(theta);
            const [s2, c2] = sincos(theta + d);
            const curve = new Cubic(
                [
                    mapP(c1, s1),
                    mapP(c1 - s1 * t, s1 + c1 * t),
                    mapP(c2 + s2 * t, s2 - c2 * t),
                    mapP(c2, s2)
                ],
                { ...$.attribs }
            );
            res.push(curve);
        }
        return res;
    },

    [Type.CUBIC]: ($: Cubic) => [$],

    [Type.LINE]: ({ attribs, points }: Line) => [
        cubicFromLine(points[0], points[1], { ...attribs })
    ],

    [Type.PATH]: ($: Path) => [
        ...mapcat((s) => (s.geo ? asCubic(s.geo) : null), $.segments)
    ],

    [Type.POLYGON]: ($: Polygon, opts: Partial<CubicOpts> = {}) => {
        opts = { breakPoints: false, scale: 1 / 3, uniform: false, ...opts };
        return (opts.breakPoints
            ? closedCubicFromBreakPoints($.points, opts.scale, opts.uniform)
            : closedCubicFromControlPoints($.points, opts.scale, opts.uniform)
        ).map((pts) => cubic(pts, { ...$.attribs }));
    },

    [Type.QUADRATIC]: ({ attribs, points }: Quadratic) => [
        cubicFromQuadratic(points[0], points[1], points[2], { ...attribs })
    ]
});
