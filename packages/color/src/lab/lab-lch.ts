import { atan2Abs } from "@thi.ng/math/angle";
import { INV_TAU, TAU } from "@thi.ng/math/api";
import { setC4 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api";
import { ensureAlpha } from "../internal/ensure-alpha";

export const labLch: ColorOp = (out, src) => {
    const { 1: a, 2: b } = src;
    return setC4(
        out || src,
        src[0],
        Math.hypot(a, b),
        a === 0 && b === 0 ? 0 : atan2Abs(b, a) * INV_TAU,
        ensureAlpha(src[3])
    );
};

export const lchLab: ColorOp = (out, src) => {
    let { 1: c, 2: h } = src;
    h *= TAU;
    const a = ensureAlpha(src[3]);
    return c > 0
        ? setC4(out || src, src[0], Math.cos(h) * c, Math.sin(h) * c, a)
        : setC4(out || src, src[0], 0, 0, a);
};
