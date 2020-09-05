import { assert, FnN, FnN2, IObjectOf, NumericArray, Type } from "@thi.ng/api";
import { clamp01 } from "@thi.ng/math";
import {
    FloatFormat,
    FloatFormatSpec,
    Lane,
    PackedChannel,
    PackedChannelSpec,
    PackedFormat,
    PackedFormatSpec,
} from "./api";
import { compileFromABGR, compileToABGR } from "./codegen";
import { orderedDither } from "./dither";
import { luminanceABGR } from "./utils";

const defChannel = (
    ch: PackedChannelSpec,
    idx: number,
    shift: number
): PackedChannel => {
    const num = 1 << ch.size;
    const mask0 = num - 1;
    const maskA = (mask0 << shift) >>> 0;
    const invMask = ~maskA >>> 0;
    const lane = ch.lane != null ? ch.lane : idx;
    const int: FnN = (x) => (x >>> shift) & mask0;
    const setInt: FnN2 = (src, x) => (src & invMask) | ((x & mask0) << shift);
    return {
        size: ch.size,
        abgrShift: 24 - lane * 8 - shift,
        lane,
        shift,
        mask0,
        maskA,
        int,
        setInt,
        float: (x) => int(x) / mask0,
        setFloat: (src, x) => setInt(src, clamp01(x) * mask0),
        dither: (mat, steps, x, y, val) =>
            orderedDither(mat, steps, num, num, x, y, val),
    };
};

export const defPackedFormat = (fmt: PackedFormatSpec): PackedFormat => {
    assert(fmt.channels.length > 0, "no channel specs given");
    const channels = fmt.channels.reduce(
        ([defs, shift], ch, i) => {
            shift -= ch.size;
            defs.push(defChannel(ch, i, shift));
            return <[PackedChannel[], number]>[defs, shift];
        },
        <[PackedChannel[], number]>[[], fmt.size]
    )[0];
    return {
        __packed: true,
        type: fmt.type,
        size: fmt.size,
        alpha: fmt.alpha || 0,
        channels,
        fromABGR: fmt.fromABGR || compileFromABGR(channels),
        toABGR: fmt.toABGR || compileToABGR(channels, !!fmt.alpha),
    };
};

export const ALPHA8 = defPackedFormat({
    type: Type.U8,
    size: 8,
    alpha: 8,
    channels: [{ size: 8, lane: 0 }],
});

export const GRAY8 = defPackedFormat({
    type: Type.U8,
    size: 8,
    channels: [{ size: 8, lane: Lane.RED }],
    fromABGR: (x) => luminanceABGR(x),
    toABGR: (x) => (0xff000000 | ((x & 0xff) * 0x010101)) >>> 0,
});

export const GRAY_ALPHA8 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.RED },
    ],
    fromABGR: (x) => luminanceABGR(x) | ((x >>> 16) & 0xff00),
    toABGR: (x) => (((x & 0xff00) << 16) | ((x & 0xff) * 0x010101)) >>> 0,
});

export const GRAY16 = defPackedFormat({
    type: Type.U16,
    size: 16,
    channels: [{ size: 16, lane: Lane.RED }],
    fromABGR: (x) => ((luminanceABGR(x) + 0.5) | 0) * 0x0101,
    toABGR: (x) => (0xff000000 | ((x >>> 8) * 0x010101)) >>> 0,
});

export const GRAY_ALPHA16 = defPackedFormat({
    type: Type.U32,
    size: 32,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 16, lane: Lane.RED },
    ],
    fromABGR: (x) =>
        (((luminanceABGR(x) + 0.5) | 0) * 0x0101) |
        (((x >>> 8) & 0xff0000) * 0x0101),
    toABGR: (x) => ((x & 0xff000000) | (((x >>> 8) & 0xff) * 0x010101)) >>> 0,
});

export const RGB565 = defPackedFormat({
    type: Type.U16,
    size: 16,
    channels: [
        { size: 5, lane: Lane.RED },
        { size: 6, lane: Lane.GREEN },
        { size: 5, lane: Lane.BLUE },
    ],
});

export const ARGB1555 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 1,
    channels: [
        { size: 1, lane: Lane.ALPHA },
        { size: 5, lane: Lane.RED },
        { size: 5, lane: Lane.GREEN },
        { size: 5, lane: Lane.BLUE },
    ],
});

export const ARGB4444 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 4,
    channels: [
        { size: 4, lane: Lane.ALPHA },
        { size: 4, lane: Lane.RED },
        { size: 4, lane: Lane.GREEN },
        { size: 4, lane: Lane.BLUE },
    ],
});

export const RGB888 = defPackedFormat({
    type: Type.U32,
    size: 24,
    channels: [
        { size: 8, lane: Lane.RED },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.BLUE },
    ],
});

export const ARGB8888 = defPackedFormat({
    type: Type.U32,
    size: 32,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.RED },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.BLUE },
    ],
});

export const BGR888 = defPackedFormat({
    type: Type.U32,
    size: 24,
    channels: [
        { size: 8, lane: Lane.BLUE },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.RED },
    ],
    fromABGR: (x) => x & 0xffffff,
    toABGR: (x) => 0xff000000 | x,
});

export const ABGR8888 = defPackedFormat({
    type: Type.U32,
    size: 32,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.BLUE },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.RED },
    ],
    fromABGR: (x) => x,
    toABGR: (x) => x,
});

export const defFloatFormat = (fmt: FloatFormatSpec) => {
    const chan = fmt.channels;
    const chanShift = chan.reduce(
        (acc, ch) => ((acc[ch] = (3 - ch) << 3), acc),
        <IObjectOf<number>>{}
    );
    const res = <FloatFormat>{
        ...fmt,
        size: chan.length,
        shift: chanShift,
        __float: true,
    };
    const to = (col: NumericArray, i: number) =>
        ((col[i] * 0xff + 0.5) | 0) << chanShift[chan[i]];
    const from: FnN2 = (col, i) => ((col >>> chanShift[chan[i]]) & 0xff) / 0xff;
    switch (chan.length) {
        case 1:
            if (fmt.gray) {
                res.toABGR = (col) =>
                    ((((col[0] * 0xff + 0.5) | 0) * 0x010101) | 0xff000000) >>>
                    0;
                res.fromABGR = (col, out = []) => (
                    (out[0] = luminanceABGR(col) / 0xff), out
                );
            } else {
                res.toABGR = (col) => {
                    let out = fmt.alpha ? 0 : 0xff000000;
                    out |= to(col, 0);
                    return out >>> 0;
                };
                res.fromABGR = (col, out = []) => {
                    out[0] = from(col, 0);
                    return out;
                };
            }
            break;
        case 2:
            if (fmt.gray) {
                const gray = ~~(chan[0] === Lane.ALPHA);
                const alpha = gray ^ 1;
                res.toABGR = (col) => {
                    let out = ((col[gray] * 0xff + 0.5) | 0) * 0x010101;
                    out |= ((col[alpha] * 0xff + 0.5) | 0) << 24;
                    return out >>> 0;
                };
                res.fromABGR = (col, out = []) => {
                    out[gray] = luminanceABGR(col) / 0xff;
                    out[alpha] = from(col, alpha);
                    return out;
                };
            } else {
                res.toABGR = (col) => {
                    let out = fmt.alpha ? 0 : 0xff000000;
                    out |= to(col, 0);
                    out |= to(col, 1);
                    return out >>> 0;
                };
                res.fromABGR = (col, out = []) => {
                    out[0] = from(col, 0);
                    out[1] = from(col, 1);
                    return out;
                };
            }
            break;
        case 3:
            res.toABGR = (col) => {
                let out = fmt.alpha ? 0 : 0xff000000;
                out |= to(col, 0);
                out |= to(col, 1);
                out |= to(col, 2);
                return out >>> 0;
            };
            res.fromABGR = (col, out = []) => {
                out[0] = from(col, 0);
                out[1] = from(col, 1);
                out[2] = from(col, 2);
                return out;
            };
            break;
        case 4:
            res.toABGR = (col) => {
                let out = fmt.alpha ? 0 : 0xff000000;
                out |= to(col, 0);
                out |= to(col, 1);
                out |= to(col, 2);
                out |= to(col, 3);
                return out >>> 0;
            };
            res.fromABGR = (col, out = []) => {
                out[0] = from(col, 0);
                out[1] = from(col, 1);
                out[2] = from(col, 2);
                out[3] = from(col, 3);
                return out;
            };
            break;
    }
    return res;
};

export const FLOAT_GRAY = defFloatFormat({
    gray: true,
    channels: [Lane.RED],
});

export const FLOAT_GRAY_ALPHA = defFloatFormat({
    gray: true,
    alpha: true,
    channels: [Lane.RED, Lane.ALPHA],
});

export const FLOAT_RGB = defFloatFormat({
    channels: [Lane.RED, Lane.GREEN, Lane.BLUE],
});

export const FLOAT_RGBA = defFloatFormat({
    alpha: true,
    channels: [Lane.RED, Lane.GREEN, Lane.BLUE, Lane.ALPHA],
});
