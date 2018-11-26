import { Mat, ReadonlyMat } from "./api";
import { mul } from "./mul";

export const concat =
    (out: Mat, a: ReadonlyMat, b: ReadonlyMat, ...xs: ReadonlyMat[]) =>
        xs.reduce(
            (acc: Mat, x) => mul(acc, acc, x),
            mul(out, a, b)
        );
