import { defmulti } from "@thi.ng/defmulti";
import { fit01 } from "@thi.ng/math";
import { set } from "@thi.ng/vectors3";
import {
    Arc,
    Cubic,
    IShape,
    Line,
    Polyline,
    Quadratic,
    Type
} from "../api";
import { copyPoints } from "../internal/copy-points";
import { dispatch } from "../internal/dispatch";
import { Sampler } from "../internal/sampler";
import { splitCubic, splitQuadratic } from "../internal/splines";
import { splitLine } from "../internal/split-line";

export const splitAt = defmulti<IShape, number, IShape[]>(dispatch);

splitAt.addAll({

    [Type.ARC]:
        ($: Arc, t: number) => {
            const theta = fit01(t, $.start, $.end);
            return [
                new Arc(set([], $.pos), set([], $.r), $.axis, $.start, theta, $.xl, $.cw, { ...$.attribs }),
                new Arc(set([], $.pos), set([], $.r), $.axis, theta, $.end, $.xl, $.cw, { ...$.attribs }),
            ];
        },

    [Type.CUBIC]:
        ({ attribs, points }: Cubic, t: number) =>
            splitCubic(points[0], points[1], points[2], points[3], t)
                .map((pts) => new Cubic(pts, { ...attribs })),

    [Type.LINE]:
        ({ attribs, points }: Line, t) =>
            splitLine(points[0], points[1], t)
                .map((pts) => new Line(pts, { ...attribs })),

    [Type.POLYLINE]:
        ($: Polyline, t) =>
            new Sampler($.points)
                .splitAt(t)
                .map((pts) => new Polyline(copyPoints(pts), { ...$.attribs })),

    [Type.QUADRATIC]:
        ({ attribs, points }: Quadratic, t: number) =>
            splitQuadratic(points[0], points[1], points[2], t)
                .map((pts) => new Quadratic(pts, { ...attribs })),

});
