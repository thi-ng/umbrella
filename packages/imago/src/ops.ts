import type {
	BlurSpec,
	CompSpec,
	CropSpec,
	DitherSpec,
	EXIFSpec,
	ExtendSpec,
	GammaSpec,
	GrayscaleSpec,
	HSBLSpec,
	NestSpec,
	OutputSpec,
	ProcSpec,
	ResizeSpec,
	RotateSpec,
} from "./api.js";

export const defSpec =
	<T extends ProcSpec>(type: T["type"]) =>
	(opts: Omit<T, "type">): T =>
		<T>{ type, ...opts };

export const blur = defSpec<BlurSpec>("blur");

export const composite = defSpec<CompSpec>("composite");

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
