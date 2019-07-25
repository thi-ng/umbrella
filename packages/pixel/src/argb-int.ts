import { IObjectOf } from "@thi.ng/api";
import { Lane8, lane8, setLane8 } from "@thi.ng/binary";
import {
    BlendFnInt,
    BlitOpts,
    Channel,
    IBlend,
    IBlit,
    IColorChannel,
    IGrayscale,
    IInvert,
    IPixelBuffer
} from "./api";
import { imageCanvas } from "./canvas";
import { Uint8Buffer } from "./uint8";
import {
    argbToGrayU8,
    blendInt,
    blit1,
    clampRegion,
    ensureSize,
    swapRB
} from "./utils";

const LANES = <IObjectOf<Lane8>>{
    [Channel.ALPHA]: 0,
    [Channel.RED]: 1,
    [Channel.GREEN]: 2,
    [Channel.BLUE]: 3
};

/**
 * Buffer of 32bit packed ARGB values.
 */
export class ARGBBuffer
    implements
        IPixelBuffer<Uint32Array, number>,
        IBlend<BlendFnInt, Uint32Array, number>,
        IBlit<Uint32Array, number>,
        IColorChannel<Uint8Array>,
        IGrayscale<Uint8Array, number>,
        IInvert {
    /**
     * Takes a fully initialized image element and returns a
     * `ARGBBuffer` instance of its contents. Optionally, a target size
     * can be given to obtain the pixels of a resized version.
     *
     * @param img
     * @param width
     * @param height
     */
    static fromImage(img: HTMLImageElement, width?: number, height = width) {
        const ctx = imageCanvas(img, width, height);
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const pixels = new Uint32Array(
            ctx.ctx.getImageData(0, 0, w, h).data.buffer
        );
        for (let i = pixels.length; --i >= 0; ) {
            pixels[i] = swapRB(pixels[i]);
        }
        return new ARGBBuffer(w, h, pixels);
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
        return ARGBBuffer.fromImage(await img, width, height);
    }

    width: number;
    height: number;
    pixels: Uint32Array;

    constructor(width: number, height = width, pixels?: Uint32Array) {
        this.width = width;
        this.height = height;
        if (pixels) {
            ensureSize(pixels, width, height);
            this.pixels = pixels;
        } else {
            this.pixels = new Uint32Array(width * height);
        }
    }

    blend(
        op: BlendFnInt,
        buf: IPixelBuffer<Uint32Array, number>,
        opts: Partial<BlitOpts>
    ) {
        blendInt(op, this, buf, opts);
    }

    blit(buf: IPixelBuffer<Uint32Array, number>, opts: Partial<BlitOpts>) {
        blit1(this, buf, opts);
    }

    blitCanvas(canvas: HTMLCanvasElement, x = 0, y = 0) {
        const ctx = canvas.getContext("2d")!;
        const idata = ctx.getImageData(x, y, this.width, this.height);
        const dest = new Uint32Array(idata.data.buffer);
        const src = this.pixels;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = swapRB(src[i]);
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
        const dest = new ARGBBuffer(w, h);
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

    getChannel(id: Channel) {
        const dest = new Uint8Array(this.width * this.height);
        const src = this.pixels;
        const lane = LANES[id];
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = lane8(src[i], lane);
        }
        return new Uint8Buffer(this.width, this.height, dest);
    }

    setChannel(id: Channel, buf: IPixelBuffer<Uint8Array, number>) {
        const src = buf.pixels;
        const dest = this.pixels;
        const lane = LANES[id];
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = setLane8(dest[i], src[i], lane);
        }
        return this;
    }

    grayscale() {
        return new Uint8Buffer(
            this.width,
            this.height,
            argbToGrayU8(this.pixels)
        );
    }

    invert() {
        const pix = this.pixels;
        for (let i = pix.length; --i >= 0; ) {
            pix[i] ^= 0xffffff;
        }
        return this;
    }
}
