import type {
	BlurSpec,
	ColorLayer,
	CompLayer,
	CompSpec,
	CropSpec,
	DitherSpec,
	EXIFSpec,
	ExtendSpec,
	GammaSpec,
	GrayscaleSpec,
	HSBLSpec,
	ImgLayer,
	NestSpec,
	OutputSpec,
	ProcSpec,
	RawLayer,
	ResizeSpec,
	RotateSpec,
	SVGLayer,
	TextLayer,
} from "./api.js";

/** @internal */
export const defSpec =
	<T extends ProcSpec>(op: T["op"]) =>
	(opts: Omit<T, "op">): T =>
		<T>{ op, ...opts };

/** @internal */
export const defLayerSpec =
	<T extends CompLayer>(type: T["type"]) =>
	(opts: Omit<T, "op">): T =>
		<T>{ type, ...opts };

/**
 * Creates a new {@link BlurSpec} with given opts.
 */
export const blur = defSpec<BlurSpec>("blur");

/**
 * Creates a new {@link CompSpec} with given opts.
 */
export const composite = defSpec<CompSpec>("composite");

/**
 * Creates a new {@link ColorLayer} spec with given opts (for use with
 * {@link composite} /  {@link CompSpec}).
 */
export const colorLayer = defLayerSpec<ColorLayer>("color");

/**
 * Creates a new {@link ImgLayer} spec with given opts (for use with
 * {@link composite} /  {@link CompSpec}).
 */
export const imageLayer = defLayerSpec<ImgLayer>("img");

/**
 * Creates a new {@link RawLayer} spec with given opts (for use with
 * {@link composite} /  {@link CompSpec}).
 */
export const rawLayer = defLayerSpec<RawLayer>("raw");

/**
 * Creates a new {@link SVGLayer} spec with given opts (for use with
 * {@link composite} /  {@link CompSpec}).
 */
export const svgLayer = defLayerSpec<SVGLayer>("svg");

/**
 * Creates a new {@link TextLayer} spec with given opts (for use with
 * {@link composite} /  {@link CompSpec}).
 */
export const textLayer = defLayerSpec<TextLayer>("text");

/**
 * Creates a new {@link CompSpec} with given opts.
 */
export const crop = defSpec<CropSpec>("crop");

/**
 * Creates a new {@link DitherSpec} with given opts.
 */
export const dither = defSpec<DitherSpec>("dither");

/**
 * Creates a new {@link EXIFSpec} with given opts.
 */
export const exif = defSpec<EXIFSpec>("exif");

/**
 * Creates a new {@link ExtendSpec} with given opts.
 */
export const extend = defSpec<ExtendSpec>("extend");

/**
 * Creates a new {@link GammaSpec} with given opts.
 */
export const gamma = defSpec<GammaSpec>("gamma");

/**
 * Creates a new {@link GrayscaleSpec} with given opts.
 */
export const grayscale = defSpec<GrayscaleSpec>("gray");

/**
 * Creates a new {@link HSBLSpec} with given opts.
 */
export const hsbl = defSpec<HSBLSpec>("hsbl");

/**
 * Creates a new {@link NestSpec} with given opts.
 */
export const nest = defSpec<NestSpec>("nest");

/**
 * Creates a new {@link OutputSpec} with given opts.
 */
export const output = defSpec<OutputSpec>("output");

/**
 * Creates a new {@link ResizeSpec} with given opts.
 */
export const resize = defSpec<ResizeSpec>("resize");

/**
 * Creates a new {@link RotateSpec} with given opts.
 */
export const rotate = defSpec<RotateSpec>("rotate");
