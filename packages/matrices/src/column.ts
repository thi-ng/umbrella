import { vop } from "@thi.ng/vectors/internal/vop";
import { setS2, setS3, setS4 } from "@thi.ng/vectors/sets";
import type { MultiVecOpMN, VecOpMN } from "./api";

/**
 * Extracts column vector from given matrix and writes result to `out`.
 * If `out` is null, creates new vector.
 *
 * @param out -
 * @param mat -
 * @param column -
 */
export const column: MultiVecOpMN = vop(1);

export const column22: VecOpMN = column.add(4, (out, m, n) =>
    setS2(out, m, 0, n * 2)
);

export const column23: VecOpMN = column.add(6, column22);

export const column33: VecOpMN = column.add(9, (out, m, n) =>
    setS3(out, m, 0, n * 3)
);

export const column44: VecOpMN = column.add(16, (out, m, n) =>
    setS4(out, m, 0, n * 4)
);
