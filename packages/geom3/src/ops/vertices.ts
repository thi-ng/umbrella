import { isNumber, isPlainObject } from "@thi.ng/checks";
import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { cossin, TAU } from "@thi.ng/math";
import {
    Arc,
    Circle,
    DEFAULT_SAMPLES,
    Ellipse,
    Group,
    IShape,
    Path,
    Polygon,
    Polyline,
    Rect,
    SamplingOpts,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { resamplePoints, Sampler } from "../internal/sampler";
import {
    add2,
    cartesian2,
    madd2,
    set2,
    Vec,
} from "@thi.ng/vectors3";

export const vertices: MultiFn1O<IShape, number | Partial<SamplingOpts>, Vec[]> = defmulti(dispatch);

vertices.addAll({

    [Type.ARC]:
        (arc: Arc, opts?: number | Partial<SamplingOpts>): Vec[] => {
            if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
                return new Sampler(vertices(arc, (<any>opts).num || DEFAULT_SAMPLES))
                    .sampleUniform((<any>opts).dist, (<any>opts).last !== false);
            }
            opts = isNumber(opts) ?
                { num: opts, last: true } :
                { num: DEFAULT_SAMPLES, ...opts };
            const start = arc.start;
            let delta = arc.end - start;
            let num = opts.theta ?
                Math.round(delta / opts.theta) :
                opts.num;
            delta /= num;
            opts.last !== false && num++;
            const pts: Vec[] = new Array(num);
            for (let i = 0, j = 0; i < num; i++ , j += 2) {
                pts[i] = arc.pointAtTheta(start + i * delta);
            }
            return pts;
        },

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
        (path: Path, opts?: number | Partial<SamplingOpts>) => {
            const _opts = isNumber(opts) ?
                { num: opts } :
                opts;
            let verts: Vec[] = [];
            for (let segs = path.segments, n = segs.length - 1, i = 0; i <= n; i++) {
                const s = segs[i];
                if (s.geo) {
                    verts = verts.concat(
                        vertices(s.geo, { ..._opts, last: i === n && !path.closed })
                    );
                }
            }
            return verts;
        },

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
    (opts: number | Partial<SamplingOpts>, r: number): [number, boolean] =>
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
