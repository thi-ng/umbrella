import type { TypedArray } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { FloatFormat, PackedFormat } from "./api";

/** @internal */
export const ensureSize = (
    pixels: TypedArray,
    width: number,
    height: number,
    stride = 1
) => assert(pixels.length >= width * height * stride, "pixel buffer too small");

/** @internal */
export const ensureChannel = (fmt: PackedFormat | FloatFormat, id: number) => {
    const chan = fmt.channels[id];
    assert(chan != null, `invalid channel ID: ${id}`);
    return chan;
};

/** @internal */
export const ensureSingleChannel = (fmt: PackedFormat | FloatFormat) =>
    assert(fmt.channels.length === 1, `require single channel buffer`);
