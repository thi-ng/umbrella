import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

export type SDFn = Fn<ReadonlyVec, number>;

export type SDFCombineOp = "union" | "isec" | "diff";

export interface SDFAttribs {
    combine: SDFCombineOp;
    smooth: number;
    flip: boolean;
    abs: boolean;
    round: number;
}
