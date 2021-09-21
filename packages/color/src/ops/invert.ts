import { ONE3 } from "@thi.ng/vectors/api";
import { sub3 } from "@thi.ng/vectors/sub";
import type { ColorOp } from "../api";
import { clamp } from "./clamp";

/**
 * Inverts the RGB channels of an RGBA color.
 *
 * @param out - result
 * @param src - source color
 */
export const invertRgb: ColorOp = (out, src) => (
    (out = clamp(out || src, src)), sub3(out, ONE3, out)
);

/**
 * Inverts the lowest 24 bits of an ARGB int. Does not modify alpha.
 *
 * @param src - packed RGB int
 */
export const invertInt = (src: number) => src ^ 0xffffff;
