import { defmulti } from "@thi.ng/defmulti";
import { ReadonlyVec } from "@thi.ng/vectors3";
import {
    Cubic,
    IShape,
    Quadratic,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { splitCubicNear, splitQuadraticNear } from "../internal/split";

export const splitNearPoint = defmulti<IShape, ReadonlyVec, IShape[]>(dispatch);

splitNearPoint.addAll({

    [Type.CUBIC]:
        ({ points, attribs }: Cubic, p) =>
            splitCubicNear(p, points[0], points[1], points[2], points[3])
                .map((pts) => new Cubic(pts, { ...attribs })),

    [Type.QUADRATIC]:
        ({ points, attribs }: Quadratic, p) =>
            splitQuadraticNear(p, points[0], points[1], points[2])
                .map((pts) => new Quadratic(pts, { ...attribs })),

});
