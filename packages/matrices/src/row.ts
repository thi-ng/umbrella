import { vop } from "@thi.ng/vectors/internal/vop";
import { setS2, setS3, setS4 } from "@thi.ng/vectors/sets";
import type { MultiVecOpMN } from "./api";

/**
 * Extracts row vector from given matrix and writes result to `out`. If
 * `out` is null, creates new vector.
 *
 * @param out -
 * @param mat -
 * @param column -
 */
export const row: MultiVecOpMN = vop(1);

export const row22 = row.add(4, (out, m, n) => setS2(out, m, 0, n, 1, 2));

export const row23 = row.add(6, (out, m, n) => setS3(out, m, 0, n, 1, 2));

export const row33 = row.add(9, (out, m, n) => setS3(out, m, 0, n, 1, 3));

export const row44 = row.add(16, (out, m, n) => setS4(out, m, 0, n, 1, 4));
