import type {
    FnU2,
    IDeref,
    IEqualsDelta,
    NumericArray,
    Range,
    Tuple,
} from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { IVector, ReadonlyVec, Vec } from "@thi.ng/vectors";

export type Color = Vec;
export type ReadonlyColor = ReadonlyVec;

export type MaybeColor =
    | TypedColor<any>
    | IParsedColor
    | ReadonlyColor
    | string
    | number;

export type ColorOp = (out: Color | null, src: ReadonlyColor) => Color;

export type ColorMode =
    | "argb32"
    | "abgr32"
    | "hcy"
    | "hsi"
    | "hsl"
    | "hsv"
    | "lab50"
    | "lab65"
    | "lch"
    | "oklab"
    | "rgb"
    | "srgb"
    | "xyy"
    | "xyz50"
    | "xyz65"
    | "ycc";

/**
 * Hue names in radial order, e.g. used by {@link namedHueRgb}.
 */
export enum Hue {
    RED,
    ORANGE,
    YELLOW,
    CHARTREUSE,
    GREEN,
    SPRING_GREEN,
    CYAN,
    AZURE,
    BLUE,
    VIOLET,
    MAGENTA,
    ROSE,
}

export interface IColor {
    readonly mode: ColorMode;
}

export interface ChannelSpec {
    /**
     * Acceptable value range for this channel. Used by {@link TypedColor.clamp}.
     *
     * @defaultValue [0,1]
     */
    range?: Range;
    /**
     * If true, this channel is used to store normalized hue values.
     *
     * @defaultValue false
     */
    hue?: boolean;
}

export interface ColorSpec<M extends ColorMode, K extends string> {
    mode: M;
    /**
     * Define additional per-channel constraints, information. Currently only
     * used to define limits.
     */
    channels?: Partial<Record<K, ChannelSpec>>;
    /**
     * Channel names in index order (used to define channel accessors).
     */
    order: readonly K[];
    /**
     * Conversions from source modes. `rgb` is mandatory, others optional. If a
     * key specifies an array of functions, these will be applied to source
     * color in LTR order.
     */
    from: Partial<Record<ColorMode, ColorOp | Tuple<ColorOp, 2 | 3 | 4>>> & {
        rgb: ColorOp;
    };
    /**
     * Mandatory conversion to RGB mode. Used as fallback solution if no other
     * direct conversion path is defined (e.g. for CSS formatting).
     */
    toRgb: ColorOp | Tuple<ColorOp, 2 | 3 | 4>;
}

export type Conversions = Partial<Record<ColorMode, ColorOp>> & {
    rgb: ColorOp;
};

export interface ColorFactory<T extends TypedColor<any>> {
    (col: MaybeColor, buf?: NumericArray, idx?: number, stride?: number): T;
    (col?: Vec, idx?: number, stride?: number): T;
    (a: number, b: number, c: number, ...xs: number[]): T;

    readonly class: TypedColorConstructor<T>;

    /**
     * Returns a new random color, optionally backed by given memory. I.e. if
     * `buf` is given, the returned color will wrap `buf` from given `index`
     * (default: 0) and `stride` step size (default: 1).
     *
     * @param rnd - 
     * @param buf - 
     * @param index - 
     * @param stride - 
     */
    random(
        rnd?: IRandom,
        buf?: NumericArray,
        index?: number,
        stride?: number
    ): T;

    /**
     * Same as {@link TypedColor.range}.
     */
    readonly range: [ReadonlyColor, ReadonlyColor];

    /**
     * Returns array of memory mapped colors using given backing array and
     * stride settings.
     *
     * @remarks
     * The `cstride` is the step size between individual color components.
     * `estride` is the step size between successive colors and will default to
     * number of channels supported by given color type/space. This arrangement
     * allows for different storage approaches, incl. SOA, AOS, striped /
     * interleaved etc.
     *
     * @param buf - backing array
     * @param num - num vectors (default: buf.length / numChannels)
     * @param start -  start index (default: 0)
     * @param cstride - component stride (default: 1)
     * @param estride - element stride (default: numChannels)
     */
    mapBuffer(
        buf: NumericArray,
        num?: number,
        start?: number,
        cstride?: number,
        estride?: number
    ): T[];
}

export interface TypedColorConstructor<T extends TypedColor<any>> {
    new (buf?: NumericArray, offset?: number, stride?: number): T;
}

export interface TypedColor<T>
    extends IColor,
        IDeref<Color>,
        IEqualsDelta<T>,
        IVector<T>,
        Iterable<number> {
    /**
     * Backing array / memory
     */
    buf: NumericArray;
    /**
     * Start index in array
     */
    offset: number;
    /**
     * Step size between channels
     */
    stride: number;

    /**
     * A tuple of `[min, max]` where both are vectors specifying the
     * min/max channel ranges for this color type.
     *
     * @remarks
     * Even though there're several color spaces which do not impose limits on
     * at least some of their axes, the limits returned by this function
     * indicate RGB "safe" colors and were determined by projecting all RGB
     * colors into the color space used by this type.
     */
    readonly range: [ReadonlyColor, ReadonlyColor];

    /**
     * Clamps all color channels so that colors is inside RGB gamut.
     *
     * @remarks
     * Note: This is not a 100% guarantee, due to each channel being clamped
     * individually based on pre-determined limits.
     */
    clamp(): this;

    /**
     * Randomizes all color channels based on channel ranges defined for this
     * color type (usually [0..1] interval). Alpha channel will remain
     * untouched.
     *
     * @param rnd - 
     */
    randomize(rnd?: IRandom): this;

    /**
     * Copies `src` into this color's array.
     *
     * @param src - 
     */
    set(src: ReadonlyColor): this;

    /**
     * For memory mapped colors, this ensures only the elements used by this
     * color are being serialized (as array) by `JSON.stringify()`.
     */
    toJSON(): number[];
}

export interface IParsedColor extends IColor, IDeref<Color> {}

/**
 * Result type returned by {@link parseCss}, a simple wrapper for a raw color
 * array and color mode.
 */
export class ParsedColor implements IParsedColor {
    constructor(public readonly mode: ColorMode, public value: Color) {}

    deref() {
        return this.value;
    }
}

/**
 * A 4x5 matrix in column-major order
 */
export type ColorMatrix = Tuple<number, 20>;

export type ColorDistance<T = ReadonlyColor> = FnU2<T, number>;

export type ColorMixFn<T = ReadonlyColor> = (
    out: Color | null,
    a: T,
    b: T,
    t: number
) => Color;
