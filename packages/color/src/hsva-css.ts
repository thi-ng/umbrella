import { ReadonlyColor } from "./api";
import { hsvaHsla } from "./hsva-hsla";
import { hslaCss } from "./hsla-css";

export const hsvaCss =
    (hsva: ReadonlyColor) =>
        hslaCss(hsvaHsla([], hsva));
