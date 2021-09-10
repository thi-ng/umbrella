import type { Fn, Fn2, FnN, TypedArray, UIntArray } from "@thi.ng/api";
import { assert } from "@thi.ng/api/assert";
import { isNumber } from "@thi.ng/checks/is-number";
import { clamp } from "@thi.ng/math/interval";
import type { BlitOpts, FloatFormat, PackedFormat } from "./api";

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

export const luminanceABGR: FnN = (c) =>
    (((c >>> 16) & 0xff) * 29 + ((c >>> 8) & 0xff) * 150 + (c & 0xff) * 76) /
    255;

/** @internal */
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
    sx |= 0;
    sy |= 0;
    w |= 0;
    h |= 0;
    sx < 0 && ((w += sx), (dx -= sx), (sx = 0));
    sy < 0 && ((h += sy), (dy -= sy), (sy = 0));
    return [sx, sy, clamp(w, 0, maxw - sx), clamp(h, 0, maxh - sy), dx, dy];
};

/** @internal */
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

/** @internal */
export const setChannelUni = (
    dbuf: UIntArray,
    src: number,
    set: Fn2<number, number, number>
) => {
    for (let i = dbuf.length; --i >= 0; ) {
        dbuf[i] = set(dbuf[i], src);
    }
};

/** @internal */
export const setChannelSame = (
    dbuf: UIntArray,
    sbuf: UIntArray,
    get: Fn<number, number>,
    set: Fn2<number, number, number>
) => {
    for (let i = dbuf.length; --i >= 0; ) {
        dbuf[i] = set(dbuf[i], get(sbuf[i]));
    }
};

/** @internal */
export const setChannelConvert = (
    dbuf: UIntArray,
    sbuf: UIntArray,
    from: Fn<number, number>,
    sto: Fn<number, number>,
    mask: number
) => {
    const invMask = ~mask;
    for (let i = dbuf.length; --i >= 0; ) {
        dbuf[i] = (dbuf[i] & invMask) | (from(sto(sbuf[i])) & mask);
    }
};

export const transformABGR = (
    pix: UIntArray,
    format: PackedFormat,
    fn: Fn<number, number>
) => {
    const from = format.fromABGR;
    const to = format.toABGR;
    for (let i = pix.length; --i >= 0; ) {
        pix[i] = from(fn(to(pix[i])));
    }
};

/** @internal */
export const asVec = (x: number | [number, number]) =>
    isNumber(x) ? [x, x] : x;

/** @internal */
export const asIntVec = (x: number | [number, number]) => {
    const v = asVec(x);
    return [v[0] | 0, v[1] | 0];
};

/** @internal */
export const range = (n: number) => new Uint8Array(n).map((_, i) => i);
