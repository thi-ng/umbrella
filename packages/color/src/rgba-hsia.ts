import { atan2Abs, SQRT3, TAU, THIRD } from "@thi.ng/math";
import { setC3 } from "@thi.ng/vectors";
import { clamp } from "./clamp";
import type { ColorOp } from "./api";

// https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma

const SQRT32 = SQRT3 / 2;

export const rgbaHsia: ColorOp = (out, src) => {
    out = clamp(out || src, src);
    const r = out[0];
    const g = out[1];
    const b = out[2];
    const i = THIRD * (r + g + b);
    return i < 1e-6 || (r === g && r === b)
        ? setC3(out, 0, 0, i)
        : setC3(
              out,
              atan2Abs(SQRT32 * (g - b), 0.5 * (2 * r - g - b)) / TAU,
              1 - Math.min(r, g, b) / i,
              i
          );
};
