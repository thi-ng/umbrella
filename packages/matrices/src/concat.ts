import { Mat, MatOpMM, ReadonlyMat } from "./api";
import {
    mul22,
    mul23,
    mul33,
    mul44
} from "./mul";

const $ =
    (mul: MatOpMM) =>
        (out: Mat, a: ReadonlyMat, b: ReadonlyMat, ...xs: ReadonlyMat[]) =>
            xs.reduce(
                (acc: Mat, x) => mul(acc, acc, x),
                mul(out, a, b)
            );

export const concat22 = $(mul22);
export const concat23 = $(mul23);
export const concat33 = $(mul33);
export const concat44 = $(mul44);
