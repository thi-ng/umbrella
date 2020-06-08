import { addmN, ReadonlyVec, set } from "@thi.ng/vectors";

export const quadraticFromLine = (a: ReadonlyVec, b: ReadonlyVec) => [
    set([], a),
    addmN([], a, b, 0.5),
    set([], b),
];
