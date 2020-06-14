import { mixN, set, Vec, VecPair } from "@thi.ng/vectors";

export const splitLine = (a: Vec, b: Vec, t: number): [VecPair, VecPair] => {
    const p = mixN([], a, b, t);
    return [
        [a, p],
        [set([], p), b],
    ];
};
