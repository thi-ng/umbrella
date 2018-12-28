import { dotS3, dotS4 } from "@thi.ng/vectors3/dots";
import { Color, ReadonlyColor, ColorMatrix } from "../api";
import { clamp01 } from "@thi.ng/math/interval";
import { setC4 } from "@thi.ng/vectors3/setc";
import { ensureAlpha } from "./ensure-alpha";

export const mulV33 =
    (out: Color, mat: number[], src: ReadonlyColor, clampOut = true) => {
        const x = dotS3(mat, src, 0, 0, 3);
        const y = dotS3(mat, src, 1, 0, 3);
        const z = dotS3(mat, src, 2, 0, 3);
        const a = ensureAlpha(src[3]);
        return clampOut ?
            setC4(
                out || src,
                clamp01(x),
                clamp01(y),
                clamp01(z),
                a
            ) :
            setC4(out || src, x, y, z, a);
    };

export const mulV45 =
    (out: Color, mat: ColorMatrix, src: ReadonlyColor, clampOut = true) => {
        const x = dotS4(src, mat, 0, 0) + mat[4];
        const y = dotS4(src, mat, 0, 5) + mat[9];
        const z = dotS4(src, mat, 0, 10) + mat[14];
        const w = dotS4(src, mat, 0, 15) + mat[19];
        return clampOut ?
            setC4(
                out || src,
                clamp01(x),
                clamp01(y),
                clamp01(z),
                clamp01(w)
            ) :
            setC4(out || src, x, y, z, w);
    };
