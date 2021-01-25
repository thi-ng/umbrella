import type { IDeref } from "@thi.ng/api";
import type { Color } from "./api";
import { int24Srgb, int32Srgb } from "./int-srgb";
import { srgbRgb } from "./srgb-rgb";

export const int32Rgb = (out: Color | null, src: number | IDeref<number>) =>
    srgbRgb(null, int32Srgb(out, src));

export const int24Rgb = (out: Color | null, src: number | IDeref<number>) =>
    srgbRgb(null, int24Srgb(out, src));
