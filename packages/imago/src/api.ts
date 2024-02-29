import type { Fn, Fn3, Keys, TypedArray } from "@thi.ng/api";
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

export interface Position {
	l?: number;
	r?: number;
	t?: number;
	b?: number;
}

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
	op: string;
}

export interface BlurSpec extends ProcSpec {
	op: "blur";
	radius: number;
}

export interface CompSpec extends ProcSpec {
	op: "composite";
	layers: CompLayer[];
}

export type CompLayer = ImgLayer | SVGLayer;

export interface CompLayerBase {
	type: string;
	blend?: Blend;
	/**
	 * Abstracted layer position. If given, takes precedence over
	 * {@link CompLayerBase.position}. If neither gravity or position are
	 * configured, the layer will be centered.
	 */
	gravity?: Gravity;
	/**
	 * Partial layer position given in units of {@link CompLayerBase.unit}. At
	 * most 2 coordinate can be given here (e.g. left & top). The right & bottom
	 * values are overriding left/top (in case of conflict).
	 *
	 * @remarks
	 * Note: This option is only used if no {@link CompLayerBase.gravity} is
	 * specified. If neither gravity or position are configured, the layer will
	 * be centered.
	 */
	pos?: Position;
	/**
	 * Only used if {@link CompLayerBase.unit} is percent (`%`). Reference side
	 * ID for computing positions and sizes. See {@link SizeRef} for details.
	 *
	 * @defaultValue "min"
	 */
	ref?: SizeRef;
	tile?: boolean;
	/**
	 * Unit to use for {@link CompLayerBase.position} and sizes (where
	 * supported). If `%`, the given values are interpreted as percentages,
	 * relative to configured {@link CompLayerBase.ref} side.
	 *
	 * @defaultValue "px"
	 */
	unit?: SizeUnit;
	// allow custom extensions
	[id: string]: any;
}

export interface ImgLayer extends CompLayerBase {
	type: "img";
	path: string;
	size?: Size;
}

export interface SVGLayer extends CompLayerBase {
	type: "svg";
	body: string;
	path: string;
}

export interface TextLayer extends CompLayerBase {
	type: "text";
	bg: string;
	body: string | Fn<ImgProcCtx, string>;
	color: string;
	font: string;
	fontSize: number | string;
	padding: number;
	path: string;
	size: Dim;
	textGravity: Gravity;
}

export interface CropSpec extends ProcSpec {
	op: "crop";
	border?: Size | Sides;
	gravity?: Gravity;
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
	size: 2 | 4 | 8;
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
	 * Ignored if {@link OutputSpec.blurhash} is being used.
	 */
	path: string;
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
	 * Important: Ensure the image has already been downsized to ~50-500 pixels.
	 * Larger images are causing unnecessary & long processing...
	 */
	blurhash?: {
		/**
		 * Blurhash detail setting in 1-9 range, possibly given separately for
		 * X/Y axis.
		 *
		 * @defaultValue 4
		 */
		detail?: number | [number, number];
	};
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
	ref: SizeRef;
	size: Size;
	unit?: SizeUnit;
}

export interface RotateSpec extends ProcSpec {
	op: "rotate";
	angle?: number;
	bg: Color;
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
		Fn3<ImgProcCtx, OutputSpec, Buffer | TypedArray, string> | string
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
