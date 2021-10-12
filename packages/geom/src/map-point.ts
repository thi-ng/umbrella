import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { div } from "@thi.ng/vectors/div";
import { sub } from "@thi.ng/vectors/sub";
import type { Rect } from "./api/rect";
import { __dispatch } from "./internal/dispatch";

export const mapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti<
    any,
    ReadonlyVec,
    Vec | undefined,
    Vec
>(
    __dispatch,
    { aabb: "rect" },
    {
        rect: ($: Rect, p: ReadonlyVec, out: Vec = []) =>
            div(null, sub(out, p, $.pos), $.size),
    }
);
