import { IObjectOf } from "@thi.ng/api";
import {
    lane8,
    Lane8,
    setLane8,
    splat8_24
} from "@thi.ng/binary";
import {
    BlitOpts,
    Channel,
    GAChannel,
    IBlit,
    IInvert,
    IPixelBuffer
} from "./api";
import { imageCanvas } from "./canvas";
import { Uint8Buffer } from "./uint8";
import {
    abgrToGrayU16,
    blit1,
    clampRegion,
    ensureSize
} from "./utils";

const LANES = <IObjectOf<Lane8>>{
    [Channel.ALPHA]: 2,
    [Channel.GRAY]: 3
};

/**
 * Buffer of unsigned 8-bit int pixel values (single channel).
 */
export class Uint16Buffer
    implements
        IPixelBuffer<Uint16Array, number>,
        IBlit<Uint16Array, number>,
        IInvert {
    /**
     * Takes a fully initialized image element and returns a
     * `Uint8Buffer` instance of its contents. All original pixels are
     * converted to grayscale values. Optionally, a target size can be
     * given to obtain the pixels of a resized version.
     *
     * @param img
     * @param width
     * @param height
     */
    static fromImage(img: HTMLImageElement, width?: number, height = width) {
        const ctx = imageCanvas(img, width, height);
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        return new Uint16Buffer(
            w,
            h,
            abgrToGrayU16(
                new Uint32Array(ctx.ctx.getImageData(0, 0, w, h).data.buffer)
            )
        );
    }

    /**
     * Async version of `fromImage()`.
     *
     * @param img
     * @param width
     * @param height
     */
    static async fromImagePromise(
        img: Promise<HTMLImageElement>,
        width?: number,
        height = width
    ) {
        return Uint16Buffer.fromImage(await img, width, height);
    }

    width: number;
    height: number;
    pixels: Uint16Array;

    constructor(width: number, height = width, pixels?: Uint16Array) {
        this.width = width;
        this.height = height;
        if (pixels) {
            ensureSize(pixels, width, height);
            this.pixels = pixels;
        } else {
            this.pixels = new Uint16Array(width * height);
        }
    }

    blit(buf: IPixelBuffer<Uint16Array, number>, opts: Partial<BlitOpts>) {
        blit1(this, buf, opts);
    }

    blitCanvas(canvas: HTMLCanvasElement, x = 0, y = 0) {
        const ctx = canvas.getContext("2d")!;
        const idata = ctx.getImageData(x, y, this.width, this.height);
        const dest = new Uint32Array(idata.data.buffer);
        const src = this.pixels;
        for (let i = dest.length; --i >= 0; ) {
            const c = src[i];
            dest[i] = splat8_24(c) | ((c & 0xff00) << 16);
        }
        ctx.putImageData(idata, x, y);
    }

    getRegion(x: number, y: number, width: number, height: number) {
        const [sx, sy, w, h] = clampRegion(
            x,
            y,
            width,
            height,
            this.width,
            this.height
        );
        const dest = new Uint16Buffer(w, h);
        this.blit(dest, { sx, sy, w, h });
        return dest;
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

    getChannel(id: GAChannel) {
        const dest = new Uint8Array(this.width * this.height);
        const src = this.pixels;
        const lane = LANES[id];
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = lane8(src[i], lane);
        }
        return new Uint8Buffer(this.width, this.height, dest);
    }

    setChannel(id: GAChannel, buf: IPixelBuffer<Uint8Array, number>) {
        const src = buf.pixels;
        const dest = this.pixels;
        const lane = LANES[id];
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = setLane8(dest[i], src[i], lane);
        }
        return this;
    }

    invert() {
        const pix = this.pixels;
        for (let i = pix.length; --i >= 0; ) {
            pix[i] ^= 0xff;
        }
        return this;
    }
}
