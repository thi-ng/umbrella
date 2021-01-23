import type { ReadonlyColor } from "./api";
import { oklabRgba } from "./oklab-rgba";
import { rgbaCss } from "./rgba-css";

export const oklabCss = (src: ReadonlyColor) => rgbaCss(oklabRgba([], src));
