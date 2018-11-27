import { vop } from "@thi.ng/vectors3/internal/vop";
import { setS2, setS3, setS4 } from "@thi.ng/vectors3/sets";
import { MultiVecOpMN } from "./api";

export const row: MultiVecOpMN = vop(1);

export const row22 =
    row.add(4, (out, m, n) => setS2(out, m, 0, n, 1, 2));

export const row23 =
    row.add(6, (out, m, n) => setS3(out, m, 0, n, 1, 2));

export const row33 =
    row.add(9, (out, m, n) => setS3(out, m, 0, n, 1, 3));

export const row44 =
    row.add(16, (out, m, n) => setS4(out, m, 0, n, 1, 4));
