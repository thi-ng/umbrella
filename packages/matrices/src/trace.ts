import { sum } from "@thi.ng/vectors";
import type { ReadonlyMat } from "./api";
import { diag } from "./diag";

/**
 * Returns matrix trace of `m`, i.e. component sum of `diag(m)`.
 *
 * @param m -
 */
export const trace = (m: ReadonlyMat) => sum(diag([], m));
