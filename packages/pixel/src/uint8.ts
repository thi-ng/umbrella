import { splat8_24 } from "@thi.ng/binary";
import {
    BlitOpts,
    IBlit,
    IInvert,
    IPixelBuffer
} from "./api";
import { imageCanvas } from "./canvas";
import {
    abgrToGrayU8,
    blit1,
    clampRegion,
    ensureSize
} from "./utils";

/**
 * Buffer of unsigned 8-bit int pixel values (single channel).
 */
export class Uint8Buffer
    implements
        IPixelBuffer<Uint8Array, number>,
        IBlit<Uint8Array, number>,
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
        return new Uint8Buffer(
            w,
            h,
            abgrToGrayU8(
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
        return Uint8Buffer.fromImage(await img, width, height);
    }

    width: number;
    height: number;
    pixels: Uint8Array;

    constructor(width: number, height = width, pixels?: Uint8Array) {
        this.width = width;
        this.height = height;
        if (pixels) {
            ensureSize(pixels, width, height);
            this.pixels = pixels;
        } else {
            this.pixels = new Uint8Array(width * height);
        }
    }

    blit(buf: IPixelBuffer<Uint8Array, number>, opts: Partial<BlitOpts>) {
        blit1(this, buf, opts);
    }

    blitCanvas(canvas: HTMLCanvasElement, x = 0, y = 0) {
        const ctx = canvas.getContext("2d")!;
        const idata = ctx.getImageData(x, y, this.width, this.height);
        const dest = new Uint32Array(idata.data.buffer);
        const src = this.pixels;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = splat8_24(src[i]) | 0xff000000;
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
        const dest = new Uint8Buffer(w, h);
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

    invert() {
        const pix = this.pixels;
        for (let i = pix.length; --i >= 0; ) {
            pix[i] ^= 0xff;
        }
        return this;
    }
}
