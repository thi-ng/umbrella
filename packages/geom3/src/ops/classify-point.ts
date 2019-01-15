import { defmulti } from "@thi.ng/defmulti";
import { EPS, sign } from "@thi.ng/math";
import { dist, ReadonlyVec } from "@thi.ng/vectors3";
import { Circle, IShape, Type } from "../api";
import { dispatch } from "../internal/dispatch";

export const classifyPoint = defmulti<IShape, ReadonlyVec, number>(dispatch);

classifyPoint.addAll({

    [Type.CIRCLE]:
        ($: Circle, p: ReadonlyVec, eps = EPS) =>
            sign($.r - dist($.pos, p), eps),

});
