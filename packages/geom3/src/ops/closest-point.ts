import { defmulti } from "@thi.ng/defmulti";
import {
    add2,
    normalize,
    ReadonlyVec,
    sub2,
    Vec
} from "@thi.ng/vectors3";
import { Circle, IShape, Type } from "../api";
import { dispatch } from "../internal/dispatch";

export const closestPoint = defmulti<IShape, ReadonlyVec, Vec>(dispatch);

closestPoint.addAll({

    [Type.CIRCLE]:
        ($: Circle, p) =>
            add2(null, normalize(null, sub2([], p, $.pos), $.r), $.pos),

});

