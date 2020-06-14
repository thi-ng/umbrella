import { setS2, setS3, setS4, vop } from "@thi.ng/vectors";
import type { MultiVecOpM } from "./api";

/**
 * Extracts matrix diagonal into `out`.
 *
 * @param out -
 * @param mat -
 */
export const diag: MultiVecOpM = vop(1);

export const diag22 = diag.add(4, (out, m) => setS2(out, m, 0, 0, 1, 3));

export const diag23 = diag.add(6, diag22);

export const diag33 = diag.add(9, (out, m) => setS3(out, m, 0, 0, 1, 4));

export const diag44 = diag.add(16, (out, m) => setS4(out, m, 0, 0, 1, 5));
