import { sum } from "@thi.ng/vectors/sum";
import type { ReadonlyMat } from "./api.js";
import { diag } from "./diag.js";

/**
 * Returns matrix trace of `m`, i.e. component sum of `diag(m)`.
 *
 * @param m -
 */
export const trace = (m: ReadonlyMat) => sum(diag([], m));
