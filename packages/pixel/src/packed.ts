import type { Fn2, ICopy, IEmpty } from "@thi.ng/api";
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
    IntSampler,
    IPixelBuffer,
    IResizable,
    IToImageData,
    Lane,
    PackedChannel,
    PackedFormat,
    PackedFormatSpec,
} from "./api";
import { canvasPixels, imageCanvas } from "./canvas";
import { ABGR8888 } from "./format/abgr8888";
import { defPackedFormat } from "./format/packed-format";
import { compileGrayFromABGR, compileGrayToABGR } from "./internal/codegen";
import {
    clampRegion,
    ensureChannel,
    ensureSize,
    prepRegions,
    setChannelConvert,
    setChannelSame,
    setChannelUni,
    transformABGR,
} from "./internal/utils";
import { defSampler } from "./sample";

/**
 * Syntax sugar for {@link PackedBuffer} ctor.
 *
 * @param w -
 * @param h -
 * @param fmt -
 * @param pixels -
 */
export function packedBuffer(
    w: number,
    h: number,
    fmt: PackedFormat | PackedFormatSpec,
    pixels?: UIntArray
): PackedBuffer;
export function packedBuffer(
    src: PackedBuffer,
    fmt: PackedFormat | PackedFormatSpec
): PackedBuffer;
export function packedBuffer(...args: any[]) {
    return args[0] instanceof PackedBuffer
        ? args[0].as(args[1])
        : // @ts-ignore
          new PackedBuffer(...args);
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
export const packedBufferFromImage = (
    img: HTMLImageElement,
    fmt?: PackedFormat,
    width?: number,
    height = width
) => packedBufferFromCanvas(imageCanvas(img, width, height).canvas, fmt);

/**
 * Creates a new pixel buffer from given HTML canvas element with optional
 * support for format conversion (default: {@link ABGR8888}.
 *
 * @param canvas
 * @param fmt
 */
export const packedBufferFromCanvas = (
    canvas: HTMLCanvasElement,
    fmt: PackedFormat = ABGR8888
) => {
    const ctx = canvasPixels(canvas);
    const w = canvas.width;
    const h = canvas.height;
    let dest: UIntArray | undefined;
    if (fmt === ABGR8888) {
        dest = ctx.pixels;
    } else {
        dest = typedArray(fmt.type, w * h);
        const src = ctx.pixels;
        const from = fmt.fromABGR;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = from(src[i]);
        }
    }
    return new PackedBuffer(w, h, fmt, dest);
};

export class PackedBuffer
    implements
        IPixelBuffer<UIntArray, number>,
        IToImageData,
        IResizable<PackedBuffer, IntSampler>,
        IBlend<PackedBuffer, BlendFnInt>,
        IBlit<PackedBuffer>,
        IInvert<PackedBuffer>,
        ICopy<PackedBuffer>,
        IEmpty<PackedBuffer>
{
    readonly width: number;
    readonly height: number;
    readonly format: PackedFormat;
    readonly pixels: UIntArray;

    constructor(
        w: number,
        h: number,
        fmt: PackedFormat | PackedFormatSpec,
        pixels?: UIntArray
    ) {
        this.width = w;
        this.height = h;
        this.format = (<any>fmt).__packed
            ? <PackedFormat>fmt
            : defPackedFormat(fmt);
        this.pixels = pixels || typedArray(fmt.type, w * h);
    }

    get stride() {
        return 1;
    }

    as(fmt: PackedFormat) {
        return this.getRegion(0, 0, this.width, this.height, fmt);
    }

    copy() {
        const dest = this.empty();
        dest.pixels.set(this.pixels);
        return dest;
    }

    empty() {
        return new PackedBuffer(this.width, this.height, this.format);
    }

    getAt(x: number, y: number) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height
            ? this.pixels[(x | 0) + (y | 0) * this.width]
            : 0;
    }

    setAt(x: number, y: number, col: number) {
        x >= 0 &&
            x < this.width &&
            y >= 0 &&
            y < this.height &&
            (this.pixels[(x | 0) + (y | 0) * this.width] = col);
        return this;
    }

    getChannelAt(x: number, y: number, id: number, normalized = false) {
        const chan = <PackedChannel>ensureChannel(this.format, id);
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
        const chan = <PackedChannel>ensureChannel(this.format, id);
        const src = this.getAt(x, y);
        normalized ? chan.setFloat(src, col) : chan.setInt(src, col);
        return this;
    }

    blend(op: BlendFnInt, dest: PackedBuffer, opts?: Partial<BlitOpts>) {
        let sw = this.width;
        let dw = dest.width;
        const { sx, sy, dx, dy, rw, rh } = prepRegions(this, dest, opts);
        if (rw < 1 || rh < 1) return dest;
        const sbuf = this.pixels;
        const dbuf = dest.pixels;
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

    blit(dest: PackedBuffer, opts?: Partial<BlitOpts>) {
        let sw = this.width;
        let dw = dest.width;
        const { sx, sy, dx, dy, rw, rh } = prepRegions(this, dest, opts);
        if (rw < 1 || rh < 1) return dest;
        const sbuf = this.pixels;
        const dbuf = dest.pixels;
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
        const src = this.pixels;
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
        fmt?: PackedFormat
    ) {
        const [sx, sy, w, h] = clampRegion(
            x,
            y,
            width,
            height,
            this.width,
            this.height
        );
        return this.blit(new PackedBuffer(w, h, fmt || this.format), {
            sx,
            sy,
            w,
            h,
        });
    }

    getChannel(id: number) {
        const chan = <PackedChannel>ensureChannel(this.format, id);
        const buf = new PackedBuffer(this.width, this.height, {
            type: uintTypeForBits(chan.size),
            size: chan.size,
            channels: [{ size: chan.size, lane: Lane.RED }],
            fromABGR: compileGrayFromABGR(chan.size),
            toABGR: compileGrayToABGR(chan.size),
        });
        const src = this.pixels;
        const dest = buf.pixels;
        const get = chan.int;
        for (let i = src.length; --i >= 0; ) {
            dest[i] = get(src[i]);
        }
        return buf;
    }

    setChannel(id: number, src: PackedBuffer | number) {
        const chan = <PackedChannel>ensureChannel(this.format, id);
        const dbuf = this.pixels;
        const set = chan.setInt;
        if (isNumber(src)) {
            setChannelUni(dbuf, src, set);
        } else {
            const sbuf = src.pixels;
            const schan = src.format.channels[0];
            ensureSize(sbuf, this.width, this.height);
            if (chan.size === schan.size) {
                setChannelSame(dbuf, sbuf, schan.int, set);
            } else {
                setChannelConvert(
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
        const { format, pixels } = this;
        const mask = Math.pow(2, format.size - format.alpha) - 1;
        for (let i = pixels.length; --i >= 0; ) {
            pixels[i] ^= mask;
        }
        return this;
    }

    premultiply() {
        transformABGR(this.pixels, this.format, premultiplyInt);
        return this;
    }

    postmultiply() {
        transformABGR(this.pixels, this.format, postmultiplyInt);
        return this;
    }

    isPremultiplied() {
        const pix = this.pixels;
        const to = this.format.toABGR;
        for (let i = pix.length; --i >= 0; ) {
            if (!isPremultipliedInt(to(pix[i]))) {
                return false;
            }
        }
        return true;
    }

    forEach(f: Fn2<number, number, number>) {
        const pix = this.pixels;
        for (let i = pix.length; --i >= 0; ) {
            pix[i] = f(pix[i], i);
        }
        return this;
    }

    /**
     * Flips image vertically.
     */
    flipY() {
        const { pixels, width } = this;
        const tmp = typedArray(this.format.type, width);
        for (
            let i = 0, j = pixels.length - width;
            i < j;
            i += width, j -= width
        ) {
            tmp.set(pixels.subarray(i, i + width));
            pixels.copyWithin(i, j, j + width);
            pixels.set(tmp, j);
        }
        return this;
    }

    /**
     * Returns scaled version of this buffer using given sampler or filter
     * (default: `"linear"`) for interpolation. Syntax sugar for
     * {@link PackedBuffer.resize}.
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
        const dest = packedBuffer(w, h, this.format);
        const dpix = dest.pixels;
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
        const { width, height, pixels } = this;
        const dest = new PackedBuffer(width * 2, height * 2, this.format);
        const dpix = dest.pixels;
        for (let y = 0, si = 0; y < height; y++) {
            for (let x = 0, di = y * width * 4; x < width; x++, si++, di += 2) {
                dpix[di] = pixels[si];
            }
        }
        return dest;
    }
}
