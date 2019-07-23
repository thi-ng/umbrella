import { assert, TypedArray } from "@thi.ng/api";
import { swizzle8 } from "@thi.ng/binary";

export const ensureSize = (
    pixels: TypedArray,
    width: number,
    height: number,
    stride = 1
) => assert(pixels.length >= width * height * stride, "pixel buffer too small");

/**
 * Converts a raw ABGR `Uint32Array` to `Uint8Array` of grayscale
 * values.
 *
 * @param pixels
 * @param out
 */
export const abgrToGrayU8 = (pixels: Uint32Array, out?: Uint8Array) => {
    out = out || new Uint8Array(pixels.length);
    for (let i = pixels.length; --i >= 0; ) {
        const c = pixels[i];
        out[i] =
            (((c >>> 16) & 0xff) * 29 +
                ((c >>> 8) & 0xff) * 150 +
                (c & 0xff) * 76) /
            255;
    }
    return out;
};

/**
 * Converts a raw ABGR `Uint32Array` to `Uint8Array` of grayscale
 * values.
 *
 * @param pixels
 * @param out
 */
export const argbToGrayU8 = (pixels: Uint32Array, out?: Uint8Array) => {
    out = out || new Uint8Array(pixels.length);
    for (let i = pixels.length; --i >= 0; ) {
        const c = pixels[i];
        out[i] =
            (((c >>> 16) & 0xff) * 76 +
                ((c >>> 8) & 0xff) * 150 +
                (c & 0xff) * 29) /
            255;
    }
    return out;
};

/**
 * Converts a raw ABGR `Uint32Array` to `Float32Array` of grayscale
 * values.
 *
 * @param pixels
 * @param out
 */
export const abgrToGrayF32 = (pixels: Uint32Array, out?: Float32Array) => {
    out = out || new Float32Array(pixels.length);
    for (let i = pixels.length; --i >= 0; ) {
        const c = pixels[i];
        out[i] =
            (((c >>> 16) & 0xff) * 29 +
                ((c >>> 8) & 0xff) * 150 +
                (c & 0xff) * 76) /
            0xfe01;
    }
    return out;
};

/**
 * Swaps red & blue channels in a 32bit packed ARGB or ABGR int.
 *
 * @param col
 */
export const swapRB = (col: number) => swizzle8(col, 0, 3, 1, 2);

export const blit1 = (
    src: TypedArray,
    dest: TypedArray,
    x: number,
    y: number,
    sw: number,
    sh: number,
    dw: number,
    dh: number
) => {
    const w = Math.min(dw - x, sw);
    const h = Math.min(dh - y, sh);
    if (w < 1 || h < 1) return;
    for (
        let si = 0, di = (x | 0) + (y | 0) * dw, yy = 0;
        yy < h;
        yy++, si += sw, di += dw
    ) {
        for (let xx = 0; xx < w; xx++) {
            dest[di + xx] = src[si + xx];
        }
    }
};

export const blitStrided = (
    src: TypedArray,
    dest: TypedArray,
    x: number,
    y: number,
    sw: number,
    sh: number,
    dw: number,
    dh: number,
    stride: number
) => {
    const w = Math.min(dw - x, sw);
    const h = Math.min(dh - y, sh);
    if (w < 1 || h < 1) return;
    const ssw = sw * stride;
    const sdw = dw * stride;
    for (
        let si = 0, di = ((x | 0) + (y | 0) * dw) * stride, yy = 0;
        yy < h;
        yy++, si += ssw, di += sdw
    ) {
        for (
            let xx = 0, s = si, d = di;
            xx < w;
            xx++, s += stride, d += stride
        ) {
            dest.set(src.subarray(s, s + stride), d);
        }
    }
};
