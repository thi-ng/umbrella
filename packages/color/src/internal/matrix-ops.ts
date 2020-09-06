import { clamp01 } from "@thi.ng/math";
import { dotS3, dotS4, setC4 } from "@thi.ng/vectors";
import type { Color, ColorMatrix, ReadonlyColor } from "../api";
import { ensureAlpha } from "./ensure-alpha";

export const mulV33 = (
    out: Color | null,
    mat: number[],
    src: ReadonlyColor,
    clampOut = true
) => {
    const x = dotS3(mat, src, 0, 0, 3);
    const y = dotS3(mat, src, 1, 0, 3);
    const z = dotS3(mat, src, 2, 0, 3);
    const a = ensureAlpha(src[3]);
    return clampOut
        ? setC4(out || src, clamp01(x), clamp01(y), clamp01(z), a)
        : setC4(out || src, x, y, z, a);
};

export const mulV45 = (
    out: Color | null,
    mat: ColorMatrix,
    src: ReadonlyColor,
    clampOut = true
) => {
    out = setC4(out || src, src[0], src[1], src[2], ensureAlpha(src[3]));
    const x = dotS4(out, mat, 0, 0) + mat[4];
    const y = dotS4(out, mat, 0, 5) + mat[9];
    const z = dotS4(out, mat, 0, 10) + mat[14];
    const w = dotS4(out, mat, 0, 15) + mat[19];
    return clampOut
        ? setC4(out, clamp01(x), clamp01(y), clamp01(z), clamp01(w))
        : setC4(out, x, y, z, w);
};

export const mulM45 = (a: ColorMatrix, b: ColorMatrix): ColorMatrix => [
    dotS4(b, a, 0, 0, 1, 5),
    dotS4(b, a, 0, 1, 1, 5),
    dotS4(b, a, 0, 2, 1, 5),
    dotS4(b, a, 0, 3, 1, 5),
    dotS4(b, a, 0, 4, 1, 5) + b[4],
    dotS4(b, a, 5, 0, 1, 5),
    dotS4(b, a, 5, 1, 1, 5),
    dotS4(b, a, 5, 2, 1, 5),
    dotS4(b, a, 5, 3, 1, 5),
    dotS4(b, a, 5, 4, 1, 5) + b[9],
    dotS4(b, a, 10, 0, 1, 5),
    dotS4(b, a, 10, 1, 1, 5),
    dotS4(b, a, 10, 2, 1, 5),
    dotS4(b, a, 10, 3, 1, 5),
    dotS4(b, a, 10, 4, 1, 5) + b[14],
    dotS4(b, a, 15, 0, 1, 5),
    dotS4(b, a, 15, 1, 1, 5),
    dotS4(b, a, 15, 2, 1, 5),
    dotS4(b, a, 15, 3, 1, 5),
    dotS4(b, a, 15, 4, 1, 5) + b[19],
];
