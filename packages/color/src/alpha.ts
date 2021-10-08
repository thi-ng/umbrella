import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ReadonlyColor } from "./api";

export const alpha = (src: ReadonlyColor) =>
    src[3] !== undefined ? src[3] : 1;

export const setAlpha = (
    out: Color | null,
    src: ReadonlyColor,
    alpha: number
) => setC4(out || src, src[0], src[1], src[2], alpha);
