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
        out[i] = luminanceABGR(pixels[i]);
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
        out[i] = luminanceARGB(pixels[i]);
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
        out[i] = luminanceABGR(pixels[i]) / 255;
    }
    return out;
};

/**
 * Swaps red & blue channels in a 32bit packed ARGB or ABGR int.
 *
 * @param col
 */
export const swapRB = (col: number) => swizzle8(col, 0, 3, 2, 1);

export const blit1 = (
    src: TypedArray,
    dest: TypedArray,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    rw: number,
    rh: number
) => {
    [sx, sy, rw, rh] = clampRegion(sx, sy, rw, rh, sw, sh);
    [dx, dy, rw, rh] = clampRegion(dx, dy, rw, rh, dw, dh);
    if (rw < 1 || rh < 1) return;
    for (
        let si = (sx | 0) + (sy | 0) * sw,
            di = (dx | 0) + (dy | 0) * dw,
            yy = 0;
        yy < rh;
        yy++, si += sw, di += dw
    ) {
        dest.set(src.subarray(si, si + rw), di);
    }
};

export const blitStrided = (
    src: TypedArray,
    dest: TypedArray,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    rw: number,
    rh: number,
    stride: number
) => {
    [sx, sy, rw, rh] = clampRegion(sx, sy, rw, rh, sw, sh);
    [dx, dy, rw, rh] = clampRegion(dx, dy, rw, rh, dw, dh);
    if (rw < 1 || rh < 1) return;
    const ssw = sw * stride;
    const sdw = dw * stride;
    for (
        let si = ((sx | 0) + (sy | 0) * sw) * stride,
            di = ((dx | 0) + (dy | 0) * dw) * stride,
            yy = 0;
        yy < rh;
        yy++, si += ssw, di += sdw
    ) {
        dest.set(src.subarray(si, si + rw * stride), di);
        // for (
        //     let xx = 0, s = si, d = di;
        //     xx < rw;
        //     xx++, s += stride, d += stride
        // ) {
        //     dest.set(src.subarray(s, s + stride), d);
        // }
    }
};

export const luminanceARGB = (c: number) =>
    (((c >>> 16) & 0xff) * 76 + ((c >>> 8) & 0xff) * 150 + (c & 0xff) * 29) /
    255;

export const luminanceABGR = (c: number) =>
    (((c >>> 16) & 0xff) * 29 + ((c >>> 8) & 0xff) * 150 + (c & 0xff) * 76) /
    255;

export const clampRegion = (
    x: number,
    y: number,
    w: number,
    h: number,
    mw: number,
    mh: number
) => {
    x < 0 && ((w += x), (x = 0));
    y < 0 && ((h += y), (y = 0));
    return [x, y, Math.min(w, mw - x), Math.min(h, mh - y)];
};
