import { setC4 } from "@thi.ng/vectors";
import { atan2Abs, cossin, INV_TAU, TAU } from "@thi.ng/math";
import type { ColorOp } from "../api";
import { ensureAlpha } from "../internal/ensure-alpha";

export const labLch: ColorOp = (out, src) =>
    setC4(
        out || src,
        src[0],
        Math.hypot(src[1], src[2]),
        atan2Abs(src[2], src[1]) * INV_TAU,
        ensureAlpha(src[3])
    );

export const lchLab: ColorOp = (out, src) =>
    setC4(
        out || src,
        src[0],
        ...(<[number, number]>(
            (src[1] > 0 ? cossin(src[2] * TAU, src[1]) : [0, 0])
        )),
        ensureAlpha(src[3])
    );
