import type { Fn2, ICopy, IEmpty } from "@thi.ng/api";
import { IGrid2DMixin } from "@thi.ng/api/mixins/igrid";
import { typedArray, UIntArray, uintTypeForBits } from "@thi.ng/api/typedarray";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import {
    isPremultipliedInt,
    postmultiplyInt,
    premultiplyInt,
} from "@thi.ng/porter-duff/premultiply";
import {
    BlendFnInt,
    BlitOpts,
    Filter,
    IBlend,
    IBlit,
    IInvert,
    IntChannel,
    IntFormat,
    IntFormatSpec,
    IntSampler,
    IPixelBuffer,
    IResizable,
    IToImageData,
    Lane,
} from "./api.js";
import { canvasPixels, imageCanvas } from "./canvas.js";
import { ensureChannel, ensureSize } from "./checks.js";
import { ABGR8888 } from "./format/abgr8888.js";
import { defIntFormat } from "./format/int-format.js";
import {
    __compileGrayFromABGR,
    __compileGrayToABGR,
} from "./internal/codegen.js";
import {
    __clampRegion,
    __prepRegions,
    __setChannelConvert,
    __setChannelSame,
    __setChannelUni,
    __transformABGR,
} from "./internal/utils.js";
import { defSampler } from "./sample.js";

/**
 * Syntax sugar for {@link IntBuffer} ctor.
 *
 * @param w -
 * @param h -
 * @param fmt -
 * @param data -
 */
export function intBuffer(
    w: number,
    h: number,
    fmt?: IntFormat | IntFormatSpec,
    data?: UIntArray
): IntBuffer;
export function intBuffer(
    src: IntBuffer,
    fmt?: IntFormat | IntFormatSpec
): IntBuffer;
export function intBuffer(...args: any[]) {
    return args[0] instanceof IntBuffer
        ? args[0].as(args[1])
        : // @ts-ignore
          new IntBuffer(...args);
}

/**
 * Creates a new pixel buffer from given HTML image element with optional
 * support for format conversion (default: {@link ABGR8888} & resizing.
 *
 * @param img
 * @param fmt
 * @param width
 * @param height
 */
export const intBufferFromImage = (
    img: HTMLImageElement,
    fmt?: IntFormat,
    width?: number,
    height = width
) => intBufferFromCanvas(imageCanvas(img, width, height).canvas, fmt);

/**
 * Creates a new pixel buffer from given HTML canvas element with optional
 * support for format conversion (default: {@link ABGR8888}.
 *
 * @param canvas
 * @param fmt
 */
export const intBufferFromCanvas = (
    canvas: HTMLCanvasElement,
    fmt: IntFormat = ABGR8888
) => {
    const ctx = canvasPixels(canvas);
    const w = canvas.width;
    const h = canvas.height;
    let dest: UIntArray | undefined;
    if (fmt === ABGR8888) {
        dest = ctx.data;
    } else {
        dest = typedArray(fmt.type, w * h);
        const src = ctx.data;
        const from = fmt.fromABGR;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = from(src[i]);
        }
    }
    return new IntBuffer(w, h, fmt, dest);
};

@IGrid2DMixin
export class IntBuffer
    implements
        IPixelBuffer<UIntArray, number>,
        IToImageData,
        IResizable<IntBuffer, IntSampler>,
        IBlend<IntBuffer, BlendFnInt>,
        IBlit<IntBuffer>,
        IInvert<IntBuffer>,
        ICopy<IntBuffer>,
        IEmpty<IntBuffer>
{
    readonly size: [number, number];
    readonly stride: [number, number];
    readonly format: IntFormat;
    readonly data: UIntArray;

    constructor(
        w: number,
        h: number,
        fmt: IntFormat | IntFormatSpec = ABGR8888,
        data?: UIntArray
    ) {
        this.size = [w, h];
        this.stride = [1, w];
        this.format = (<any>fmt).__packed ? <IntFormat>fmt : defIntFormat(fmt);
        this.data = data || typedArray(fmt.type, w * h);
    }

    /** @deprecated use `.data` instead */
    get pixels() {
        return this.data;
    }

    get width() {
        return this.size[0];
    }

    get height() {
        return this.size[1];
    }

    get offset() {
        return 0;
    }

    get dim(): 2 {
        return 2;
    }

    as(fmt: IntFormat) {
        return this.getRegion(0, 0, this.width, this.height, fmt);
    }

    copy() {
        const dest = this.empty();
        dest.data.set(this.data);
        return dest;
    }

    empty() {
        return new IntBuffer(this.width, this.height, this.format);
    }

    // @ts-ignore mixin
    order(): number[] {}

    // @ts-ignore mixin
    includes(x: number, y: number) {
        return false;
    }

    // @ts-ignore mixin
    indexAt(x: number, y: number) {
        return 0;
    }

    // @ts-ignore mixin
    indexAtUnsafe(x: number, y: number) {
        return 0;
    }

    // @ts-ignore mixin
    getAt(x: number, y: number) {
        return 0;
    }

    // @ts-ignore mixin
    getAtUnsafe(x: number, y: number) {
        return 0;
    }

    // @ts-ignore mixin
    setAt(x: number, y: number, col: number) {
        return true;
    }

    // @ts-ignore mixin
    setAtUnsafe(x: number, y: number, col: number) {
        return true;
    }

    getChannelAt(x: number, y: number, id: number, normalized = false) {
        const chan = <IntChannel>ensureChannel(this.format, id);
        const col = this.getAt(x, y);
        return normalized ? chan.float(col) : chan.int(col);
    }

    setChannelAt(
        x: number,
        y: number,
        id: number,
        col: number,
        normalized = false
    ) {
        const chan = <IntChannel>ensureChannel(this.format, id);
        const src = this.getAt(x, y);
        normalized ? chan.setFloat(src, col) : chan.setInt(src, col);
        return this;
    }

    blend(op: BlendFnInt, dest: IntBuffer, opts?: Partial<BlitOpts>) {
        let sw = this.width;
        let dw = dest.width;
        const { sx, sy, dx, dy, rw, rh } = __prepRegions(this, dest, opts);
        if (rw < 1 || rh < 1) return dest;
        const sbuf = this.data;
        const dbuf = dest.data;
        const sf = this.format.toABGR;
        const df1 = dest.format.toABGR;
        const df2 = dest.format.fromABGR;
        for (
            let si = (sx | 0) + (sy | 0) * sw,
                di = (dx | 0) + (dy | 0) * dw,
                yy = 0;
            yy < rh;
            yy++, si += sw, di += dw
        ) {
            for (let xx = 0; xx < rw; xx++) {
                dbuf[di + xx] = df2(op(sf(sbuf[si + xx]), df1(dbuf[di + xx])));
            }
        }
        return dest;
    }

    blit(dest: IntBuffer, opts?: Partial<BlitOpts>) {
        let sw = this.width;
        let dw = dest.width;
        const { sx, sy, dx, dy, rw, rh } = __prepRegions(this, dest, opts);
        if (rw < 1 || rh < 1) return dest;
        const sbuf = this.data;
        const dbuf = dest.data;
        const sf = this.format.toABGR;
        const df = dest.format.fromABGR;
        const blitRow =
            this.format !== dest.format
                ? (si: number, di: number) => {
                      for (let xx = 0; xx < rw; xx++) {
                          dbuf[di + xx] = df(sf(sbuf[si + xx]));
                      }
                  }
                : (si: number, di: number) =>
                      dbuf.set(sbuf.subarray(si, si + rw), di);
        for (
            let si = (sx | 0) + (sy | 0) * sw,
                di = (dx | 0) + (dy | 0) * dw,
                yy = 0;
            yy < rh;
            yy++, si += sw, di += dw
        ) {
            blitRow(si, di);
        }
        return dest;
    }

    blitCanvas(
        canvas: HTMLCanvasElement | CanvasRenderingContext2D,
        x = 0,
        y = 0
    ) {
        const ctx =
            canvas instanceof HTMLCanvasElement
                ? canvas.getContext("2d")!
                : canvas;
        ctx.putImageData(this.toImageData(), x, y);
    }

    toImageData() {
        const idata = new ImageData(this.width, this.height);
        const dest = new Uint32Array(idata.data.buffer);
        const src = this.data;
        const fmt = this.format.toABGR;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = fmt(src[i]);
        }
        return idata;
    }

    getRegion(
        x: number,
        y: number,
        width: number,
        height: number,
        fmt?: IntFormat
    ) {
        const [sx, sy, w, h] = __clampRegion(
            x,
            y,
            width,
            height,
            this.width,
            this.height
        );
        return this.blit(new IntBuffer(w, h, fmt || this.format), {
            sx,
            sy,
            w,
            h,
        });
    }

    getChannel(id: number) {
        const chan = <IntChannel>ensureChannel(this.format, id);
        const buf = new IntBuffer(this.width, this.height, {
            type: uintTypeForBits(chan.size),
            size: chan.size,
            channels: [{ size: chan.size, lane: Lane.RED }],
            fromABGR: __compileGrayFromABGR(chan.size),
            toABGR: __compileGrayToABGR(chan.size),
        });
        const src = this.data;
        const dest = buf.data;
        const get = chan.int;
        for (let i = src.length; --i >= 0; ) {
            dest[i] = get(src[i]);
        }
        return buf;
    }

    setChannel(id: number, src: IntBuffer | number) {
        const chan = <IntChannel>ensureChannel(this.format, id);
        const dbuf = this.data;
        const set = chan.setInt;
        if (isNumber(src)) {
            __setChannelUni(dbuf, src, set);
        } else {
            const sbuf = src.data;
            const schan = src.format.channels[0];
            ensureSize(sbuf, this.width, this.height);
            if (chan.size === schan.size) {
                __setChannelSame(dbuf, sbuf, schan.int, set);
            } else {
                __setChannelConvert(
                    dbuf,
                    sbuf,
                    this.format.fromABGR,
                    src.format.toABGR,
                    chan.maskA
                );
            }
        }
        return this;
    }

    invert() {
        const { data, format } = this;
        const mask = Math.pow(2, format.size - format.alpha) - 1;
        for (let i = data.length; --i >= 0; ) {
            data[i] ^= mask;
        }
        return this;
    }

    premultiply() {
        __transformABGR(this.data, this.format, premultiplyInt);
        return this;
    }

    postmultiply() {
        __transformABGR(this.data, this.format, postmultiplyInt);
        return this;
    }

    isPremultiplied() {
        const pix = this.data;
        const to = this.format.toABGR;
        for (let i = pix.length; --i >= 0; ) {
            if (!isPremultipliedInt(to(pix[i]))) {
                return false;
            }
        }
        return true;
    }

    forEach(f: Fn2<number, number, number>) {
        const pix = this.data;
        for (let i = pix.length; --i >= 0; ) {
            pix[i] = f(pix[i], i);
        }
        return this;
    }

    /**
     * Flips image vertically.
     */
    flipY() {
        const { data, width } = this;
        const tmp = typedArray(this.format.type, width);
        for (
            let i = 0, j = data.length - width;
            i < j;
            i += width, j -= width
        ) {
            tmp.set(data.subarray(i, i + width));
            data.copyWithin(i, j, j + width);
            data.set(tmp, j);
        }
        return this;
    }

    /**
     * Returns scaled version of this buffer using given sampler or filter
     * (default: `"linear"`) for interpolation. Syntax sugar for
     * {@link IntBuffer.resize}.
     *
     * @param scale
     */
    scale(scale: number, sampler: IntSampler | Filter = "linear") {
        assert(scale > 0, `scale must be > 0`);
        return this.resize(this.width * scale, this.height * scale, sampler);
    }

    resize(w: number, h: number, sampler: IntSampler | Filter = "linear") {
        w |= 0;
        h |= 0;
        assert(w > 0 && h > 0, `target width & height must be > 0`);
        const dest = intBuffer(w, h, this.format);
        const dpix = dest.data;
        const scaleX = w > 0 ? this.width / w : 0;
        const scaleY = h > 0 ? this.height / h : 0;
        sampler = isString(sampler)
            ? defSampler(this, sampler, "repeat")
            : sampler;
        for (let y = 0, i = 0; y < h; y++) {
            const yy = y * scaleY;
            for (let x = 0; x < w; x++, i++) {
                dpix[i] = sampler(x * scaleX, yy);
            }
        }
        return dest;
    }

    upsize() {
        const { width, height, data } = this;
        const dest = new IntBuffer(width * 2, height * 2, this.format);
        const dpix = dest.data;
        for (let y = 0, si = 0; y < height; y++) {
            for (let x = 0, di = y * width * 4; x < width; x++, si++, di += 2) {
                dpix[di] = data[si];
            }
        }
        return dest;
    }
}
