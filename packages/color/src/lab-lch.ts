import { setC4 } from "@thi.ng/vectors";
import { cossin } from "@thi.ng/math";
import type { ColorOp } from "./api";
import { ensureAlpha } from "./internal/ensure-alpha";

export const labLch: ColorOp = (out, src) =>
    setC4(
        out || src,
        src[0],
        Math.hypot(src[1], src[2]),
        Math.atan2(src[2], src[1]),
        ensureAlpha(src[3])
    );

export const lchLab: ColorOp = (out, src) =>
    setC4(
        out || src,
        src[0],
        ...(<[number, number]>cossin(src[2], src[1])),
        ensureAlpha(src[3])
    );
