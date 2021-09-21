import type { Fn } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { clamp, clamp01 } from "@thi.ng/math/interval";
import { ABGR8888 } from "@thi.ng/pixel/format/abgr8888";
import { PackedBuffer } from "@thi.ng/pixel/packed";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

const rgba2bgra = (rgba: ReadonlyVec) =>
    ((clamp01(rgba[0]) * 255.5) << 0) |
    ((clamp01(rgba[1]) * 255.5) << 8) |
    ((clamp01(rgba[2]) * 255.5) << 16) |
    ((clamp01(rgba[3]) * 255.5) << 24);

const clampCoord = (x: number, maxW: number, w?: number) =>
    w !== undefined ? Math.min(x + w, maxW) : maxW;

/**
 * Low-level function used by {@link canvasRenderer} and
 * {@link renderBuffer}. Applies shader function `fn` to each pixel in
 * the given region of the `u32` raw ABGR buffer (a `Uint32Array`). The
 * region is defined by the top-left `x`, `y` coords and `w`, `h`
 * dimensions. The remaining parameters `bufW`, `bufH`, `bufOffsetX`,
 * `bufOffsetY` and `imgH` are used to define the actual location of the
 * given buffer in the full image to be computed and to support use
 * cases where the target array only defines a sub-region of the full
 * image (e.g. when splitting rendering over multiple workers, each with
 * their own buffer).
 *
 * @param fn -
 * @param u32 -
 * @param bufW -
 * @param bufH -
 * @param x -
 * @param y -
 * @param w -
 * @param h -
 * @param bufOffsetX -
 * @param bufOffsetY -
 * @param imgH -
 */
export const renderPixels = (
    fn: Fn<ReadonlyVec, Vec>,
    u32: Uint32Array,
    bufW: number,
    bufH: number,
    x: number,
    y: number,
    w?: number,
    h?: number,
    bufOffsetX = 0,
    bufOffsetY = 0,
    imgH = bufH
) => {
    const frag = [];
    x = clamp(x, 0, bufW);
    y = clamp(y, 0, bufH);
    const x2 = clampCoord(x, bufW, w);
    const y2 = clampCoord(y, bufH, h);
    for (let yy = y; yy < y2; yy++) {
        frag[1] = imgH - 1 - yy - bufOffsetY;
        let i = yy * bufW + x;
        for (let xx = x; xx < x2; xx++) {
            frag[0] = xx + bufOffsetX;
            u32[i++] = rgba2bgra(fn(frag));
        }
    }
    return u32;
};

/**
 * Takes a {@link @thi.ng/pixel#PackedBuffer} pixel buffer from
 * thi.ng/pixel w/ {@link @thi.ng/pixel#ABGR8888} format, an optional
 * buffer local region defined by `x`, `y`, `w`, `h` and applies shader
 * function `fn` to each pixel in that region (or full buffer by
 * default).
 *
 * In case the buffer only defines a sub-region of a larger image,
 * `bufOffsetX`, `bufOffsetY` and `imgH` can be given to configure the
 * location and full image height.
 *
 * @param fn -
 * @param buf -
 * @param x -
 * @param y -
 * @param w -
 * @param h -
 * @param bufOffsetX -
 * @param bufOffsetY -
 * @param imgH -
 */
export const renderBuffer = (
    fn: Fn<ReadonlyVec, Vec>,
    buf: PackedBuffer,
    x = 0,
    y = 0,
    w?: number,
    h?: number,
    bufOffsetX = 0,
    bufOffsetY = 0,
    imgH = buf.height
) => {
    assert(buf.format === ABGR8888, `invalid buffer pixel format`);
    renderPixels(
        fn,
        <Uint32Array>buf.pixels,
        buf.width,
        buf.height,
        x,
        y,
        w,
        h,
        bufOffsetX,
        bufOffsetY,
        imgH
    );
    return buf;
};

/**
 * Higher order function accepting an `HTMLCanvasElement` and returning
 * a render function which accepts the following parameters:
 *
 * - `fn` - shader function (compiled via `targetJS().compile(ast)`)
 * - `x`, `y`, `w`, `h` - optional args to define a sub-region to be
 *   updated (default to full image update)
 *
 * @param canvas -
 */
export const canvasRenderer = (canvas: HTMLCanvasElement) => {
    const buf = PackedBuffer.fromCanvas(canvas);
    return (
        fn: Fn<ReadonlyVec, Vec>,
        x = 0,
        y = 0,
        w = canvas.width,
        h = canvas.height
    ) => {
        renderBuffer(fn, buf, x, y, w, h);
        buf.blitCanvas(canvas);
    };
};
