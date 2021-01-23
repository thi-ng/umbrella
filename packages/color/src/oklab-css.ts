import type { ReadonlyColor } from "./api";
import { oklabRgba } from "./oklab-rgba";
import { rgbaCss } from "./rgba-css";
import { rgbaSrgba } from "./srgba";

export const oklabCss = (src: ReadonlyColor) =>
    rgbaCss(rgbaSrgba(null, oklabRgba([], src)));
