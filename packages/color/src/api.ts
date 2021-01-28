import type { FnN, FnU, FnU2, IDeref, Tuple } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { IVector, ReadonlyVec, Vec } from "@thi.ng/vectors";

export type ColorMode =
    | "hcy"
    | "hsi"
    | "hsl"
    | "hsv"
    | "lab"
    | "lch"
    | "oklab"
    | "rgb"
    | "srgb"
    | "xyy"
    | "xyz"
    | "ycc";

export type CSSColorName =
    | "aliceblue"
    | "antiquewhite"
    | "aqua"
    | "aquamarine"
    | "azure"
    | "beige"
    | "bisque"
    | "black"
    | "blanchedalmond"
    | "blue"
    | "blueviolet"
    | "brown"
    | "burlywood"
    | "cadetblue"
    | "chartreuse"
    | "chocolate"
    | "coral"
    | "cornflowerblue"
    | "cornsilk"
    | "crimson"
    | "cyan"
    | "darkblue"
    | "darkcyan"
    | "darkgoldenrod"
    | "darkgray"
    | "darkgreen"
    | "darkgrey"
    | "darkkhaki"
    | "darkmagenta"
    | "darkolivegreen"
    | "darkorange"
    | "darkorchid"
    | "darkred"
    | "darksalmon"
    | "darkseagreen"
    | "darkslateblue"
    | "darkslategray"
    | "darkslategrey"
    | "darkturquoise"
    | "darkviolet"
    | "deeppink"
    | "deepskyblue"
    | "dimgray"
    | "dimgrey"
    | "dodgerblue"
    | "firebrick"
    | "floralwhite"
    | "forestgreen"
    | "fuchsia"
    | "gainsboro"
    | "ghostwhite"
    | "gold"
    | "goldenrod"
    | "gray"
    | "grey"
    | "green"
    | "greenyellow"
    | "honeydew"
    | "hotpink"
    | "indianred"
    | "indigo"
    | "ivory"
    | "khaki"
    | "lavender"
    | "lavenderblush"
    | "lawngreen"
    | "lemonchiffon"
    | "lightblue"
    | "lightcoral"
    | "lightcyan"
    | "lightgoldenrodyellow"
    | "lightgray"
    | "lightgreen"
    | "lightgrey"
    | "lightpink"
    | "lightsalmon"
    | "lightseagreen"
    | "lightskyblue"
    | "lightslategray"
    | "lightslategrey"
    | "lightsteelblue"
    | "lightyellow"
    | "lime"
    | "limegreen"
    | "linen"
    | "magenta"
    | "maroon"
    | "mediumaquamarine"
    | "mediumblue"
    | "mediumorchid"
    | "mediumpurple"
    | "mediumseagreen"
    | "mediumslateblue"
    | "mediumspringgreen"
    | "mediumturquoise"
    | "mediumvioletred"
    | "midnightblue"
    | "mintcream"
    | "mistyrose"
    | "moccasin"
    | "navajowhite"
    | "navy"
    | "oldlace"
    | "olive"
    | "olivedrab"
    | "orange"
    | "orangered"
    | "orchid"
    | "palegoldenrod"
    | "palegreen"
    | "paleturquoise"
    | "palevioletred"
    | "papayawhip"
    | "peachpuff"
    | "peru"
    | "pink"
    | "plum"
    | "powderblue"
    | "purple"
    | "red"
    | "rosybrown"
    | "royalblue"
    | "saddlebrown"
    | "salmon"
    | "sandybrown"
    | "seagreen"
    | "seashell"
    | "sienna"
    | "silver"
    | "skyblue"
    | "slateblue"
    | "slategray"
    | "slategrey"
    | "snow"
    | "springgreen"
    | "steelblue"
    | "tan"
    | "teal"
    | "thistle"
    | "tomato"
    | "turquoise"
    | "violet"
    | "wheat"
    | "white"
    | "whitesmoke"
    | "yellow"
    | "yellowgreen"
    // additions
    | "rebeccapurple"
    | "transparent";

export type ColorRangePreset =
    | "light"
    | "dark"
    | "bright"
    | "weak"
    | "neutral"
    | "fresh"
    | "soft"
    | "hard"
    | "warm"
    | "cool"
    | "intense";

export type CosineGradientPreset =
    | "blue-cyan"
    | "blue-magenta-orange"
    | "blue-white-red"
    | "cyan-magenta"
    | "green-blue-orange"
    | "green-cyan"
    | "green-magenta"
    | "green-red"
    | "heat1"
    | "magenta-green"
    | "orange-blue"
    | "orange-magenta-blue"
    | "purple-orange-cyan"
    | "rainbow1"
    | "rainbow2"
    | "rainbow3"
    | "rainbow4"
    | "red-blue"
    | "yellow-green-blue"
    | "yellow-magenta-cyan"
    | "yellow-purple-magenta"
    | "yellow-red";

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

export type Color = Vec;
export type ReadonlyColor = ReadonlyVec;

export type ColorOp = (out: Color | null, src: ReadonlyColor) => Color;

/**
 * A 4x5 matrix in column-major order
 */
export type ColorMatrix = Tuple<number, 20>;

export type ColorDistance = FnU2<ReadonlyColor, number>;

export type ColorConversion<T> = (out: Color, src: T) => Color;

export interface ColorTargetConversion<T> {
    (col: IColor): T;
    (col: string | number | ReadonlyColor, mode: ColorMode): T;
}

export interface IColor {
    readonly mode: ColorMode;
}

export interface ChannelSpec {
    /**
     * @defaultValue [0,1]
     */
    range?: [number, number];
    default?: number;
}

export interface ColorSpec<M extends ColorMode, K extends string> {
    mode: M;
    channels: Record<K, ChannelSpec>;
    order: readonly K[];
    from: Partial<Record<ColorMode, ColorOp>> & { rgb: ColorOp };
}

export interface ColorFactory<T extends ColorType<any>> {
    (
        col: ColorType<any> | ParsedColor | string | number,
        buf?: Color,
        idx?: number,
        stride?: number
    ): T;
    (col?: Color, idx?: number, stride?: number): T;
    (a: number, b: number, c: number, ...xs: number[]): T;

    random(rnd?: IRandom): T;
}

export interface ColorType<T> extends IDeref<Color>, IVector<T> {
    readonly mode: ColorMode;
    readonly length: number;
    buf: Color;
    offset: number;
    stride: number;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export class ParsedColor implements IDeref<Color> {
    constructor(public readonly mode: ColorMode, public value: Color) {}

    deref() {
        return this.value;
    }
}

export type Range = [number, number];

export interface ColorRange {
    /**
     * Hue ranges
     */
    h?: Range[];
    /**
     * Saturation ranges
     */
    s?: Range[];
    /**
     * Brightness ranges
     */
    v?: Range[];
    /**
     * Alpha ranges
     */
    a?: Range[];
    /**
     * Black point ranges
     */
    b?: Range[];
    /**
     * White point ranges
     */
    w?: Range[];
}

export interface ColorRangeOpts {
    /**
     * Nunber of result colors.
     *
     * @defaultValue ∞
     */
    num: number;
    /**
     * Max. normalized & randomized hue shift for result colors. Only used if a
     * base color is given.
     *
     * @defaultValue 0.025
     */
    variance: number;
    /**
     * Tolerance for grayscale check (used for both saturation and brightness).
     *
     * @defaultValue 0.001
     */
    eps: number;
    /**
     * PRNG instance to use for randomized values
     *
     * @defaultValue {@link @thi.ng/random#SYSTEM}
     */
    rnd: IRandom;
}

export interface ColorThemePart {
    /**
     * Color range spec to use
     */
    range?: ColorRange | ColorRangePreset;
    /**
     * HSV(A) base color
     */
    base?: ReadonlyColor | CSSColorName;
    /**
     * Relative weight of this theme part
     *
     * @defaultValue 1.0
     */
    weight?: number;
}

export type ColorThemePartTuple =
    | [ColorRangePreset, CSSColorName, number?]
    | [ColorRangePreset | CSSColorName, number?]
    | ColorRangePreset
    | CSSColorName;

/**
 * @remarks
 * Reference: https://drafts.csswg.org/css-color/#typedef-system-color
 */
export interface SystemColors {
    /**
     * Background of application content or documents.
     */
    canvas: string;
    /**
     * Text in application content or documents.
     */
    canvastext: string;
    /**
     * Text in non-active, non-visited links. For light backgrounds,
     * traditionally blue.
     */
    linktext: string;
    /**
     * Text in visited links. For light backgrounds, traditionally purple.
     */
    visitedtext: string;
    /**
     * Text in active links. For light backgrounds, traditionally red.
     */
    activetext: string;
    /**
     * The face background color for push buttons.
     */
    buttonface: string;
    /**
     * Text on push buttons.
     */
    buttontext: string;
    /**
     * The base border color for push buttons.
     */
    buttonborder: string;
    /**
     * Background of input fields.
     */
    field: string;
    /**
     * Text in input fields.
     */
    fieldtext: string;
    /**
     * Background of selected items/text.
     */
    highlight: string;
    /**
     * Text of selected items/text.
     */
    highlighttext: string;
    /**
     * Background of text that has been specially marked (such as by the HTML
     * mark element).
     */
    mark: string;
    /**
     * Text that has been specially marked (such as by the HTML mark element).
     */
    marktext: string;
    /**
     * Disabled text. (Often, but not necessarily, gray.)
     */
    graytext: string;
}

export type CosCoeffs = Tuple<number, 4>;
export type CosGradientSpec = Tuple<CosCoeffs, 4>;

/**
 * A tuple of normalized position and color for a gradient stop.
 */
export type GradientColorStop = [number, ReadonlyColor];

export interface MultiGradientOpts {
    num: number;
    stops: GradientColorStop[];
    easing?: FnN;
    tx?: FnU<Color>;
}
