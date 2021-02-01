import type { Color } from "../api";
import { srgbRgb } from "../srgb/srgb-rgb";
import {
    intAbgr32Srgb,
    intArgb32Srgb,
    intBgr24Srgb,
    intRgb24Srgb,
} from "./int-srgb";

export const intArgb32Rgb = (out: Color | null, src: number) =>
    srgbRgb(null, intArgb32Srgb(out, src));

export const intRgb24Rgb = (out: Color | null, src: number) =>
    srgbRgb(null, intRgb24Srgb(out, src));

export const intAbgr32Rgb = (out: Color | null, src: number) =>
    srgbRgb(null, intAbgr32Srgb(out, src));

export const intBgr24Rgb = (out: Color | null, src: number) =>
    srgbRgb(null, intBgr24Srgb(out, src));
