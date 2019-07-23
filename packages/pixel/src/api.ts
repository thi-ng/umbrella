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
     * Blits pixels into given `dest` pixel buffer at position `x`, `y`
     * (0,0 by default). If `dest` buffer is smaller than source buffer,
     * only the top-left region will be written.
     *
     * Destination MUST be of same format as original. No conversion is
     * performed.
     *
     * @param dest
     * @param x
     * @param y
     */
    blit(dest: IPixelBuffer<T, P>, x?: number, y?: number): void;

    /**
     * Converts and blits pixels into given canvas at position `x`, `y`
     * (0,0 by default). If canvas is smaller than source buffer, only
     * the top-left region will be written.
     */
    blitCanvas(canvas: HTMLCanvasElement, x?: number, y?: number): void;

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
