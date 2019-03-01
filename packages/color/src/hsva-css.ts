import { ReadonlyColor } from "./api";
import { hsvaHsla } from "./hsva-hsla";
import { hslaCss } from "./hsla-css";

export const hsvaCss = (src: ReadonlyColor) => hslaCss(hsvaHsla([], src));
