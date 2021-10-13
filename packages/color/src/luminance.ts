import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { MaybeColor } from "./api.js";
import { rgb } from "./rgb/rgb.js";
import {
    luminanceAbgr32,
    luminanceArgb32,
    luminanceRgb,
    luminanceSrgb,
} from "./luminance-rgb.js";

/**
 * Multi-method to compute relative luminance from any supported input color
 * format.
 *
 * @remarks
 * For many color spaces, the luminance information is readily available and
 * will simply result in looking up the relevant channel value. For others,
 * unless a direct implementation is available, colors will first be converted
 * to linear RGB.
 */
export const luminance = defmulti<MaybeColor, number>(
    (col: any) => col.mode,
    { lch: "lab", oklab: "lab", ycc: "lab", xyy: "hcy" },
    {
        argb32: <any>luminanceArgb32,
        abgr32: <any>luminanceAbgr32,
        hcy: (x: any) => x[2],
        lab: (x: any) => x[0],
        rgb: <any>luminanceRgb,
        srgb: <any>luminanceSrgb,
        xyz: (x: any) => x[1],
        [DEFAULT]: (x: any) => luminanceRgb(rgb(x)),
    }
);
