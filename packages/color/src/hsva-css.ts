import type { ReadonlyColor } from "./api";
import { hslaCss } from "./hsla-css";
import { hsvaHsla } from "./hsva-hsla";

export const hsvaCss = (src: ReadonlyColor) => hslaCss(hsvaHsla([], src));
