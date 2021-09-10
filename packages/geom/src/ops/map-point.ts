import type { IObjectOf } from "@thi.ng/api";
import type { Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { div } from "@thi.ng/vectors/div";
import { sub } from "@thi.ng/vectors/sub";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";

export const mapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(
    <any>dispatch
);

mapPoint.addAll(<IObjectOf<Implementation2O<unknown, ReadonlyVec, Vec, Vec>>>{
    rect: ($: Rect, p: ReadonlyVec, out: Vec = []) =>
        div(null, sub(out, p, $.pos), $.size),
});

mapPoint.isa("aabb", "rect");
