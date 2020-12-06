import type { IObjectOf } from "@thi.ng/api";
import { isArray, isNumber } from "@thi.ng/checks";
import { defmulti, Implementation1O, MultiFn1O } from "@thi.ng/defmulti";
import { DEFAULT_SAMPLES, IShape, SamplingOpts, Type } from "@thi.ng/geom-api";
import { sample as _arcVertices } from "@thi.ng/geom-arc";
import { resample } from "@thi.ng/geom-resample";
import { sampleCubic, sampleQuadratic } from "@thi.ng/geom-splines";
import { cossin, TAU } from "@thi.ng/math";
import { add2, add3, cartesian2, madd2, set2, Vec } from "@thi.ng/vectors";
import type { AABB } from "../api/aabb";
import type { Arc } from "../api/arc";
import type { Circle } from "../api/circle";
import type { Cubic } from "../api/cubic";
import type { Ellipse } from "../api/ellipse";
import type { Group } from "../api/group";
import type { Path } from "../api/path";
import type { Points } from "../api/points";
import { Polygon } from "../api/polygon";
import type { Polyline } from "../api/polyline";
import type { Quadratic } from "../api/quadratic";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";

export const vertices: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Vec[]
> = defmulti(dispatch);

vertices.addAll(<
    IObjectOf<Implementation1O<unknown, number | Partial<SamplingOpts>, Vec[]>>
>{
    // e +----+ h
    //   |\   :\
    //   |f+----+ g
    //   | |  : |
    // a +-|--+d|
    //    \|   \|
    //   b +----+ c
    //
    [Type.AABB]: ({ pos, size }: AABB) => {
        const [px, py, pz] = pos;
        const [qx, qy, qz] = add3([], pos, size);
        return [
            [px, py, pz], // a
            [px, py, qz], // b
            [qx, py, qz], // c
            [qx, py, pz], // d
            [px, qy, pz], // e
            [px, qy, qz], // f
            [qx, qy, qz], // g
            [qx, qy, pz], // h
        ];
    },

    [Type.ARC]: ($: Arc, opts?: number | Partial<SamplingOpts>): Vec[] =>
        _arcVertices($.pos, $.r, $.axis, $.start, $.end, opts),

    [Type.CIRCLE]: ($: Circle, opts = DEFAULT_SAMPLES) => {
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

    [Type.CUBIC]: ($: Cubic, opts?: number | Partial<SamplingOpts>) =>
        sampleCubic($.points, opts),

    [Type.ELLIPSE]: ($: Ellipse, opts = DEFAULT_SAMPLES) => {
        const buf: Vec[] = [];
        const pos = $.pos;
        const r = $.r;
        let [num, last] = circleOpts(opts, Math.max($.r[0], $.r[1]));
        const delta = TAU / num;
        last && num++;
        for (let i = 0; i < num; i++) {
            buf[i] = madd2([], cossin(i * delta), r, pos);
        }
        return buf;
    },

    [Type.GROUP]: ({ children }: Group) =>
        children.reduce((acc, $) => acc.concat(vertices($)), <Vec[]>[]),

    [Type.PATH]: ($: Path, opts?: number | Partial<SamplingOpts>) => {
        const _opts = isNumber(opts) ? { num: opts } : opts;
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

    [Type.POINTS]: ($: Points) => $.points,

    [Type.POLYGON]: ($: Polygon, opts?) => resample($.points, opts, true),

    [Type.POLYLINE]: ($: Polyline, opts?) => resample($.points, opts),

    [Type.QUADRATIC]: ($: Quadratic, opts?: number | Partial<SamplingOpts>) =>
        sampleQuadratic($.points, opts),

    [Type.RECT]: ($: Rect, opts) => {
        const p = $.pos;
        const q = add2([], p, $.size);
        const verts = [set2([], p), [q[0], p[1]], q, [p[0], q[1]]];
        return opts != null ? vertices(new Polygon(verts), opts) : verts;
    },
});

vertices.isa(Type.LINE, Type.POLYLINE);
vertices.isa(Type.POINTS3, Type.POINTS);
vertices.isa(Type.QUAD, Type.POLYGON);
vertices.isa(Type.TRIANGLE, Type.POLYGON);

/**
 * Takes array of vectors or an `IShape`. If the latter, calls {@link vertices}
 * and return result, else returns original array.
 *
 * @param shape
 */
export const ensureVertices = (shape: IShape | Vec[]) =>
    isArray(shape) ? shape : vertices(shape);

const circleOpts = (
    opts: number | Partial<SamplingOpts>,
    r: number
): [number, boolean] =>
    isNumber(opts)
        ? [opts, false]
        : [
              opts.theta
                  ? Math.floor(TAU / opts.theta)
                  : opts.dist
                  ? Math.floor(TAU / (opts.dist / r))
                  : opts.num || DEFAULT_SAMPLES,
              opts.last === true,
          ];
