import { assert, TypedArray } from "@thi.ng/api";
import { swizzle8 } from "@thi.ng/binary";
import {
    BlendFnFloat,
    BlendFnInt,
    BlitOpts,
    IPixelBuffer
} from "./api";

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
 * values. Discards alpha.
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
 * Converts a raw ABGR `Uint32Array` to `Uint16Array` of grayscale and
 * alpha values.
 *
 * @param pixels
 * @param out
 */
export const abgrToGrayU16 = (pixels: Uint32Array, out?: Uint16Array) => {
    out = out || new Uint16Array(pixels.length);
    for (let i = pixels.length; --i >= 0; ) {
        const c = pixels[i];
        out[i] = luminanceABGR(c) | ((c >>> 16) & 0xff00);
    }
    return out;
};

/**
 * Converts a raw ABGR `Uint32Array` to `Float32Array` of grayscale
 * values. Discards alpha.
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
    src: IPixelBuffer<TypedArray, number>,
    dest: IPixelBuffer<TypedArray, number>,
    opts: Partial<BlitOpts> = {}
) => {
    let sw = src.width;
    let dw = dest.width;
    const { sx, sy, dx, dy, rw, rh } = prepRegions(src, dest, opts);
    if (rw < 1 || rh < 1) return;
    const sbuf = src.pixels;
    const dbuf = dest.pixels;
    for (
        let si = (sx | 0) + (sy | 0) * sw,
            di = (dx | 0) + (dy | 0) * dw,
            yy = 0;
        yy < rh;
        yy++, si += sw, di += dw
    ) {
        dbuf.set(sbuf.subarray(si, si + rw), di);
    }
};

export const blitStrided = (
    src: IPixelBuffer<TypedArray, any>,
    dest: IPixelBuffer<TypedArray, any>,
    stride: number,
    opts: Partial<BlitOpts> = {}
) => {
    let sw = src.width;
    let dw = dest.width;
    const { sx, sy, dx, dy, rw, rh } = prepRegions(src, dest, opts);
    if (rw < 1 || rh < 1) return;
    const sbuf = src.pixels;
    const dbuf = dest.pixels;
    const ssw = sw * stride;
    const sdw = dw * stride;
    for (
        let si = ((sx | 0) + (sy | 0) * sw) * stride,
            di = ((dx | 0) + (dy | 0) * dw) * stride,
            yy = 0;
        yy < rh;
        yy++, si += ssw, di += sdw
    ) {
        dbuf.set(sbuf.subarray(si, si + rw * stride), di);
    }
};

export const blendInt = (
    op: BlendFnInt,
    src: IPixelBuffer<TypedArray, number>,
    dest: IPixelBuffer<TypedArray, number>,
    opts: Partial<BlitOpts> = {}
) => {
    let sw = src.width;
    let dw = dest.width;
    const { sx, sy, dx, dy, rw, rh } = prepRegions(src, dest, opts);
    if (rw < 1 || rh < 1) return;
    const sbuf = src.pixels;
    const dbuf = dest.pixels;
    for (
        let si = (sx | 0) + (sy | 0) * sw,
            di = (dx | 0) + (dy | 0) * dw,
            yy = 0;
        yy < rh;
        yy++, si += sw, di += dw
    ) {
        for (let six = si, dix = di, sie = si + rw; six < sie; six++, dix++) {
            dbuf[dix] = op(sbuf[six], dbuf[dix]);
        }
    }
};

export const blendFloat = (
    op: BlendFnFloat,
    src: IPixelBuffer<TypedArray, any>,
    dest: IPixelBuffer<TypedArray, any>,
    stride: number,
    opts: Partial<BlitOpts> = {}
) => {
    let sw = src.width;
    let dw = dest.width;
    const { sx, sy, dx, dy, rw, rh } = prepRegions(src, dest, opts);
    if (rw < 1 || rh < 1) return;
    const sbuf = src.pixels;
    const dbuf = dest.pixels;
    const ssw = sw * stride;
    const sdw = dw * stride;
    const tmp: number[] = [];
    for (
        let si = ((sx | 0) + (sy | 0) * sw) * stride,
            di = ((dx | 0) + (dy | 0) * dw) * stride,
            yy = 0;
        yy < rh;
        yy++, si += ssw, di += sdw
    ) {
        // dbuf.set(sbuf.subarray(si, si + rw * stride), di);
        for (
            let six = si, dix = di, sie = si + rw * stride;
            six < sie;
            six += stride, dix += stride
        ) {
            dbuf.set(
                op(
                    tmp,
                    sbuf.subarray(six, six + stride),
                    dbuf.subarray(dix, dix + stride)
                ),
                dix
            );
        }
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

const prepRegions = (
    src: IPixelBuffer<TypedArray, number>,
    dest: IPixelBuffer<TypedArray, number>,
    opts: Partial<BlitOpts> = {}
) => {
    let sw = src.width;
    let dw = dest.width;
    let sx: number, sy: number;
    let dx: number, dy: number;
    let rw: number, rh: number;
    [sx, sy, rw, rh] = clampRegion(
        opts.sx || 0,
        opts.sy || 0,
        opts.w || sw,
        opts.h || src.height,
        sw,
        src.height
    );
    [dx, dy, rw, rh] = clampRegion(
        opts.dx || 0,
        opts.dy || 0,
        rw,
        rh,
        dw,
        dest.height
    );
    return { sx, sy, dx, dy, rw, rh };
};
