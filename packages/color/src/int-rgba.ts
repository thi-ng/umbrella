import type { IDeref } from "@thi.ng/api";
import type { Color } from "./api";
import { int24Srgba, int32Srgba } from "./int-srgba";
import { srgbaRgba } from "./srgba-rgba";

export const int32Rgba = (out: Color | null, src: number | IDeref<number>) =>
    srgbaRgba(null, int32Srgba(out, src));

export const int24Rgba = (out: Color | null, src: number | IDeref<number>) =>
    srgbaRgba(null, int24Srgba(out, src));
