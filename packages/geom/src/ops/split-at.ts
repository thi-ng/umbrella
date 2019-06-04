import { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import { cubicSplitAt, quadraticSplitAt } from "@thi.ng/geom-splines";
import { fit01 } from "@thi.ng/math";
import { copyVectors, set } from "@thi.ng/vectors";
import {
    Arc,
    Cubic,
    Line,
    Polyline,
    Quadratic
} from "../api";
import { dispatch } from "../internal/dispatch";
import { splitLine } from "../internal/split";

export const splitAt = defmulti<IShape, number, IShape[]>(dispatch);

splitAt.addAll(<IObjectOf<Implementation2<unknown, number, IShape[]>>>{
    [Type.ARC]: ($: Arc, t: number) => {
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
                { ...$.attribs }
            ),
            new Arc(
                set([], $.pos),
                set([], $.r),
                $.axis,
                theta,
                $.end,
                $.xl,
                $.cw,
                { ...$.attribs }
            )
        ];
    },

    [Type.CUBIC]: ({ attribs, points }: Cubic, t: number) =>
        cubicSplitAt(points[0], points[1], points[2], points[3], t).map(
            (pts) => new Cubic(pts, { ...attribs })
        ),

    [Type.LINE]: ({ attribs, points }: Line, t) =>
        splitLine(points[0], points[1], t).map(
            (pts) => new Line(pts, { ...attribs })
        ),

    [Type.POLYLINE]: ($: Polyline, t) =>
        new Sampler($.points)
            .splitAt(t)
            .map((pts) => new Polyline(copyVectors(pts), { ...$.attribs })),

    [Type.QUADRATIC]: ({ attribs, points }: Quadratic, t: number) =>
        quadraticSplitAt(points[0], points[1], points[2], t).map(
            (pts) => new Quadratic(pts, { ...attribs })
        )
});
