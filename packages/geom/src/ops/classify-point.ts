import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { classifyPointInTriangle2 } from "@thi.ng/geom-poly-utils";
import { EPS, sign } from "@thi.ng/math";
import { distSq, ReadonlyVec } from "@thi.ng/vectors";
import { Circle, Triangle } from "../api";
import { dispatch } from "../internal/dispatch";

export const classifyPoint: MultiFn2O<IShape, ReadonlyVec, number, number> = defmulti(dispatch);

classifyPoint.addAll({

    [Type.CIRCLE]:
        ($: Circle, p: ReadonlyVec, eps = EPS) =>
            sign($.r * $.r - distSq($.pos, p), eps),

    [Type.TRIANGLE]:
        ({ points }: Triangle, p: ReadonlyVec, eps = EPS) =>
            classifyPointInTriangle2(p, points[0], points[1], points[2], eps),

});
