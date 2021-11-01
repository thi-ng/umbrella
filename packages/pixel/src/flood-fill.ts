import { assert } from "@thi.ng/errors/assert";
import { floodFill } from "@thi.ng/grid-iterators/flood-fill";
import type { PackedBuffer } from "./packed.js";

/**
 * Fills pixel in the connected region around `x,y` with given color. Returns
 * pixel buffer.
 *
 * @param img
 * @param x
 * @param y
 * @param col
 */
export const floodFillSolid = (
    img: PackedBuffer,
    x: number,
    y: number,
    col: number
) => {
    const { pixels, width, height } = img;
    const src = img.getAt(x, y);
    for (let [xx, yy] of floodFill(
        (i) => pixels[i] === src,
        x,
        y,
        width,
        height
    )) {
        pixels[yy * width + xx] = col;
    }
    return img;
};

/**
 * Fills pixel in the connected region around `x,y` with the pattern defined by
 * given `pattern` image (must be in same format as `img`). Returns updated
 * pixel buffer.
 *
 * @param img
 * @param x
 * @param y
 * @param pattern
 */
export const floodFillPattern = (
    img: PackedBuffer,
    x: number,
    y: number,
    pattern: PackedBuffer
) => {
    assert(img.format === pattern.format, "pattern must have same format");
    const { pixels: dest, width, height } = img;
    const { pixels: src, width: sw, height: sh } = pattern;
    const srcCol = img.getAt(x, y);
    for (let [xx, yy] of floodFill(
        (i) => dest[i] === srcCol,
        x,
        y,
        width,
        height
    )) {
        dest[yy * width + xx] = src[(yy % sh) * sw + (xx % sw)];
    }
    return img;
};
