import { DEFAULT, defmulti, MultiFn1 } from "@thi.ng/defmulti";
import type { MaybeColor } from "../api";
import { rgb } from "../rgb/rgb";
import { luminanceRgb, luminanceSrgb } from "./luminance-rgb";

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
    hcy: (x: any) => x[2],
    lab: (x: any) => x[0],
    rgb: (x: any) => luminanceRgb(x),
    srgb: (x: any) => luminanceSrgb(x),
    xyz: (x: any) => x[1],
});

luminance.isa("lch", "lab");
luminance.isa("oklab", "lab");
luminance.isa("ycc", "lab");
luminance.isa("xyy", "hcy");

luminance.add(DEFAULT, (x: any) => luminanceRgb(rgb(x)));
