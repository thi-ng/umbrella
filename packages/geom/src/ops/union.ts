import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { AABB } from "../api/aabb";
import { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import { unionBounds } from "../internal/union-bounds";

export const union: MultiFn2<IShape, IShape, IShape[]> = defmulti<
    any,
    any,
    IShape[]
>(
    dispatch,
    {},
    {
        aabb: (a: AABB, b: AABB) => [
            new AABB(...unionBounds(a.pos, a.size, b.pos, b.size)),
        ],

        rect: (a: Rect, b: Rect) => [
            new Rect(...unionBounds(a.pos, a.size, b.pos, b.size)),
        ],
    }
);
