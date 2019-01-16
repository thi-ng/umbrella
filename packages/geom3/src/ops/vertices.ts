import { isNumber } from "@thi.ng/checks";
import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { cossin, TAU } from "@thi.ng/math";
import {
    add2,
    cartesian2,
    madd2,
    set2,
    Vec
} from "@thi.ng/vectors3";
import {
    Circle,
    DEFAULT_SAMPLES,
    Ellipse,
    Group,
    IShape,
    Polygon,
    Polyline,
    Rect,
    SamplingOpts,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { resamplePoints } from "../internal/sampler";

export const vertices: MultiFn1O<IShape, number | Partial<SamplingOpts>, Vec[]> = defmulti(dispatch);

vertices.addAll({

    [Type.CIRCLE]:
        ($: Circle, opts = DEFAULT_SAMPLES) => {
            const pos = $.pos;
            const r = $.r;
            let [num, last] = circleOpts(opts);
            const delta = TAU / num;
            last && num++;
            const buf: Vec[] = new Array(num);
            for (let i = 0; i < num; i++) {
                buf[i] = cartesian2(null, [r, i * delta], pos);
            }
            return buf;
        },

    [Type.ELLIPSE]:
        ($: Ellipse, opts = DEFAULT_SAMPLES) => {
            const buf: Vec[] = [];
            const pos = $.pos;
            const r = $.r;
            let [num, last] = circleOpts(opts);
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

    [Type.POLYGON]:
        ($: Polygon, opts?) =>
            resamplePoints($.points, opts, true),

    [Type.POLYLINE]:
        ($: Polyline, opts?) =>
            resamplePoints($.points, opts),

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
    (opts: number | Partial<SamplingOpts>): [number, boolean] =>
        isNumber(opts) ?
            [opts, false] :
            [
                opts.theta ?
                    Math.floor(TAU / opts.theta) :
                    opts.num || DEFAULT_SAMPLES,
                opts.last === true
            ];
