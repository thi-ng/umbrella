import { Fn2, TypedArray } from "@thi.ng/api";

/**
 * Color channel IDs
 */
export const enum Channel {
    RED,
    GREEN,
    BLUE,
    ALPHA,
    GRAY
}

export type RGBAChannel =
    | Channel.RED
    | Channel.GREEN
    | Channel.BLUE
    | Channel.ALPHA;

export type GAChannel = Channel.GRAY | Channel.ALPHA;

export type BlendFnInt = Fn2<number, number, number>;

export type BlendFnFloat = (
    out: number[] | TypedArray | null,
    src: ArrayLike<number>,
    dest: ArrayLike<number>
) => ArrayLike<number>;

export interface CanvasContext {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

export interface RawPixelBuffer extends CanvasContext {
    img: ImageData;
    pixels: Uint32Array;
}

export interface IPixelBuffer<T extends TypedArray, P> {
    width: number;
    height: number;
    pixels: T;

    /**
     * Returns pixel value at given position. If pos is outside the
     * defined region, returns a suitable zero value.
     *
     * @param x
     * @param y
     */
    getAt(x: number, y: number): P;

    /**
     * Writes pixel value at given position. Has no effect if outside of
     * the defined region.
     *
     * @param x
     * @param y
     * @param col
     */
    setAt(x: number, y: number, col: P): this;

    /**
     * Extracts region as new pixel buffer in same format.
     *
     * @param x
     * @param y
     * @param width
     * @param height
     */
    getRegion(
        x: number,
        y: number,
        width: number,
        height: number
    ): IPixelBuffer<T, P>;
}

export interface IBlit<T extends TypedArray, P> {
    /**
     * Blits pixels into given `dest` pixel buffer, using provided
     * options. If `dest` buffer is smaller than source buffer, only the
     * top-left region will be written.
     *
     * Destination MUST be of same format as original. No conversion is
     * performed.
     *
     * @param dest
     * @param opts
     */
    blit(dest: IPixelBuffer<T, P>, opts?: Partial<BlitOpts>): void;

    /**
     * Converts and blits pixels into given canvas at position `x`, `y`
     * (0,0 by default). If canvas is smaller than source buffer, only
     * the top-left region will be written.
     */
    blitCanvas(canvas: HTMLCanvasElement, x?: number, y?: number): void;
}

export interface IBlend<F, T extends TypedArray, P> {
    /**
     * Uses given `op` function to blend / compose pixels of this buffer
     * with those of `dest` and writes results into `dest`. Supports
     * same options as `blit()`.
     *
     * @param op
     * @param dest
     * @param opts
     */
    blend(op: F, dest: IPixelBuffer<T, P>, opts?: Partial<BlitOpts>): void;
}

export interface IInvert {
    invert(): this;
}

export interface IGrayscale<T extends TypedArray, P> {
    grayscale(): IPixelBuffer<T, P>;
}

export interface IColorChannel<T extends TypedArray, C> {
    /**
     * Returns new pixel buffer of selected color channel. The extracted
     * values are a copy of the original.
     */
    getChannel(id: C): IPixelBuffer<T, number>;
    /**
     * Replaces selected color channel with values from given pixel
     * buffer, which MUST be of same size as target.
     *
     * @param id
     * @param buf
     */
    setChannel(id: C, buf: IPixelBuffer<T, number>): this;
}

export interface BlitOpts {
    /**
     * Destination X position (top-left), default: 0
     */
    dx: number;
    /**
     * Destination Y position (top-left), default: 0
     */
    dy: number;
    /**
     * Source X position (top-left), default: 0
     */
    sx: number;
    /**
     * Source Y position (top-left), default: 0
     */
    sy: number;
    /**
     * Source region width (default: buffer width)
     */
    w: number;
    /**
     * Source region width (default: buffer height)
     */
    h: number;
}
