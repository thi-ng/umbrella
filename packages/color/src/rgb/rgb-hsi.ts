import { atan2Abs } from "@thi.ng/math/angle";
import { SQRT3, TAU, THIRD } from "@thi.ng/math/api";
import { setC3 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api";
import { clamp } from "../ops/clamp";

// https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma

const SQRT32 = SQRT3 / 2;

export const rgbHsi: ColorOp = (out, src) => {
    out = clamp(out || src, src);
    const { 0: r, 1: g, 2: b } = out;
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
