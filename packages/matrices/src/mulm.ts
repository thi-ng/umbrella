import { dotS2, dotS3, dotS4 } from "@thi.ng/vectors/dots";
import { setC, setC4, setC6 } from "@thi.ng/vectors/setc";
import { vop } from "@thi.ng/vectors/vop";
import type { MultiMatOpMM } from "./api";

/**
 * Multi-method. Performs matrix-matrix multiplication. If `out` is not
 * given, writes result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const mulM: MultiMatOpMM = vop(1);

/**
 * 2x2 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const mulM22 = mulM.add(4, (out, a, b) =>
    setC4(
        out || a,
        dotS2(a, b, 0, 0, 2),
        dotS2(a, b, 1, 0, 2),
        dotS2(a, b, 0, 2, 2),
        dotS2(a, b, 1, 2, 2)
    )
);

/**
 * 2x3 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const mulM23 = mulM.add(6, (out, a, b) =>
    setC6(
        out || a,
        dotS2(a, b, 0, 0, 2),
        dotS2(a, b, 1, 0, 2),
        dotS2(a, b, 0, 2, 2),
        dotS2(a, b, 1, 2, 2),
        dotS2(a, b, 0, 4, 2) + a[4],
        dotS2(a, b, 1, 4, 2) + a[5]
    )
);

/**
 * 3x3 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const mulM33 = mulM.add(9, (out, a, b) =>
    setC(
        out || a,
        dotS3(a, b, 0, 0, 3),
        dotS3(a, b, 1, 0, 3),
        dotS3(a, b, 2, 0, 3),
        dotS3(a, b, 0, 3, 3),
        dotS3(a, b, 1, 3, 3),
        dotS3(a, b, 2, 3, 3),
        dotS3(a, b, 0, 6, 3),
        dotS3(a, b, 1, 6, 3),
        dotS3(a, b, 2, 6, 3)
    )
);

/**
 * 4x4 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const mulM44 = mulM.add(16, (out, a, b) =>
    setC(
        out || a,
        dotS4(a, b, 0, 0, 4),
        dotS4(a, b, 1, 0, 4),
        dotS4(a, b, 2, 0, 4),
        dotS4(a, b, 3, 0, 4),
        dotS4(a, b, 0, 4, 4),
        dotS4(a, b, 1, 4, 4),
        dotS4(a, b, 2, 4, 4),
        dotS4(a, b, 3, 4, 4),
        dotS4(a, b, 0, 8, 4),
        dotS4(a, b, 1, 8, 4),
        dotS4(a, b, 2, 8, 4),
        dotS4(a, b, 3, 8, 4),
        dotS4(a, b, 0, 12, 4),
        dotS4(a, b, 1, 12, 4),
        dotS4(a, b, 2, 12, 4),
        dotS4(a, b, 3, 12, 4)
    )
);
