import { setC4 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";

export const alpha =
    (src: ReadonlyColor) =>
        src[3] !== undefined ? src[3] : 1;

export const setAlpha =
    (out: Color, src: ReadonlyColor, alpha: number) =>
        setC4(
            out || src,
            src[0],
            src[1],
            src[2],
            alpha
        );
