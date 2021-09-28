import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { cubicSplitAt } from "@thi.ng/geom-splines/cubic-split";
import { quadraticSplitAt } from "@thi.ng/geom-splines/quadratic-split";
import { fit01 } from "@thi.ng/math/fit";
import { set } from "@thi.ng/vectors/set";
import { Arc } from "../api/arc";
import { Cubic } from "../api/cubic";
import { Line } from "../api/line";
import { Polyline } from "../api/polyline";
import { Quadratic } from "../api/quadratic";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { pointArraysAsShapes } from "../internal/points-as-shape";
import { splitLine } from "../internal/split";

export const splitAt: MultiFn2<IShape, number, IShape[] | undefined> = defmulti<
    any,
    number,
    IShape[] | undefined
>(
    dispatch,
    {},
    {
        arc: ($: Arc, t: number) => {
            const theta = fit01(t, $.start, $.end);
            return [
                new Arc(
                    set([], $.pos),
                    set([], $.r),
                    $.axis,
                    $.start,
                    theta,
                    $.xl,
                    $.cw,
                    copyAttribs($)
                ),
                new Arc(
                    set([], $.pos),
                    set([], $.r),
                    $.axis,
                    theta,
                    $.end,
                    $.xl,
                    $.cw,
                    copyAttribs($)
                ),
            ];
        },

        cubic: ({ attribs, points }: Cubic, t: number) =>
            cubicSplitAt(points[0], points[1], points[2], points[3], t).map(
                (pts) => new Cubic(pts, { ...attribs })
            ),

        line: ({ attribs, points }: Line, t) =>
            splitLine(points[0], points[1], t).map(
                (pts) => new Line(pts, { ...attribs })
            ),

        polyline: ($: Polyline, t) =>
            pointArraysAsShapes(
                Polyline,
                new Sampler($.points).splitAt(t),
                $.attribs
            ),

        quadratic: ({ attribs, points }: Quadratic, t: number) =>
            quadraticSplitAt(points[0], points[1], points[2], t).map(
                (pts) => new Quadratic(pts, { ...attribs })
            ),
    }
);
