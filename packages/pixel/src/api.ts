import { TypedArray } from "@thi.ng/api";

export interface CanvasContext {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
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
     * Blits pixels into given `dest` pixel buffer at position `x`, `y`
     * (0,0 by default). If `dest` buffer is smaller than source buffer,
     * only the top-left region will be written.
     *
     * Destination MUST be of same format as original. No conversion is
     * performed.
     *
     * @param dest
     * @param dx
     * @param dy
     * @param sx
     * @param sy
     * @param w
     * @param h
     */
    blit(
        dest: IPixelBuffer<T, P>,
        dx?: number,
        dy?: number,
        sx?: number,
        sy?: number,
        w?: number,
        h?: number
    ): void;

    /**
     * Converts and blits pixels into given canvas at position `x`, `y`
     * (0,0 by default). If canvas is smaller than source buffer, only
     * the top-left region will be written.
     */
    blitCanvas(canvas: HTMLCanvasElement, x?: number, y?: number): void;
}

export interface IInvert {
    invert(): this;
}

export interface IGrayscale<T extends TypedArray, P> {
    grayscale(): IPixelBuffer<T, P>;
}

export interface IColorChannel<T extends TypedArray> {
    /**
     * Returns new pixel buffer of selected color channel. The extracted
     * values are a copy of the original.
     */
    getChannel(id: Channel): IPixelBuffer<T, number>;
    /**
     * Replaces selected color channel with values from given pixel
     * buffer, which MUST be of same size as target.
     *
     * @param id
     * @param buf
     */
    setChannel(id: Channel, buf: IPixelBuffer<T, number>): this;
}

/**
 * Color channel IDs
 */
export const enum Channel {
    RED,
    GREEN,
    BLUE,
    ALPHA
}
