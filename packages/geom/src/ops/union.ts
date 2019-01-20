import { defmulti } from "@thi.ng/defmulti";
import { dispatch } from "../internal/dispatch";
import { IShape, Type, Rect, AABB } from "../api";
import { unionBounds } from "../internal/union-bounds";

export const union = defmulti<IShape, IShape, IShape[]>(dispatch);

union.addAll({

    [Type.AABB]:
        (a: AABB, b: AABB) =>
            [new AABB(...unionBounds(a.pos, a.size, b.pos, b.size))],

    [Type.RECT]:
        (a: Rect, b: Rect) =>
            [new Rect(...unionBounds(a.pos, a.size, b.pos, b.size))],

});
