import type {
    FloatArray,
    Fn,
    Fn2,
    Fn3,
    FnN,
    FnU2,
    IGrid2D,
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

export interface IntChannelSpec {
    /**
     * Channel size in bits (1-8)
     */
    size: number;
    /**
     * Related ABGR lane this channel is mapped from/to. Only used if
     * parent format uses auto-generated {@link IABGRConvert} implementation
     * (i.e. only if no-user defined converters are given to
     * {@link IntFormatSpec}).
     */
    lane?: Lane;
}

export interface IntChannel {
    /**
     * Channel size in bits (1-8)
     */
    size: number;
    /**
     * Number of possible values in channel (i.e. `1 << size`)
     */
    num: number;
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
}

/**
 * Format configuration passed to {@link defIntFormat}.
 */
export interface IntFormatSpec extends Partial<IABGRConvert<number>> {
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
    channels: IntChannelSpec[];
}

/**
 * Compiled format object returned by {@link defIntFormat}.
 */
export interface IntFormat extends IABGRConvert<number> {
    type: UintType;
    size: number;
    alpha: number;
    channels: IntChannel[];
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
    data: Uint32Array;
}

export interface IPixelBuffer<T extends TypedArray = TypedArray, P = any>
    extends IGrid2D<T, P> {
    readonly width: number;
    readonly height: number;
    readonly format: IABGRConvert<any>;

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

export interface IBlit<T extends IPixelBuffer> {
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
    blit(dest: T, opts?: Partial<BlitOpts>): void;

    /**
     * Converts and blits pixels into given canvas (or canvas context) at
     * position `x`, `y` (0,0 by default). If canvas is smaller than source
     * buffer, only the top-left region will be written.
     */
    blitCanvas(
        canvas: HTMLCanvasElement | CanvasRenderingContext2D,
        x?: number,
        y?: number
    ): void;
}

export interface IToImageData {
    /**
     * Returns the contents of the pixel buffer as HTML canvas `ImageData`.
     */
    toImageData(): ImageData;
}

export interface IBlend<T extends IPixelBuffer, F> {
    /**
     * Uses given `op` function to blend / compose pixels of this buffer
     * with those of `dest` and writes results into `dest`. Supports
     * same options as `blit()`.
     *
     * @param op -
     * @param dest -
     * @param opts -
     */
    blend(op: F, dest: T, opts?: Partial<BlitOpts>): void;
}

export interface IInvert<T extends IPixelBuffer> {
    invert(): T;
}

export interface IResizable<T extends IPixelBuffer, F> {
    scale(scale: number, sampler?: F | Filter): T;

    resize(w: number, h: number, sampler?: F | Filter): T;
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
    /**
     * Pixel read offset, only to be used for pooling operations. Should be set
     * to `kernelSize/2` and MUST be in `[0,stride)` interval.
     */
    offset?: number | [number, number];
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

export type FloatSampler = FnU2<number, NumericArray>;

export interface Canvas2DOpts {
    /**
     * (Native) options passed to `canvas.getContext("2d")`
     */
    ctx: CanvasRenderingContext2DSettings;
    /**
     * If true, adds CSS rule to force canvas being displayed properly pixelated
     * (no smoothing)
     */
    pixelated: boolean;
}
