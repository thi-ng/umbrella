import type {
	BlurSpec,
	ColorLayer,
	CompLayerBase,
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

export const colorLayer = defLayerSpec<ColorLayer>("color");

export const imageLayer = defLayerSpec<ImgLayer>("img");

export const svgLayer = defLayerSpec<SVGLayer>("svg");

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
