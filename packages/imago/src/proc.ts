import { typedArray } from "@thi.ng/api";
import { isArray, isArrayLike, isNumber, isString } from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import { readText, writeFile, writeJSON } from "@thi.ng/file-io";
import { ROOT, type ILogger } from "@thi.ng/logger";
import { ABGR8888, GRAY8, Lane, intBuffer } from "@thi.ng/pixel";
import {
	ATKINSON,
	BURKES,
	DIFFUSION_2D,
	DIFFUSION_COLUMN,
	DIFFUSION_ROW,
	FLOYD_STEINBERG,
	JARVIS_JUDICE_NINKE,
	SIERRA2,
	STUCKI,
	defBayer,
	ditherWith,
	orderedDither,
	type DitherKernel,
} from "@thi.ng/pixel-dither";
import { join, resolve } from "path";
import sharp, { type Metadata, type OverlayOptions, type Sharp } from "sharp";
import type {
	BlurSpec,
	Color,
	CompLayer,
	CompSpec,
	CropSpec,
	Dim,
	DitherMode,
	DitherSpec,
	EXIFSpec,
	ExtendSpec,
	GammaSpec,
	Gravity,
	GrayscaleSpec,
	HSBLSpec,
	ImgLayer,
	NestSpec,
	OutputSpec,
	ProcSpec,
	ResizeSpec,
	RotateSpec,
	SVGLayer,
	Sides,
	Size,
	SizeRef,
	SizeUnit,
} from "./api.js";

// ROOT.set(new ConsoleLogger());
export const LOGGER = ROOT.childLogger("imgproc");

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
}

export interface ImgProcCtx {
	size: Dim;
	channels: 1 | 2 | 3 | 4;
	meta: Metadata;
	logger: ILogger;
	// bake: boolean;
	opts: Partial<ImgProcOpts>;
}

const GRAVITY_POSITION: Record<Gravity, string> = {
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

const GRAVITY_MAP: Record<Gravity, string> = {
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

const DITHER_KERNELS: Record<Exclude<DitherMode, "bayer">, DitherKernel> = {
	atkinson: ATKINSON,
	burkes: BURKES,
	column: DIFFUSION_COLUMN,
	diffusion: DIFFUSION_2D,
	floyd: FLOYD_STEINBERG,
	jarvis: JARVIS_JUDICE_NINKE,
	row: DIFFUSION_ROW,
	sierra: SIERRA2,
	stucki: STUCKI,
};

export const isArrayBufferLike = (x: any): x is ArrayBufferLike =>
	x instanceof ArrayBuffer || x instanceof SharedArrayBuffer;

export const isArrayBufferView = (x: any): x is ArrayBufferView =>
	x != null &&
	isArrayBufferLike(x.buffer) &&
	isNumber(x.byteOffset) &&
	isNumber(x.byteLength);

export const processImage = async (
	src: string | Buffer | Sharp,
	procs: ProcSpec[],
	opts: Partial<ImgProcOpts> = {}
) => {
	let img =
		isString(src) || isArrayBufferLike((<any>src).buffer)
			? sharp(<string | Buffer>src)
			: <Sharp>src;
	const meta = await img.metadata();
	__ensureSize(meta);
	const ctx: ImgProcCtx = {
		logger: opts?.logger || LOGGER,
		size: [meta.width!, meta.height!],
		channels: meta.channels!,
		// bake: true,
		meta,
		opts,
	};
	let bake: boolean;
	for (let proc of procs) {
		ctx.logger.debug("processing spec:", proc);
		[img, bake] = await process(proc, img, ctx);
		if (!bake) {
			ctx.logger.debug("skip baking processor's results...");
			continue;
		}
		const { data, info } = await img
			.raw()
			.toBuffer({ resolveWithObject: true });
		ctx.size = [info.width, info.height];
		ctx.channels = info.channels;
		img = sharp(data, {
			raw: {
				width: info.width,
				height: info.height,
				channels: info.channels,
			},
		});
	}
	return img;
};

/**
 * Extensible polymorphic function performing a single image processing step.
 *
 * @remarks
 * The function returns a tuple of `[img, bake-flag]`. If the flag (2nd value)
 * is true, the returned image will be serialized/baked to an internal buffer
 * (also wiping any EXIF!) after the current processing step and then used as
 * input for the next processing step.
 *
 * Due to most ops in sharp's API merely setting internal state rather than
 * applying changes directly, all size or channel changing procs will require
 * "baking" in order to produce predictable results... The {@link processImage}
 * function checks this flag after each processing step and its down to each
 * processor to determine if baking is required or not...
 *
 * @param spec
 * @param img
 * @param ctx
 **/
export const process = defmulti<
	ProcSpec,
	Sharp,
	ImgProcCtx,
	Promise<[Sharp, boolean]>
>(
	(spec) => spec.type,
	{},
	{
		blur: async (spec, input) => {
			const { radius } = <BlurSpec>spec;
			return [input.blur(1 + radius / 2), false];
		},

		composite: async (spec, input, ctx) => {
			const { layers } = <CompSpec>spec;
			const layerSpecs = await Promise.all<OverlayOptions>(
				layers.map((l) => defLayer(l, input, ctx))
			);
			return [input.composite(layerSpecs), false];
		},

		crop: async (spec, input, ctx) => {
			const { border, gravity, pos, size, ref, unit } = <CropSpec>spec;
			if (border == null && size == null)
				illegalArgs("require `border` or `size` option");
			if (border != null) {
				const sides = __margins(border, ctx.size, ref, unit);
				const [left, right, top, bottom] = sides;
				return [
					input.extract({
						left,
						top,
						width: ctx.size[0] - left - right,
						height: ctx.size[1] - top - bottom,
					}),
					true,
				];
			}
			const $size = __size(size!, ctx.size, unit);
			let left = 0,
				top = 0;
			if (pos) {
				({ left = 0, top = 0 } =
					__positionOrGravity(pos, gravity, $size, ctx.size, unit) ||
					{});
			} else {
				[left, top] = __gravityPosition(
					gravity || "c",
					$size,
					ctx.size
				);
			}
			return [
				input.extract({
					left,
					top,
					width: $size[0],
					height: $size[1],
				}),
				true,
			];
		},

		dither: async (spec, input, ctx) => {
			let { mode, num = 2, rgb = false, size = 8 } = <DitherSpec>spec;
			const [w, h] = ctx.size;
			let raw: ArrayBufferLike;
			if (rgb) {
				const tmp = await input
					.clone()
					.ensureAlpha(1)
					.toColorspace("srgb")
					.raw()
					.toBuffer({ resolveWithObject: true });
				raw = tmp.data.buffer;
				// check if actually RGB (not the case if grayscale() has already been applied)
				rgb = tmp.info.channels === 4;
			} else {
				raw = (await input.clone().grayscale().raw().toBuffer()).buffer;
			}
			let img = intBuffer(
				w,
				h,
				rgb ? ABGR8888 : GRAY8,
				typedArray(rgb ? "u32" : "u8", raw)
			);
			if (mode === "bayer") {
				orderedDither(
					img,
					defBayer(size),
					rgb ? [num, num, num] : [num]
				);
			} else {
				ditherWith(DITHER_KERNELS[mode], img, {
					channels: rgb
						? [Lane.RED, Lane.GREEN, Lane.BLUE]
						: undefined,
				});
			}
			if (!rgb) img = img.as(ABGR8888);
			return [
				sharp(new Uint8Array(img.data.buffer), {
					raw: {
						width: img.width,
						height: img.height,
						channels: 4,
					},
				}),
				true,
			];
		},

		exif: async (spec, input) => {
			const { tags } = <EXIFSpec>spec;
			return [input.withExif(tags), false];
		},

		extend: async (spec, input, ctx) => {
			const { bg, border, mode, ref, unit } = <ExtendSpec>spec;
			const sides = __margins(border, ctx.size, ref, unit);
			const [left, right, top, bottom] = sides;
			return [
				input.extend({
					left,
					right,
					top,
					bottom,
					background: bg ? __color(bg) : "white",
					extendWith: mode,
				}),
				true,
			];
		},

		gamma: async (spec, input) => {
			const { gamma } = <GammaSpec>spec;
			return [input.gamma(gamma, 1), false];
		},

		gray: async (spec, input) => {
			const { gamma } = <GrayscaleSpec>spec;
			if (gamma !== false) {
				input = input.gamma(isNumber(gamma) ? gamma : undefined);
			}
			return [input.grayscale(), true];
		},

		hsbl: async (spec, input) => {
			const { h = 0, s = 1, b = 1, l = 0 } = <HSBLSpec>spec;
			return [
				input.modulate({
					hue: h,
					brightness: b,
					saturation: s,
					lightness: l * 255,
				}),
				true,
			];
		},

		nest: async (spec, input, ctx) => {
			const { procs } = <NestSpec>spec;
			ctx.logger.debug("--- nest start ---");
			await processImage(input.clone(), procs, ctx.opts);
			ctx.logger.debug("--- nest end ---");
			// ctx.bake = false;
			return [input, false];
		},

		output: async (spec, input, ctx) => {
			const opts = <OutputSpec>spec;
			let output = input.clone();
			const path = join(resolve(ctx.opts.outDir || "."), opts.path);
			if (opts.raw) {
				const { alpha = false, meta = false } =
					opts.raw !== true ? opts.raw : {};
				if (alpha) output = output.ensureAlpha();
				const { data, info } = await output
					.raw()
					.toBuffer({ resolveWithObject: true });
				ctx.logger.info("writing raw binary:", path);
				writeFile(path, data);
				if (meta) {
					writeJSON(
						path + ".meta.json",
						info,
						undefined,
						undefined,
						ctx.logger
					);
				}
				return [input, false];
			}
			let format = /\.(\w+)$/.exec(opts.path)?.[1];
			switch (format) {
				case "avif":
					if (opts.avif) output = output.avif(opts.avif);
					break;
				case "gif":
					if (opts.gif) output = output.gif(opts.gif);
					break;
				case "jpg":
				case "jpeg":
					if (opts.jpeg) output = output.jpeg(opts.jpeg);
					format = "jpeg";
					break;
				case "jp2":
					if (opts.jp2) output = output.jp2(opts.jp2);
					break;
				case "jxl":
					if (opts.jxl) output = output.jxl(opts.jxl);
					break;
				case "png":
					if (opts.png) output = output.png(opts.png);
					break;
				case "tiff":
					if (opts.tiff) output = output.tiff(opts.tiff);
					break;
				case "webp":
					if (opts.webp) output = output.webp(opts.webp);
					break;
			}
			if (opts.tile) output = output.tile(opts.tile);
			if (format) output = output.toFormat(<any>format);
			ctx.logger.info(
				"writing file:",
				path,
				"using format:",
				format || "???"
			);
			await output.toFile(path);
			return [input, false];
		},

		resize: async (spec, input, ctx) => {
			const { bg, filter, fit, gravity, size, unit } = <ResizeSpec>spec;
			const [width, height] = __size(size, ctx.size, unit);
			return [
				input.resize({
					width,
					height,
					fit,
					kernel: filter,
					position: gravity ? GRAVITY_POSITION[gravity] : undefined,
					background: bg ? __color(bg) : undefined,
				}),
				true,
			];
		},

		rotate: async (spec, input, _) => {
			const { angle, bg, flipX, flipY } = <RotateSpec>spec;
			if (flipX) input = input.flop();
			if (flipY) input = input.flip();
			return [input.rotate(angle, { background: __color(bg) }), true];
		},
	}
);

const defLayer = defmulti<
	CompLayer,
	Sharp,
	ImgProcCtx,
	Promise<OverlayOptions>
>(
	(x) => x.type,
	{},
	{
		img: async (layer, _, ctx) => {
			const { gravity, path, pos, size, unit, ...opts } = <ImgLayer>layer;
			const input = sharp(path);
			const meta = await input.metadata();
			let imgSize: Dim = [meta.width!, meta.height!];
			const $pos = __positionOrGravity(
				pos,
				gravity,
				imgSize,
				ctx.size,
				unit
			);
			if (!size) return { input: path, ...$pos, ...opts };
			__ensureSize(meta);
			imgSize = __size(size, imgSize, unit);
			return {
				input: await input
					.resize(imgSize[0], imgSize[1])
					.png({ compressionLevel: 0 })
					.toBuffer(),
				...$pos,
				...opts,
			};
		},

		svg: async (layer, _, ctx) => {
			let { body, gravity, path, pos, unit, ...opts } = <SVGLayer>layer;
			if (path) body = readText(path, ctx.logger);
			const w = +(/width="(\d+)"/.exec(body)?.[1] || 0);
			const h = +(/height="(\d+)"/.exec(body)?.[1] || 0);
			return {
				input: Buffer.from(body),
				...__positionOrGravity(pos, gravity, [w, h], ctx.size, unit),
				...opts,
			};
		},
	}
);

const round = Math.round;

const __ensureSize = (meta: Metadata) =>
	!(isNumber(meta.width) && isNumber(meta.height)) &&
	illegalArgs("can't determine image size");

const __color = (col: Color) =>
	isString(col)
		? col
		: isArrayLike(col)
		? { r: col[0], g: col[1], b: col[2], alpha: col[3] ?? 1 }
		: col;

const __positionOrGravity = (
	pos: CompLayer["pos"],
	gravity: Gravity | undefined,
	[w, h]: Dim,
	[parentW, parentH]: Dim,
	unit: SizeUnit = "px"
) => {
	if (!pos) return gravity ? { gravity: GRAVITY_MAP[gravity] } : undefined;
	const isPC = unit === "%";
	let { l, r, t, b } = pos;
	if (l != null) l = round(isPC ? (l * parentW) / 100 : l);
	if (r != null) l = round(parentW - (isPC ? (r * parentW) / 100 : r) - w);
	if (t != null) t = round(isPC ? (t * parentH) / 100 : t);
	if (b != null) t = round(parentH - (isPC ? (b * parentH) / 100 : b) - h);
	return { left: l, top: t };
};

const __gravityPosition = (
	gravity: Gravity,
	[w, h]: Dim,
	[parentW, parentH]: Dim
) => [
	gravity.includes("w")
		? 0
		: gravity.includes("e")
		? parentW - w
		: (parentW - w) >> 1,
	gravity.includes("n")
		? 0
		: gravity.includes("s")
		? parentH - h
		: (parentH - h) >> 1,
];

const __refSize = ([w, h]: Dim, ref?: SizeRef) => {
	switch (ref) {
		case "w":
			return w;
		case "h":
			return h;
		case "max":
			return Math.max(w, h);
		case "min":
		default:
			return Math.min(w, h);
	}
};

const __size = (size: Size, curr: Dim, unit: SizeUnit = "px"): Dim => {
	const aspect = curr[0] / curr[1];
	let res: Dim;
	if (isNumber(size)) {
		res = aspect > 1 ? [size, size / aspect] : [size * aspect, size];
	} else {
		const [w, h] = size;
		res =
			w >= 0
				? h >= 0
					? size
					: [w, w / aspect]
				: h > 0
				? [w * aspect, h]
				: illegalArgs(
						`require at least width or height, but got: ${JSON.stringify(
							size
						)}`
				  );
	}
	if (unit === "%") {
		res[0] *= curr[0] / 100;
		res[1] *= curr[1] / 100;
	}
	res[0] = round(res[0]);
	res[1] = round(res[1]);
	return res;
};

const __margins = (
	size: Size | Sides,
	curr: Dim,
	ref: SizeRef = "min",
	unit: SizeUnit = "px"
) => {
	let res: Sides;
	const refSide = __refSize(curr, ref);
	const isPC = unit === "%";
	if (isArray(size) && size.length === 4) {
		res = <Sides>(
			(isPC
				? size.map((x) => round((x * refSide) / 100))
				: size.map(round))
		);
	} else if (isNumber(size)) {
		const w = round(isPC ? (refSide * size) / 100 : size);
		res = [w, w, w, w];
	} else {
		const [w, h] = __size(size, curr, unit);
		res = [w, w, h, h];
	}
	return res;
};
