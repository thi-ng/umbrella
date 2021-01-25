import { dot3 } from "@thi.ng/vectors";
import type { ReadonlyColor } from "./api";
import { RGB_LUMINANCE } from "./constants";

export const luminanceRgb = (rgb: ReadonlyColor, weights = RGB_LUMINANCE) =>
    dot3(rgb, weights);

export const luminanceInt = (rgb: number) =>
    (((rgb >>> 16) & 0xff) * 76 +
        ((rgb >>> 8) & 0xff) * 150 +
        (rgb & 0xff) * 29) /
    0xfe01;
