import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { AABB } from "./api/aabb";
import { Rect } from "./api/rect";
import { __unionBounds } from "./internal/bounds";
import { __dispatch } from "./internal/dispatch";

export const union: MultiFn2<IShape, IShape, IShape[]> = defmulti<
    any,
    any,
    IShape[]
>(
    __dispatch,
    {},
    {
        aabb: (a: AABB, b: AABB) => [
            new AABB(...__unionBounds(a.pos, a.size, b.pos, b.size)),
        ],

        rect: (a: Rect, b: Rect) => [
            new Rect(...__unionBounds(a.pos, a.size, b.pos, b.size)),
        ],
    }
);
