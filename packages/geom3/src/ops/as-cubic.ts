import { defmulti } from "@thi.ng/defmulti";
import {
    Cubic,
    IShape,
    Line,
    Quadratic,
    Type
} from "../api";
import { cubicFromLine, cubicFromQuadratic } from "../ctors/cubic";
import { dispatch } from "../internal/dispatch";

export const asCubic = defmulti<IShape, Cubic[]>(dispatch);

asCubic.addAll({

    [Type.CUBIC]:
        ($: Cubic) => [$],

    [Type.LINE]:
        ({ attribs, points }: Line) =>
            [cubicFromLine(points[0], points[1], { ...attribs })],

    [Type.QUADRATIC]:
        ({ attribs, points }: Quadratic) =>
            [cubicFromQuadratic(points[0], points[1], points[2], { ...attribs })],

});
