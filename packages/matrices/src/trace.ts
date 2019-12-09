import { sum } from "@thi.ng/vectors";
import { diag } from "./diag";
import { ReadonlyMat } from "./api";

/**
 * Returns matrix trace of `m`, i.e. component sum of `diag(m)`.
 *
 * @param m -
 */
export const trace = (m: ReadonlyMat) => sum(diag([], m));
