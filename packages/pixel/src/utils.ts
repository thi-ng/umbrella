import { assert, TypedArray } from "@thi.ng/api";
import { clamp } from "@thi.ng/math";
import { BlitOpts } from "./api";

export const ensureSize = (
    pixels: TypedArray,
    width: number,
    height: number,
    stride = 1
) => assert(pixels.length >= width * height * stride, "pixel buffer too small");

export const luminanceABGR = (c: number) =>
    (((c >>> 16) & 0xff) * 29 + ((c >>> 8) & 0xff) * 150 + (c & 0xff) * 76) /
    255;

export const clampRegion = (
    sx: number,
    sy: number,
    w: number,
    h: number,
    maxw: number,
    maxh: number,
    dx = 0,
    dy = 0
) => {
    sx < 0 && ((w += sx), (dx -= sx), (sx = 0));
    sy < 0 && ((h += sy), (dy -= sy), (sy = 0));
    return [sx, sy, clamp(w, 0, maxw - sx), clamp(h, 0, maxh - sy), dx, dy];
};

export const prepRegions = (
    src: { width: number; height: number },
    dest: { width: number; height: number },
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
    [dx, dy, rw, rh, sx, sy] = clampRegion(
        opts.dx || 0,
        opts.dy || 0,
        rw,
        rh,
        dw,
        dest.height,
        sx,
        sy
    );
    return { sx, sy, dx, dy, rw, rh };
};
