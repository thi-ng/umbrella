import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { AABB } from "../api/aabb";
import { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import { unionBounds } from "../internal/union-bounds";

export const union = defmulti<IShape, IShape, IShape[]>(dispatch);

union.addAll(<IObjectOf<Implementation2<unknown, unknown, IShape[]>>>{
    aabb: (a: AABB, b: AABB) => [
        new AABB(...unionBounds(a.pos, a.size, b.pos, b.size)),
    ],

    rect: (a: Rect, b: Rect) => [
        new Rect(...unionBounds(a.pos, a.size, b.pos, b.size)),
    ],
});
