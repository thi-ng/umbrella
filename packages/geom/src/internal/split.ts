import type { Vec, VecPair } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";
import { set } from "@thi.ng/vectors/set";

export const splitLine = (a: Vec, b: Vec, t: number): [VecPair, VecPair] => {
    const p = mixN([], a, b, t);
    return [
        [a, p],
        [set([], p), b],
    ];
};
