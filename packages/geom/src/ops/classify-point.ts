import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import {
    classifyPointInCircle,
    classifyPointInTriangle2
} from "@thi.ng/geom-isec";
import { EPS } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors";
import { Circle, Triangle } from "../api";
import { dispatch } from "../internal/dispatch";

export const classifyPoint: MultiFn2O<
    IShape,
    ReadonlyVec,
    number,
    number
> = defmulti(dispatch);

classifyPoint.addAll({
    [Type.CIRCLE]: ($: Circle, p: ReadonlyVec, eps = EPS) =>
        classifyPointInCircle(p, $.pos, $.r, eps),

    [Type.TRIANGLE]: ({ points }: Triangle, p: ReadonlyVec, eps = EPS) =>
        classifyPointInTriangle2(p, points[0], points[1], points[2], eps)
});

classifyPoint.isa(Type.SPHERE, Type.CIRCLE);
