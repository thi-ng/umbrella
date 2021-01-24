import type { ReadonlyColor } from "./api";
import { rgbaSrgba } from "./rgba-srgba";
import { srgbaCss } from "./srgba-css";

export const rgbaCss = (src: ReadonlyColor) => srgbaCss(rgbaSrgba([], src));
