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

export const defSpec =
	<T extends ProcSpec>(op: T["op"]) =>
	(opts: Omit<T, "op">): T =>
		<T>{ op, ...opts };

export const defLayerSpec =
	<T extends CompLayerBase>(type: T["type"]) =>
	(opts: Omit<T, "op">): T =>
		<T>{ type, ...opts };

export const blur = defSpec<BlurSpec>("blur");

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

export const crop = defSpec<CropSpec>("crop");

export const dither = defSpec<DitherSpec>("dither");

export const exif = defSpec<EXIFSpec>("exif");

export const extend = defSpec<ExtendSpec>("extend");

export const gamma = defSpec<GammaSpec>("gamma");

export const grayscale = defSpec<GrayscaleSpec>("gray");

export const hsbl = defSpec<HSBLSpec>("hsbl");

export const nest = defSpec<NestSpec>("nest");

export const output = defSpec<OutputSpec>("output");

export const resize = defSpec<ResizeSpec>("resize");

export const rotate = defSpec<RotateSpec>("rotate");
