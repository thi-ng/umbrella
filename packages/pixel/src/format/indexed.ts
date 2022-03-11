import type { NumericArray, UintType } from "@thi.ng/api";
import { swapLane13 } from "@thi.ng/binary/swizzle";
import { argminN } from "@thi.ng/distance/argmin";
import { assert } from "@thi.ng/errors/assert";
import { Lane } from "../api.js";
import { defIntFormat } from "./int-format.js";

const __defIndexed =
    (type: UintType, size: number) =>
    (palette: NumericArray, isABGR = false) => {
        const n = palette.length;
        assert(n > 0 && n <= 2 ** size, `invalid palette size: ${n}`);
        palette = isABGR ? palette : palette.map(swapLane13);
        return defIntFormat({
            type,
            size,
            channels: [{ size, lane: Lane.RED }],
            fromABGR: (x) => argminN(x, palette, distBGR),
            toABGR: (x) => palette[x],
        });
    };

/**
 * Creates an indexed color {@link IntFormat} using the provided palette (in
 * {@link ARGB8888} or {@link ABGR8888} formats, max. 256 colors).
 *
 * @remarks
 * If `isABGR` is false (default), the palette colors are assumed to be in ARGB
 * order. When converting colors to indices, palette indices are chosen via the
 * minimum cartesian distance.
 *
 * @param palette - 
 * @param isABGR - 
 */
export const defIndexed8 = __defIndexed("u8", 8);

/**
 * Similar to {@link defIndexed8}, but for 16bit palette sizes and pixel buffers.
 */
export const defIndexed16 = __defIndexed("u16", 16);

/**
 * Similar to {@link defIndexed8}, but for 32bit palette sizes and pixel buffers.
 */
export const defIndexed32 = __defIndexed("u32", 32);

/**
 * Similar to {@link defIndexed8}, but dynamically decides about pixel buffer
 * bit depth based on size of given palette.
 *
 * @param palette - 
 * @param isABGR - 
 */
export const defIndexed = (palette: NumericArray, isABGR = false) =>
    palette.length <= 0x100
        ? defIndexed8(palette, isABGR)
        : palette.length < 0x10000
        ? defIndexed16(palette, isABGR)
        : defIndexed32(palette, isABGR);

const distBGR = (a: number, b: number) =>
    Math.hypot(
        ((a >> 16) & 0xff) - ((b >> 16) & 0xff),
        ((a >> 8) & 0xff) - ((b >> 8) & 0xff),
        (a & 0xff) - (b & 0xff)
    );
