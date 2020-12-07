import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { div, ReadonlyVec, sub, Vec } from "@thi.ng/vectors";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import type { IObjectOf } from "@thi.ng/api";

export const mapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(
    <any>dispatch
);

mapPoint.addAll(<IObjectOf<Implementation2O<unknown, ReadonlyVec, Vec, Vec>>>{
    [Type.RECT]: ($: Rect, p: ReadonlyVec, out: Vec = []) =>
        div(null, sub(out, p, $.pos), $.size),
});

mapPoint.isa(Type.AABB, Type.RECT);
