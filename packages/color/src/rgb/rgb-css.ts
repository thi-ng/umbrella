import type { ReadonlyColor } from "../api";
import { rgbSrgb } from "./rgb-srgb";
import { srgbCss } from "../srgb/srgb-css";

export const rgbCss = (src: ReadonlyColor) => srgbCss(rgbSrgb([], src));
