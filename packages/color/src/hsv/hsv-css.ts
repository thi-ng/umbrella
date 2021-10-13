import type { ReadonlyColor } from "../api.js";
import { hslCss } from "../hsl/hsl-css.js";
import { hsvHsl } from "./hsv-hsl.js";

export const hsvCss = (src: ReadonlyColor) => hslCss(hsvHsl([], src));
