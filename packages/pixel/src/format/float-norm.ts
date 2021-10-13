import { clamp } from "@thi.ng/math/interval";
import { FloatFormat, Lane } from "../api.js";

const from = (x: number) => x / 127.5 - 1;

const to = (x: number, shift: number) =>
    clamp(x * 127.5 + 128, 0, 255) << shift;

export const FLOAT_NORMAL: FloatFormat = {
    __float: true,
    alpha: false,
    gray: false,
    channels: [Lane.RED, Lane.GREEN, Lane.BLUE],
    shift: { 3: 0, 2: 8, 1: 16 },
    size: 3,
    fromABGR: (src) => [
        from(src & 0xff),
        from((src >> 8) & 0xff),
        from((src >> 16) & 0xff),
    ],
    toABGR: (src) =>
        to(src[0], 0) | to(src[1], 8) | to(src[2], 16) | 0xff000000,
};
