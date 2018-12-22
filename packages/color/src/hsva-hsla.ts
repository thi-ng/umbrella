import { ReadonlyColor, Color } from "./api";
import { clamp } from "./clamp";

export const hsvaHsla =
    (out: Color, hsva: ReadonlyColor) => {
        out = clamp(out || hsva, hsva);
        let s = out[1];
        const v = out[2];
        const l = (2 - s) * v / 2;
        s = l && l < 1 ?
            s * v / (l < 0.5 ? l * 2 : 2 - l * 2) :
            s;
        out[1] = s;
        out[2] = l;
        return out;
    };