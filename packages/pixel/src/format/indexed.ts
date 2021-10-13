import type { NumericArray } from "@thi.ng/api";
import { swapLane13 } from "@thi.ng/binary/swizzle";
import { argminN } from "@thi.ng/distance/argmin";
import { assert } from "@thi.ng/errors/assert";
import { Lane } from "../api.js";
import { defPackedFormat } from "./packed-format.js";

/**
 * Creates an indexed color {@link PackedFormat} using the provided palette (in
 * {@link ARGB8888} or {@link ABGR8888} formats, max. 256 colors).
 *
 * @remarks
 * If `isABGR` is false (default), the palette colors are assumed to be in ARGB
 * order. When converting colors to indices, palette indices are chosen via the
 * minimum cartesian distance.
 *
 * @param palette
 * @param isABGR
 */
export const defIndexed = (palette: NumericArray, isABGR = false) => {
    const n = palette.length;
    assert(n > 0 && n <= 256, `invalid palette size: ${n}`);
    palette = isABGR ? palette : palette.map(swapLane13);
    return defPackedFormat({
        type: "u8",
        size: 8,
        channels: [{ size: 8, lane: Lane.RED }],
        fromABGR: (x) => argminN(x, palette, distBGR),
        toABGR: (x) => palette[x],
    });
};

const distBGR = (a: number, b: number) =>
    Math.hypot(
        ((a >> 16) & 0xff) - ((b >> 16) & 0xff),
        ((a >> 8) & 0xff) - ((b >> 8) & 0xff),
        (a & 0xff) - (b & 0xff)
    );
