import { isNumber } from "@thi.ng/checks";
import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { ArcSamplingOpts, sample as _arcVertices } from "@thi.ng/geom-arc";
import { DEFAULT_SAMPLES, resample, SamplingOpts } from "@thi.ng/geom-resample";
import { sampleCubic, sampleQuadratic } from "@thi.ng/geom-splines";
import { cossin, TAU } from "@thi.ng/math";
import {
    add2,
    cartesian2,
    madd2,
    set2,
    Vec
} from "@thi.ng/vectors";
import {
    Arc,
    Circle,
    Cubic,
    Ellipse,
    Group,
    IShape,
    Path,
    Points,
    Polygon,
    Polyline,
    Quadratic,
    Rect,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";

export const vertices: MultiFn1O<IShape, number | Partial<SamplingOpts>, Vec[]> = defmulti(dispatch);

vertices.addAll({

    [Type.ARC]:
        ($: Arc, opts?: number | Partial<ArcSamplingOpts>): Vec[] =>
            _arcVertices($.pos, $.r, $.axis, $.start, $.end, opts),


    [Type.CIRCLE]:
        ($: Circle, opts = DEFAULT_SAMPLES) => {
            const pos = $.pos;
            const r = $.r;
            let [num, last] = circleOpts(opts, r);
            const delta = TAU / num;
            last && num++;
            const buf: Vec[] = new Array(num);
            for (let i = 0; i < num; i++) {
                buf[i] = cartesian2(null, [r, i * delta], pos);
            }
            return buf;
        },

    [Type.CUBIC]:
        ($: Cubic, opts?: number | Partial<SamplingOpts>) =>
            sampleCubic($.points, opts),


    [Type.ELLIPSE]:
        ($: Ellipse, opts = DEFAULT_SAMPLES) => {
            const buf: Vec[] = [];
            const pos = $.pos;
            const r = $.r;
            let [num, last] = circleOpts(opts, Math.max($.r[0], $.r[1]));
            const delta = TAU / num;
            last && num++;
            for (let i = 0; i < num; i++) {
                buf[i] = madd2([], pos, cossin(i * delta), r);
            }
            return buf;
        },

    [Type.GROUP]:
        ({ children }: Group) =>
            children.reduce((acc, $) => acc.concat(vertices($)), []),

    [Type.PATH]:
        ($: Path, opts?: number | Partial<SamplingOpts>) => {
            const _opts = isNumber(opts) ?
                { num: opts } :
                opts;
            let verts: Vec[] = [];
            for (let segs = $.segments, n = segs.length - 1, i = 0; i <= n; i++) {
                const s = segs[i];
                if (s.geo) {
                    verts = verts.concat(
                        vertices(s.geo, { ..._opts, last: i === n && !$.closed })
                    );
                }
            }
            return verts;
        },

    [Type.POINTS]:
        ($: Points) => $.points,

    [Type.POLYGON]:
        ($: Polygon, opts?) =>
            resample($.points, opts, true),

    [Type.POLYLINE]:
        ($: Polyline, opts?) =>
            resample($.points, opts),

    [Type.QUADRATIC]:
        ($: Quadratic, opts?: number | Partial<SamplingOpts>) =>
            sampleQuadratic($.points, opts),


    [Type.RECT]:
        ($: Rect, opts) => {
            const p = $.pos;
            const q = add2([], p, $.size);
            const verts = [set2([], p), [q[0], p[1]], q, [p[0], q[1]]];
            return opts != null ?
                vertices(new Polygon(verts), opts) :
                verts;
        }
});

vertices.isa(Type.LINE, Type.POLYLINE);
vertices.isa(Type.QUAD, Type.POLYGON);
vertices.isa(Type.TRIANGLE, Type.POLYGON);

const circleOpts =
    (opts: number | Partial<ArcSamplingOpts>, r: number): [number, boolean] =>
        isNumber(opts) ?
            [opts, false] :
            [
                opts.theta ?
                    Math.floor(TAU / opts.theta) :
                    opts.dist ?
                        Math.floor(TAU / (opts.dist / r)) :
                        opts.num || DEFAULT_SAMPLES,
                opts.last === true
            ];
