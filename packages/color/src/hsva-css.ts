import { hslaCss } from "./hsla-css";
import { hsvaHsla } from "./hsva-hsla";
import type { ReadonlyColor } from "./api";

export const hsvaCss = (src: ReadonlyColor) => hslaCss(hsvaHsla([], src));
