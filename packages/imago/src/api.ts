import type { Fn, Fn3, Keys, Range1_4, TypedArray } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import type {
	AvifOptions,
	Blend,
	Exif,
	ExtendWith,
	FitEnum,
	GifOptions,
	Jp2Options,
	JpegOptions,
	JxlOptions,
	KernelEnum,
	Metadata,
	OverlayOptions,
	PngOptions,
	Sharp,
	TiffOptions,
	TileOptions,
	WebpOptions,
} from "sharp";

/**
 * ```text
 * nw -- n -- ne
 *  |    |    |
 *  w -- c -- e
 *  |    |    |
 * sw -- s -- se
 * ```
 */
export type Gravity = "c" | "e" | "n" | "ne" | "nw" | "s" | "se" | "sw" | "w";

export type DitherMode =
	| "atkinson"
	| "burkes"
	| "column"
	| "diffusion"
	| "floyd"
	| "jarvis"
	| "row"
	| "sierra"
	| "stucki"
	| "bayer";

export type Dim = [number, number];

export type Size = number | Dim;

export type Sides = [number, number, number, number];

export type SizeRef = "min" | "max" | "w" | "h" | "both";

export type SizeUnit = "px" | "%";

export type Color =
	| string
	| number[]
	| { r: number; g: number; b: number; alpha?: number };

/**
 * Position defined by max. 2 components/coordinates. If none are defined, the
 * position will be interpreted as centered.
 */
export interface Position {
	l?: number;
	r?: number;
	t?: number;
	b?: number;
}

export type BufferLike = TypedArray | Buffer;

export type Processor = Fn3<
	ProcSpec,
	Sharp,
	ImgProcCtx,
	Promise<[Sharp, boolean]>
>;

export type CompLayerFn = Fn3<
	CompLayer,
	Sharp,
	ImgProcCtx,
	Promise<OverlayOptions>
>;

export interface ProcSpec {
	/**
	 * Unique processor ID. Used to by {@link processor} to select correct
	 * implementation.
	 */
	op: string;
}

export interface BlurSpec extends ProcSpec {
	op: "blur";
	/**
	 * Blur radius in pixels (can be fractional)
	 */
	radius: number;
}

export interface CompSpec extends ProcSpec {
	op: "composite";
	layers: CompLayer[];
}

export interface CompLayer {
	/**
	 * Unique layer type, used by {@link composite} and {@link defLayer} to
	 * select correct layer implementation.
	 */
	type: string;
	/**
	 * Layer blend mode. See [Sharp
	 * docs](https://sharp.pixelplumbing.com/api-composite#composite) for list
	 * of available modes.
	 *
	 * @defaultValue "over"
	 */
	blend?: Blend;
	/**
	 * Abstracted layer position. This option is only used if no
	 * {@link CompLayer.pos} is specified. It also controls alignment
	 * of tiling when {@link CompLayer.tile} is enabled. If neither gravity
	 * or position are configured, the layer will be centered.
	 */
	gravity?: Gravity;
	/**
	 * Partial layer position given in units of {@link CompLayer.unit}. At
	 * most 2 coordinate can be given here (e.g. left & top). The right & bottom
	 * values are overriding left/top (in case of conflict).
	 *
	 * @remarks
	 * Note: This option takes precedence over {@link CompLayer.gravity}. If
	 * neither gravity or position are configured, the layer will be centered.
	 */
	pos?: Position;
	/**
	 * Origin/reference point for the given layer position
	 * {@link CompLayer.pos}. Only used if position is given.
	 *
	 * @remarks
	 * The given value specifies one of the 9 points in the layer which is to be
	 * used for the layer position (e.g. "se" for south-east aka bottom-right
	 * corner).
	 *
	 * If not given, it will be auto-determined by provided position config,
	 * e.g. a `pos` with right & top coords will have an implicit origin of `ne`
	 * (aka north-east). See gravity diagram {@link Gravity}.
	 */
	origin?: Gravity;
	/**
	 * Only used if {@link CompLayer.unit} is percent (`%`). Reference side
	 * ID for computing positions and sizes. See {@link SizeRef} for details.
	 *
	 * @defaultValue "both"
	 */
	ref?: SizeRef;
	/**
	 * If true, the layer will be repeated across the entire image with the
	 * given {@link CompLayer.gravity}.
	 */
	tile?: boolean;
	/**
	 * Unit to use for {@link CompLayer.pos} and sizes (where
	 * supported). If `%`, the given values are interpreted as percentages,
	 * relative to configured {@link CompLayer.ref} side.
	 *
	 * @defaultValue "px"
	 */
	unit?: SizeUnit;
	// allow custom extensions
	[id: string]: any;
}

export interface ColorLayer extends CompLayer {
	type: "color";
	/**
	 * Layer fill/background color.
	 */
	bg: Color;
	size?: Size;
}

export interface ImgLayer extends CompLayer {
	type: "img";
	/**
	 * Image as buffer (must be in one of sharp's supported image formats, use
	 * {@link rawLayer} / {@link RawLayer} for compositing raw image data)
	 */
	buffer?: BufferLike;
	/**
	 * File path to image, alternative to {@link ImgLayer.buffer}.
	 */
	path?: string;
	/**
	 * Layer target size (in units defined via {@link CompLayer.unit})
	 */
	size?: Size;
}

export interface RawLayer extends CompLayer {
	type: "raw";
	buffer: BufferLike;
	channels: Range1_4;
	size: [number, number];
}

export interface SVGLayer extends CompLayer {
	type: "svg";
	/**
	 * Inline SVG document, alternative to {@link SVGLayer.path}.
	 */
	body?: string;
	/**
	 * File path to SVG document.
	 */
	path?: string;
}

export interface TextLayer extends CompLayer {
	type: "text";
	/**
	 * Background color.
	 *
	 * @defaultValue "#0000"
	 */
	bg?: string;
	/**
	 * Body text. Alternative to {@link TextLayer.path}. If given as function,
	 * the function will be called with the processing context and must return a
	 * string.
	 *
	 * @defaultValue ""
	 */
	body?: string | Fn<ImgProcCtx, string>;
	/**
	 * Text color
	 *
	 * @defaultValue "#fff"
	 */
	color?: string;
	font?: string;
	fontSize?: number | string;
	padding?: number;
	path?: string;
	/**
	 * Layer/textbox size. Required
	 */
	size: Dim;
	textGravity?: Gravity;
}

export interface CropSpec extends ProcSpec {
	op: "crop";
	/**
	 * Target aspect ratio. Only used if {@link CropSpec.size} is given as
	 * single numeric value (pixels or percentage). If the aspect ratio is >1,
	 * the general aspect of the cropped image will remain principally the same,
	 * i.e. a portait image will remain portait (but cropped), ditto for
	 * landscape. If the given aspect raatio is <1, the aspect of the image will
	 * be flipped/swapped, i.e. a portait aspect becomes landscape and vice
	 * versa.
	 *
	 * @example
	 * ```js
	 * // crop image to 3:2 aspect ratio
	 * { op: "crop", size: 100, unit: "%", aspect: 3/2 }
	 * ```
	 */
	aspect?: number;
	border?: Size | Sides;
	gravity?: Gravity;
	origin?: Gravity;
	pos?: Position;
	ref?: SizeRef;
	size?: Size;
	unit?: SizeUnit;
}

export interface DitherSpec extends ProcSpec {
	op: "dither";
	mode: DitherMode;
	num: number;
	rgb?: boolean;
	size?: 2 | 4 | 8;
}

export interface EXIFSpec extends ProcSpec {
	op: "exif";
	tags: Exif;
}

export interface ExtendSpec extends ProcSpec {
	op: "extend";
	bg?: Color;
	border: Size | Sides;
	mode?: ExtendWith;
	ref?: SizeRef;
	unit?: SizeUnit;
}

export interface GammaSpec extends ProcSpec {
	op: "gamma";
	gamma: number;
}

export interface GrayscaleSpec extends ProcSpec {
	op: "gray";
	gamma?: number | boolean;
}

export interface HSBLSpec extends ProcSpec {
	op: "hsbl";
	h?: number;
	s?: number;
	b?: number;
	l?: number;
}

export interface NestSpec extends ProcSpec {
	op: "nest";
	/**
	 * Array of one or more arrays of processing pipeline specs. All pipelines
	 * are spawned via `Promise.all()` and each one receives a separate clone of
	 * the current input image.
	 */
	procs: ProcSpec[][];
}

export interface OutputSpec extends ProcSpec {
	op: "output";
	/**
	 * Unique ID of this output, used to record the file path in the `outputs`
	 * object returned by {@link processImage}.
	 */
	id: string;
	/**
	 * Possibly templated output path. See {@link formatPath} for details.
	 * Ignored if {@link OutputSpec.blurhash} is being used, otherwise **required**.
	 */
	path?: string;
	/**
	 * AVIF output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#avif)
	 */
	avif?: AvifOptions;
	/**
	 * If given, ONLY the blurhash of the image will be computed and stored in
	 * the `outputs` object returned by {@link processImage}. The
	 * {@link OutputSpec.path} will be ignored and no file will be written.
	 *
	 * @remarks
	 * The value given is the blurhash detail setting in the [1,9] range (usual
	 * default is 4), possibly given separately for X/Y axes.
	 *
	 * Important: Ensure the image has already been downsized to ~50-500 pixels.
	 * Larger images are causing unnecessary & long processing...
	 */
	blurhash?: true | number | [number, number];
	/**
	 * GIF output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#gif)
	 */
	gif?: GifOptions;
	/**
	 * JPEG 2000 output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#jp2)
	 */
	jp2?: Jp2Options;
	/**
	 * JPEG output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#jpeg)
	 */
	jpeg?: JpegOptions;
	/**
	 * JPEG XL output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#jxl)
	 */
	jxl?: JxlOptions;
	/**
	 * PNG output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#avif)
	 */
	png?: PngOptions;
	/**
	 * Raw binary output options.
	 */
	raw?:
		| boolean
		| {
				/**
				 * If true, ensures the buffer has an alpha channel
				 */
				alpha?: boolean;
				/**
				 * If true, writes a secondary file with this buffer's metadata (in
				 * the same dir, using `.meta.json` as suffix)
				 */
				meta?: boolean;
		  };
	/**
	 * Tiled format output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#tile)
	 */
	tile?: TileOptions;
	/**
	 * TIFF output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#tiff)
	 */
	tiff?: TiffOptions;
	/**
	 * WebP output options. See [Sharp docs](https://sharp.pixelplumbing.com/api-output#webp)
	 */
	webp?: WebpOptions;
}

export interface ResizeSpec extends ProcSpec {
	op: "resize";
	bg?: Color;
	filter?: Keys<KernelEnum>;
	fit?: Keys<FitEnum>;
	gravity?: Gravity;
	ref?: SizeRef;
	/**
	 * New size of the image, expressed in pixels or percentages.
	 *
	 * @remarks
	 * If using pixels and size is a single number, it will be interpreted as
	 * the target size of the longest side and the other side scaled
	 * proportionally, using current aspect ratio.
	 *
	 * If given as `[width,height]` tuple, a negative value for a side makes
	 * that side proportionally scaled. relative to the other. E.g. a size of
	 * `[1280,-1]` scales the image to 1280 pixels wide and the height computed
	 * based on current aspect ratio.
	 */
	size: Size;
	unit?: SizeUnit;
}

export interface RotateSpec extends ProcSpec {
	op: "rotate";
	angle?: number;
	bg?: Color;
	flipX?: boolean;
	flipY?: boolean;
}

export interface ImgProcOpts {
	/**
	 * Logger instance to use (by default uses builtin module logger, linked to
	 * umbrella `ROOT` logger)
	 */
	logger: ILogger;
	/**
	 * Base directory for {@link output} steps
	 */
	outDir: string;
	/**
	 * By default all input metadata will be lost in the output(s). If this
	 * option is enabled, keeps existing EXIF data and attaches it to output
	 * (also where the output format actually supports it).
	 *
	 * @remarks
	 * TODO currently still unsupported
	 */
	keepEXIF: boolean;
	/**
	 * By default all input metadata will be lost in the output(s). If this
	 * option is enabled, keeps existing ICC profile from input image and
	 * attaches it to output (also where the output format actually supports
	 * it).
	 */
	keepICC: boolean;
	/**
	 * An object with custom output path replacements for {@link formatPath}. If
	 * a given replacement value is a function, it will be called with the
	 * current {@link ImgProcCtx}, the current {@link OutputSpec} (e.g. to
	 * obtain configured options) and the already serialized image as buffer.
	 *
	 * @remarks
	 * Replacement IDs in this object will take precedence over built-in
	 * replacement IDs, e.g. allowing to override `name`, `date` etc.
	 */
	pathParts: Record<
		string,
		Fn3<ImgProcCtx, OutputSpec, BufferLike, string> | string
	>;
}

export interface ImgProcCtx {
	path?: string;
	size: Dim;
	meta: Metadata;
	exif: Exif;
	iccFile?: string;
	logger: ILogger;
	opts: Partial<ImgProcOpts>;
	/**
	 * Paths of all exported images, keyed by IDs given via {@link OutputSpec} /
	 * {@link output}.
	 */
	outputs: Record<string, string>;
}

export const GRAVITY_POSITION: Record<Gravity, string> = {
	c: "center",
	e: "right",
	n: "top",
	ne: "right top",
	nw: "left top",
	s: "bottom",
	se: "right bottom",
	sw: "left bottom",
	w: "left",
};

export const GRAVITY_MAP: Record<Gravity, string> = {
	n: "north",
	ne: "northeast",
	se: "southeast",
	s: "south",
	sw: "southwest",
	w: "west",
	nw: "northwest",
	e: "east",
	c: "center",
};
