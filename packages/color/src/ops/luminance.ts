import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT } from "@thi.ng/defmulti/constants";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { MaybeColor } from "../api";
import { rgb } from "../rgb/rgb";
import {
    luminanceAbgr32,
    luminanceArgb32,
    luminanceRgb,
    luminanceSrgb,
} from "./luminance-rgb";

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
export const luminance: MultiFn1<MaybeColor, number> = defmulti(
    (col: any) => col.mode
);

luminance.addAll({
    argb32: <any>luminanceArgb32,
    abgr32: <any>luminanceAbgr32,
    hcy: (x: any) => x[2],
    lab: (x: any) => x[0],
    rgb: <any>luminanceRgb,
    srgb: <any>luminanceSrgb,
    xyz: (x: any) => x[1],
});

luminance.isa("lch", "lab");
luminance.isa("oklab", "lab");
luminance.isa("ycc", "lab");
luminance.isa("xyy", "hcy");

luminance.add(DEFAULT, (x: any) => luminanceRgb(rgb(x)));
