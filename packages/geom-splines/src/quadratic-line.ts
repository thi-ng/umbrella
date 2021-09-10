import type { FnU2 } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addmN } from "@thi.ng/vectors/addmn";
import { set } from "@thi.ng/vectors/set";

export const quadraticFromLine: FnU2<ReadonlyVec, Vec[]> = (a, b) => [
    set([], a),
    addmN([], a, b, 0.5),
    set([], b),
];
