import { mixN, set, Vec } from "@thi.ng/vectors3";
import { VecPair } from "../api";

export const splitLine =
    (a: Vec, b: Vec, t: number): [VecPair, VecPair] => {
        const p = mixN([], a, b, t);
        return [[a, p], [set([], p), b]];
    };
