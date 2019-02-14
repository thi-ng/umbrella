import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import {
    div,
    ReadonlyVec,
    sub,
    Vec
} from "@thi.ng/vectors";
import { Rect } from "../api";
import { dispatch } from "../internal/dispatch";

export const mapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(dispatch);

mapPoint.addAll({

    [Type.RECT]:
        ($: Rect, p: ReadonlyVec, out: Vec = []) =>
            div(null, sub(out, p, $.pos), $.size),

});

mapPoint.isa(Type.AABB, Type.RECT);
