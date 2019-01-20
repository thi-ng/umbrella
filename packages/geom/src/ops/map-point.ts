import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import {
    ReadonlyVec,
    Vec,
    sub,
    div
} from "@thi.ng/vectors";
import { IShape, Rect, Type } from "../api";
import { dispatch } from "../internal/dispatch";

export const mapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(dispatch);

mapPoint.addAll({

    [Type.RECT]:
        ($: Rect, p: ReadonlyVec, out: Vec = []) =>
            div(null, sub(out, p, $.pos), $.size),

});

mapPoint.isa(Type.AABB, Type.RECT);
