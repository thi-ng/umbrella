import type { ReadonlyColor } from "./api";
import { rgbSrgb } from "./rgb-srgb";
import { srgbCss } from "./srgb-css";

export const rgbCss = (src: ReadonlyColor) => srgbCss(rgbSrgb([], src));
