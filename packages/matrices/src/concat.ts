import { Mat, ReadonlyMat } from "./api";
import { mulM } from "./mulM";

export const concat =
    (out: Mat, a: ReadonlyMat, b: ReadonlyMat, ...xs: ReadonlyMat[]) =>
        xs.reduce(
            (acc: Mat, x) => mulM(acc, acc, x),
            mulM(out, a, b)
        );
