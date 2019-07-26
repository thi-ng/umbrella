import { Type } from "@thi.ng/api";
import {
    Lane,
    PackedChannelDef,
    PackedChannelSpec,
    PackedFormat,
    PackedFormatSpec
} from "./api";
import { compileFromABGR, compileToABGR } from "./codegen";
import { luminanceABGR } from "./utils";

const defChannel = (ch: PackedChannelSpec, shift: number): PackedChannelDef => {
    const mask = (1 << ch.size) - 1;
    const invMask = ~(mask << shift);
    return {
        size: ch.size,
        lane: ch.lane,
        abgrShift: 24 - ch.lane * 8 - shift,
        shift,
        get: ch.get || ((x) => (x >>> shift) & mask),
        set: ch.set || ((src, x) => (src & invMask) | ((x & mask) << shift))
    };
};

export const defPackedFormat = (fmt: PackedFormatSpec): PackedFormat => {
    const channels = fmt.channels.reduce(
        ([defs, shift], ch) => {
            shift -= ch.size;
            defs.push(defChannel(ch, shift));
            return <[PackedChannelDef[], number]>[defs, shift];
        },
        <[PackedChannelDef[], number]>[[], fmt.size]
    )[0];
    return {
        __compiled: true,
        type: fmt.type,
        size: fmt.size,
        alpha: fmt.alpha || 0,
        channels,
        fromABGR: fmt.fromABGR || compileFromABGR(channels),
        toABGR: fmt.toABGR || compileToABGR(channels, !!fmt.alpha)
    };
};

export const GRAY8 = defPackedFormat({
    type: Type.U8,
    size: 8,
    channels: [{ size: 8, lane: 0 }],
    fromABGR: (x) => luminanceABGR(x),
    toABGR: (x) => 0xff000000 | ((x & 0xff) * 0x010101)
});

export const GRAY_ALPHA88 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 8,
    channels: [{ size: 8, lane: Lane.ALPHA }, { size: 8, lane: Lane.RED }],
    fromABGR: (x) => luminanceABGR(x) | ((x >>> 16) & 0xff00),
    toABGR: (x) => ((x & 0xff00) << 16) | ((x & 0xff) * 0x010101)
});

export const RGB565 = defPackedFormat({
    type: Type.U16,
    size: 16,
    channels: [
        { size: 5, lane: Lane.RED },
        { size: 6, lane: Lane.GREEN },
        { size: 5, lane: Lane.BLUE }
    ]
});

export const ARGB1555 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 1,
    channels: [
        { size: 1, lane: Lane.ALPHA },
        { size: 5, lane: Lane.RED },
        { size: 5, lane: Lane.GREEN },
        { size: 5, lane: Lane.BLUE }
    ]
});

export const ARGB4444 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 4,
    channels: [
        { size: 4, lane: Lane.ALPHA },
        { size: 4, lane: Lane.RED },
        { size: 4, lane: Lane.GREEN },
        { size: 4, lane: Lane.BLUE }
    ]
});

export const RGB888 = defPackedFormat({
    type: Type.U32,
    size: 24,
    channels: [
        { size: 8, lane: Lane.RED },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.BLUE }
    ]
});

export const ARGB8888 = defPackedFormat({
    type: Type.U32,
    size: 32,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.RED },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.BLUE }
    ]
});

export const BGR888 = defPackedFormat({
    type: Type.U32,
    size: 24,
    channels: [
        { size: 8, lane: Lane.BLUE },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.RED }
    ],
    fromABGR: (x) => x & 0xffffff,
    toABGR: (x) => 0xff000000 | x
});

export const ABGR8888 = defPackedFormat({
    type: Type.U32,
    size: 32,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.BLUE },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.RED }
    ],
    fromABGR: (x) => x,
    toABGR: (x) => x
});
