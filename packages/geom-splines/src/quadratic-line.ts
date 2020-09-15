import type { FnU2 } from "@thi.ng/api";
import { addmN, ReadonlyVec, set, Vec } from "@thi.ng/vectors";

export const quadraticFromLine: FnU2<ReadonlyVec, Vec[]> = (a, b) => [
    set([], a),
    addmN([], a, b, 0.5),
    set([], b),
];
