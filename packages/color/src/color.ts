import { isString } from "@thi.ng/checks/is-string";
import type {
    Color,
    ColorFactory,
    ColorMode,
    ParsedColor,
    TypedColor,
} from "./api";
import { hcy } from "./hcy/hcy";
import { hsi } from "./hsi/hsi";
import { hsl } from "./hsl/hsl";
import { hsv } from "./hsv/hsv";
import { argb32, abgr32 } from "./int/int";
import { labD50 } from "./lab/lab50";
import { labD65 } from "./lab/lab65";
import { lch } from "./lch/lch";
import { oklab } from "./oklab/oklab";
import { rgb } from "./rgb/rgb";
import { srgb } from "./srgb/srgb";
import { xyy } from "./xyy/xyy";
import { xyzD50 } from "./xyz/xyz50";
import { xyzD65 } from "./xyz/xyz65";
import { ycc } from "./ycc/ycc";

const FACTORIES: Record<ColorMode, ColorFactory<any>> = {
    argb32,
    abgr32,
    hcy,
    hsi,
    hsl,
    hsv,
    lab50: labD50,
    lab65: labD65,
    lch,
    oklab,
    rgb,
    srgb,
    xyy,
    xyz50: xyzD50,
    xyz65: xyzD65,
    ycc,
};

export function color(
    src: ParsedColor,
    buf?: Color,
    idx?: number,
    stride?: number
): TypedColor<any>;
export function color(
    mode: ColorMode,
    buf: Color,
    idx?: number,
    stride?: number
): TypedColor<any>;
export function color(
    src: any,
    buf?: any,
    idx?: number,
    stride?: number
): TypedColor<any> {
    if (isString(src)) return FACTORIES[<ColorMode>src](buf, idx, stride);
    if (buf) {
        const res = FACTORIES[(<ParsedColor>src).mode](buf, idx, stride);
        res.set(src.deref());
        return res;
    }
    return FACTORIES[(<ParsedColor>src).mode](src.deref());
}
