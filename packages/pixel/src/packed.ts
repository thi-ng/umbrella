import {
    Fn,
    ICopy,
    IEmpty,
    typedArray,
    UIntArray,
    uintTypeForBits,
} from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import {
    isPremultipliedInt,
    postmultiplyInt,
    premultiplyInt,
} from "@thi.ng/porter-duff";
import {
    BayerMatrix,
    BayerSize,
    BlendFnInt,
    BlitOpts,
    IPixelBuffer,
    Lane,
    PackedChannel,
    PackedFormat,
    PackedFormatSpec,
} from "./api";
import { canvasPixels, imageCanvas } from "./canvas";
import { compileGrayFromABGR, compileGrayToABGR } from "./codegen";
import { defBayer } from "./dither";
import { ABGR8888 } from "./format/abgr8888";
import { defPackedFormat } from "./format/packed-format";
import {
    clampRegion,
    ensureChannel,
    ensureSize,
    prepRegions,
    setChannelConvert,
    setChannelSame,
    setChannelUni,
    transformABGR,
} from "./utils";

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
 * @deprecated use {@link packedBuffer} instead.
 */
export const buffer = packedBuffer;

export class PackedBuffer
    implements
        IPixelBuffer<UIntArray, number>,
        ICopy<PackedBuffer>,
        IEmpty<PackedBuffer> {
    static fromImage(
        img: HTMLImageElement,
        fmt: PackedFormat,
        width?: number,
        height = width
    ) {
        const ctx = imageCanvas(img, width, height);
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const src = new Uint32Array(
            ctx.ctx.getImageData(0, 0, w, h).data.buffer
        );
        const dest = typedArray(fmt.type, w * h);
        const from = fmt.fromABGR;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = from(src[i]);
        }
        return new PackedBuffer(w, h, fmt, dest);
    }

    static fromCanvas(canvas: HTMLCanvasElement) {
        return new PackedBuffer(
            canvas.width,
            canvas.height,
            ABGR8888,
            canvasPixels(canvas).pixels
        );
    }

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

    blitCanvas(canvas: HTMLCanvasElement, x = 0, y = 0) {
        const ctx = canvas.getContext("2d")!;
        const idata = new ImageData(this.width, this.height);
        const dest = new Uint32Array(idata.data.buffer);
        const src = this.pixels;
        const fmt = this.format.toABGR;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = fmt(src[i]);
        }
        ctx.putImageData(idata, x, y);
        return canvas;
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

    forEach(f: Fn<number, number>) {
        const pix = this.pixels;
        for (let i = pix.length; --i >= 0; ) {
            pix[i] = f(pix[i]);
        }
        return this;
    }

    /**
     * Applies in-place, ordered dithering using provided dither matrix
     * (or matrix size) and desired number of dither levels, optionally
     * specified individually (per channel). Each channel is be
     * processed independently. Channels can be excluded from dithering
     * by setting their target colors to zero or negative numbers.
     *
     * @remarks
     * A `size` of 1 will result in simple posterization of each
     * channel. The `numColors` value(s) MUST be in the `[0 ..
     * numColorsInChannel]` interval.
     *
     * Also see: {@link defBayer}, {@link ditherPixels}.
     *
     * @param size - dither matrix/size
     * @param numColors - num target colors/steps
     */
    dither(size: BayerSize | BayerMatrix, numColors: number | number[]) {
        const { pixels, format, width } = this;
        const steps = isNumber(numColors)
            ? new Array<number>(format.channels.length).fill(numColors)
            : numColors;
        const mat = isNumber(size) ? defBayer(size) : size;
        for (
            let i = 0,
                n = pixels.length,
                nc = format.channels.length,
                x = 0,
                y = 0;
            i < n;
            i++
        ) {
            let col = pixels[i];
            for (let j = 0; j < nc; j++) {
                const ch = format.channels[j];
                const cs = steps[j];
                cs > 0 &&
                    (col = ch.setInt(
                        col,
                        ch.dither(mat, cs, x, y, ch.int(col))
                    ));
            }
            pixels[i] = col;
            if (++x === width) {
                x = 0;
                y++;
            }
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
     * Returns new buffer of downscaled version (by given integer factor) using
     * simple nearest neighbor sampling.
     *
     * @param res
     */
    downsample(res: number) {
        res |= 0;
        const { width, height, pixels: sbuf } = this;
        const dest = new PackedBuffer(
            (width / res) | 0,
            (height / res) | 0,
            this.format
        );
        const { width: dwidth, height: dheight, pixels: dbuf } = dest;
        for (let y = 0, i = 0; y < dheight; y++) {
            for (
                let x = 0, j = y * res * width;
                x < dwidth;
                x++, i++, j += res
            ) {
                dbuf[i] = sbuf[j];
            }
        }
        return dest;
    }
}
