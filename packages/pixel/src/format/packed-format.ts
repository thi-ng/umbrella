import type { FnN, FnN2 } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { clamp01 } from "@thi.ng/math/interval";
import type {
    PackedChannel,
    PackedChannelSpec,
    PackedFormat,
    PackedFormatSpec,
} from "../api.js";
import { __compileFromABGR, __compileToABGR } from "../internal/codegen.js";

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
        num,
        abgrShift: 24 - lane * 8 - shift,
        lane,
        shift,
        mask0,
        maskA,
        int,
        setInt,
        float: (x) => int(x) / mask0,
        setFloat: (src, x) => setInt(src, clamp01(x) * mask0),
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
        fromABGR: fmt.fromABGR || __compileFromABGR(channels),
        toABGR: fmt.toABGR || __compileToABGR(channels, !!fmt.alpha),
    };
};
