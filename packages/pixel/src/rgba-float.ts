import { clamp01 } from "@thi.ng/math";
import {
    BlendFnFloat,
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
import { FloatBuffer } from "./float";
import {
    blendFloat,
    blitStrided,
    clampRegion,
    ensureSize
} from "./utils";

/**
 * Buffer of 4x 32bit float pixel values in RGBA order.
 */
export class RGBAFloatBuffer
    implements
        IPixelBuffer<Float32Array, ArrayLike<number>>,
        IBlend<BlendFnFloat, Float32Array, ArrayLike<number>>,
        IBlit<Float32Array, ArrayLike<number>>,
        IColorChannel<Float32Array>,
        IGrayscale<Float32Array, number>,
        IInvert {
    /**
     * Takes a fully initialized image element and returns a
     * `RGBAFloatBuffer` instance of its contents. Optionally, a target size
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
        const src = new Uint32Array(
            ctx.ctx.getImageData(0, 0, w, h).data.buffer
        );
        const dest = new Float32Array(w * h * 4);
        for (let i = src.length, j = i * 4; (j -= 4), --i >= 0; ) {
            const c = src[i];
            dest[j] = (c & 0xff) / 255; // red
            dest[j + 1] = ((c >>> 8) & 0xff) / 255; // green
            dest[j + 2] = ((c >>> 16) & 0xff) / 255; // blue
            dest[j + 3] = ((c >>> 24) & 0xff) / 255; // alpha
        }
        return new RGBAFloatBuffer(w, h, dest);
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
        return RGBAFloatBuffer.fromImage(await img, width, height);
    }

    width: number;
    height: number;
    pixels: Float32Array;

    constructor(width: number, height = width, pixels?: Float32Array) {
        this.width = width;
        this.height = height;
        if (pixels) {
            ensureSize(pixels, width, height, 4);
            this.pixels = pixels;
        } else {
            this.pixels = new Float32Array(width * height * 4);
        }
    }

    blend(
        op: BlendFnFloat,
        buf: IPixelBuffer<Float32Array, ArrayLike<number>>,
        opts: Partial<BlitOpts>
    ) {
        blendFloat(op, this, buf, 4, opts);
    }

    blit(
        buf: IPixelBuffer<Float32Array, ArrayLike<number>>,
        opts: Partial<BlitOpts>
    ) {
        blitStrided(this, buf, 4, opts);
    }

    blitCanvas(canvas: HTMLCanvasElement, x = 0, y = 0) {
        const ctx = canvas.getContext("2d")!;
        const idata = ctx.getImageData(x, y, this.width, this.height);
        const dest = new Uint32Array(idata.data.buffer);
        const src = this.pixels;
        for (let i = src.length, j = dest.length; (i -= 4), --j >= 0; ) {
            dest[j] =
                ((clamp01(src[i + 2]) * 0xff) << 16) |
                ((clamp01(src[i + 1]) * 0xff) << 8) |
                (clamp01(src[i]) * 0xff) |
                ((clamp01(src[i + 3]) * 0xff) << 24);
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
        const dest = new RGBAFloatBuffer(w, h);
        this.blit(dest, { sx, sy, w, h });
        return dest;
    }

    getAt(x: number, y: number) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            const idx = ((x | 0) + (y | 0) * this.width) * 4;
            const pix = this.pixels;
            return [pix[idx], pix[idx + 1], pix[idx + 2], pix[idx + 3]];
        }
        return [0, 0, 0, 0];
    }

    setAt(x: number, y: number, col: ArrayLike<number>) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.pixels.set(col, ((x | 0) + (y | 0) * this.width) * 4);
        }
        return this;
    }

    getChannel(id: Channel): FloatBuffer {
        const dest = new Float32Array(this.width * this.height);
        const src = this.pixels;
        for (let i = dest.length, j = src.length + id; (j -= 4), --i >= 0; ) {
            dest[i] = src[j];
        }
        return new FloatBuffer(this.width, this.height, dest);
    }

    setChannel(id: Channel, buf: IPixelBuffer<Float32Array, number>) {
        const src = buf.pixels;
        const dest = this.pixels;
        for (let i = dest.length + id, j = src.length; (i -= 4), --j >= 0; ) {
            dest[i] = src[j];
        }
        return this;
    }

    grayscale() {
        const dest = new Float32Array(this.width * this.height);
        const src = this.pixels;
        for (let i = src.length; (i -= 4) >= 0; ) {
            dest[i >> 2] =
                src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114;
        }
        return new FloatBuffer(this.width, this.height, dest);
    }

    invert() {
        const pix = this.pixels;
        for (let i = pix.length; (i -= 4) >= 0; ) {
            pix[i] = 1 - clamp01(pix[i]);
            pix[i + 1] = 1 - clamp01(pix[i + 1]);
            pix[i + 2] = 1 - clamp01(pix[i + 2]);
        }
        return this;
    }
}
