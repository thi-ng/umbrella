import type {
    FloatArray,
    Fn,
    Fn2,
    Fn3,
    FnN,
    FnU2,
    IObjectOf,
    NumericArray,
    TypedArray,
    UintType,
} from "@thi.ng/api";

/**
 * ABGR 8bit lane/channel IDs
 */
export enum Lane {
    ALPHA = 0,
    BLUE = 1,
    GREEN = 2,
    RED = 3,
}

/**
 * Wrap behaviors (currently unused)
 */
export type Wrap = "clamp" | "wrap" | "repeat";

/**
 * Filtered access types (currently unused)
 */
export type Filter = "nearest" | "linear" | "cubic";

/**
 * Blend function (for packed integers) given to IBlend implementations.
 */
export type BlendFnInt = Fn2<number, number, number>;

export type BlendFnFloat = (
    out: NumericArray | null,
    src: NumericArray,
    dest: NumericArray
) => NumericArray;

/**
 * Color channel getter. Returns 0-based channel value (regardless of
 * shift/bit position)
 */
export type ChannelGetter<T> = Fn<T, number>;
/**
 * Color channel setter. Takes current full pixel value and 0-based
 * channel value to set (regardless of shift/bit position). Returns
 * updated pixel value.
 */
export type ChannelSetter<T> = Fn2<T, number, T>;

export interface IABGRConvert<T> {
    /**
     * Converts given ABGR value into internal pixel format.
     */
    fromABGR: (x: number, out?: T) => T;
    /**
     * Converts given internal pixel format value to packed ABGR.
     */
    toABGR: Fn<T, number>;
}

export interface PackedChannelSpec {
    /**
     * Channel size in bits (1-8)
     */
    size: number;
    /**
     * Related ABGR lane this channel is mapped from/to. Only used if
     * parent format uses auto-generated {@link IABGRConvert} implementation
     * (i.e. only if no-user defined converters are given to
     * {@link PackedFormatSpec}).
     */
    lane?: Lane;
}

export interface PackedChannel {
    /**
     * Channel size in bits (1-8)
     */
    size: number;
    /**
     * Bit shift offset (in bits, not shifted value)
     */
    shift: number;
    /**
     * Shift from ABGR channel offset
     */
    abgrShift: number;
    /**
     * 0-based channel bit mask (WRT parent format)
     */
    mask0: number;
    /**
     * Aligned bit mask (WRT parent format)
     */
    maskA: number;
    /**
     * Original channel/lane ID in ABGR
     */
    lane: Lane;
    /**
     * Int value accessor
     */
    int: ChannelGetter<number>;
    /**
     * Int value accessor
     */
    setInt: ChannelSetter<number>;
    /**
     * Normalized float accessor
     */
    float: ChannelGetter<number>;
    /**
     * Normalized float accessor
     */
    setFloat: ChannelSetter<number>;
    /**
     * Applies ordered dithering to given channel value.
     */
    dither: (
        mat: BayerMatrix,
        steps: number,
        x: number,
        y: number,
        val: number
    ) => number;
}

/**
 * Format configuration passed to {@link defPackedFormat}.
 */
export interface PackedFormatSpec extends Partial<IABGRConvert<number>> {
    /**
     * Storage / typed array type
     */
    type: UintType;
    /**
     * Number of actual used bits (must be <= `size`)
     */
    size: number;
    /**
     * Number of alpha channel bits. MUST be given if format uses alpha
     * channel.
     *
     * @defaultValue 0
     */
    alpha?: number;
    /**
     * Individual channel configurations
     */
    channels: PackedChannelSpec[];
}

/**
 * Compiled format object returned by {@link defPackedFormat}.
 */
export interface PackedFormat extends IABGRConvert<number> {
    type: UintType;
    size: number;
    alpha: number;
    channels: PackedChannel[];
    // internal marker only
    readonly __packed: true;
}

export interface FloatFormatSpec {
    alpha?: boolean;
    gray?: boolean;
    channels: Lane[];
    /**
     * If given, {@link defFloatFormat} won't generate conversions and use those
     * provided instead.
     */
    convert?: IABGRConvert<NumericArray>;
}

export interface FloatFormat extends IABGRConvert<NumericArray> {
    alpha: boolean;
    gray: boolean;
    size: number;
    shift: IObjectOf<number>;
    channels: Lane[];
    // internal marker only
    readonly __float: true;
}

export interface CanvasContext {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

export interface RawPixelBuffer extends CanvasContext {
    img: ImageData;
    pixels: Uint32Array;
}

export interface IPixelBuffer<T extends TypedArray = TypedArray, P = any> {
    readonly width: number;
    readonly height: number;
    readonly format: IABGRConvert<any>;
    readonly stride: number;
    readonly pixels: T;

    /**
     * Returns pixel value at given position. If pos is outside the
     * defined region, returns a suitable zero value.
     *
     * @param x -
     * @param y -
     */
    getAt(x: number, y: number): P;

    /**
     * Writes pixel value at given position. Has no effect if outside of
     * the defined region.
     *
     * @param x -
     * @param y -
     * @param col -
     */
    setAt(x: number, y: number, col: P): this;

    /**
     * Extracts region as new pixel buffer in same format.
     *
     * @param x -
     * @param y -
     * @param width -
     * @param height -
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
     * @param dest -
     * @param opts -
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
     * @param op -
     * @param dest -
     * @param opts -
     */
    blend(op: F, dest: IPixelBuffer<T, P>, opts?: Partial<BlitOpts>): void;
}

export interface IInvert {
    invert(): this;
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
     * @param id -
     * @param buf -
     */
    setChannel(id: C, buf: IPixelBuffer<T, number> | number): this;
}

export interface BlitOpts {
    /**
     * Destination X position (top-left)
     *
     * @defaultValue 0
     */
    dx: number;
    /**
     * Destination Y position (top-left)
     *
     * @defaultValue 0
     */
    dy: number;
    /**
     * Source X position (top-left)
     *
     * @defaultValue 0
     */
    sx: number;
    /**
     * Source Y position (top-left)
     *
     * @defaultValue 0
     */
    sy: number;
    /**
     * Source region width
     *
     * @defaultValue buffer width
     */
    w: number;
    /**
     * Source region width
     *
     * @defaultValue buffer height
     */
    h: number;
}

export type BayerSize = 1 | 2 | 4 | 8 | 16 | 32 | 64;

export interface BayerMatrix {
    mat: number[][];
    invSize: number;
    mask: number;
}

export type PoolTemplate = Fn3<string[], number, number, string>;

export interface ConvolutionKernelSpec {
    /**
     * Kernel coefficients.
     */
    spec: NumericArray;
    /**
     * Kernel size. If given as number, expands to `[size, size]`.
     */
    size: number | [number, number];
}

export interface PoolKernelSpec {
    /**
     * Code template function for {@link defPoolKernel}.
     */
    pool: PoolTemplate;
    /**
     * Kernel size. If given as number, expands to `[size, size]`.
     */
    size: number | [number, number];
}

export interface KernelFnSpec {
    /**
     * Kernel factory.
     */
    fn: Fn<IPixelBuffer<FloatArray, NumericArray>, FnN>;
    /**
     * Kernel size. If given as number, expands to `[size, size]`.
     */
    size: number | [number, number];
}

export type KernelSpec = ConvolutionKernelSpec | PoolKernelSpec | KernelFnSpec;

export interface ConvolveOpts {
    /**
     * Convolution kernel details/implementation.
     */
    kernel: KernelSpec;
    /**
     * Channel ID to convolve.
     *
     * @defaultValue 0
     */
    channel?: number;
    /**
     * If true, the result image will be same size as source image with empty
     * (padded) border pixels.
     *
     * @defaultValue true
     */
    pad?: boolean;
    /**
     * Result scale factor
     *
     * @defaultValue 1
     */
    scale?: number;
    /**
     * Step size to process only every nth pixel.
     *
     * @defaultValue 1
     */
    stride?: number | [number, number];
}

export interface NormalMapOpts {
    /**
     * Channel ID to use for gradient extraction in source image.
     *
     * @defaultValue 0
     */
    channel: number;
    /**
     * Step size (aka number of pixels) between left/right, top/bottom
     * neighbors.
     *
     * @defaultValue 0
     */
    step: number;
    /**
     * Result gradient scale factor(s).
     *
     * @defaultValue 1
     */
    scale: number | [number, number];
    /**
     * Z-axis value to use in blue channel of normal map.
     *
     * @defaultValue 1
     */
    z: number;
}

export type IntSampler = FnU2<number>;

export type FloatSampler = FnU2<number, FloatArray>;
