import { isString } from "@thi.ng/checks";
import type {
    Color,
    ColorFactory,
    ColorMode,
    TypedColor,
    ParsedColor,
} from "./api";
import { hcy } from "./hcy/hcy";
import { hsi } from "./hsi/hsi";
import { hsl } from "./hsl/hsl";
import { hsv } from "./hsv/hsv";
import { lab } from "./lab/lab";
import { lch } from "./lch/lch";
import { oklab } from "./oklab/oklab";
import { rgb } from "./rgb/rgb";
import { srgb } from "./srgb/srgb";
import { xyy } from "./xyy/xyy";
import { xyz } from "./xyz/xyz";
import { ycc } from "./ycc/ycc";

const FACTORIES: Record<ColorMode, ColorFactory<any>> = {
    hcy,
    hsi,
    hsl: hsl,
    hsv: hsv,
    lab,
    lch,
    oklab,
    rgb,
    srgb,
    xyy,
    xyz,
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
    if (isString(src)) {
        return FACTORIES[<ColorMode>src](buf, idx, stride);
    }
    if (buf) {
        const res = FACTORIES[(<ParsedColor>src).mode](buf, idx, stride);
        res.set(src.deref());
        return res;
    }
    return FACTORIES[(<ParsedColor>src).mode](src.deref());
}
