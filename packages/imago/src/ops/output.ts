import { encode } from "@thi.ng/blurhash";
import { isNumber, isPlainObject } from "@thi.ng/checks";
import { writeFile, writeJSON } from "@thi.ng/file-io";
import { join, resolve } from "node:path";
import type { Sharp } from "sharp";
import type { ImgProcCtx, OutputSpec, Processor } from "../api.js";
import { formatPath } from "../path.js";
import { illegalArgs } from "@thi.ng/errors";

export const outputProc: Processor = async (spec, input, ctx) => {
	const opts = <OutputSpec>spec;
	const outDir = resolve(ctx.opts.outDir || ".");
	let output = input.clone();
	if (opts.blurhash) {
		await outputBlurHash(opts, output, ctx);
		return [input, false];
	}
	if (!opts.path) illegalArgs("output path missing");
	if (opts.raw) {
		await outputRaw(opts, output, ctx, outDir);
		return [input, false];
	}
	if (ctx.meta.exif && ctx.opts.keepEXIF) {
		ctx.logger.warn(
			"TODO injecting & merging EXIF in output still not supported"
		);
	}
	if (Object.keys(ctx.exif).length) {
		ctx.logger.debug("setting custom EXIF", ctx.exif);
		output = output.withExif(ctx.exif);
	}
	if (ctx.iccFile && ctx.opts.keepICC) {
		ctx.logger.debug("using stored ICC profile:", ctx.iccFile);
		output = output.withIccProfile(ctx.iccFile);
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
	const result = await output.toBuffer();
	const path = join(
		outDir,
		formatPath(opts.path, ctx, <OutputSpec>spec, result)
	);
	writeFile(path, result, null, ctx.logger);
	ctx.outputs[opts.id] = path;
	return [input, false];
};

const outputRaw = async (
	opts: OutputSpec,
	output: Sharp,
	ctx: ImgProcCtx,
	outDir: string
) => {
	const { alpha = false, meta = false } = isPlainObject(opts.raw)
		? opts.raw
		: {};
	if (alpha) output = output.ensureAlpha();
	const { data, info } = await output
		.raw()
		.toBuffer({ resolveWithObject: true });
	const path = join(outDir, formatPath(opts.path!, ctx, opts, data));
	writeFile(path, data, null, ctx.logger);
	ctx.outputs[opts.id] = path;
	if (meta) {
		writeJSON(
			path + ".meta.json",
			{ ...info, exif: ctx.exif },
			undefined,
			undefined,
			ctx.logger
		);
	}
};

const outputBlurHash = async (
	opts: OutputSpec,
	output: Sharp,
	ctx: ImgProcCtx
) => {
	const { data, info } = await output
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const detail = opts.blurhash === true ? 4 : opts.blurhash!;
	const [dx, dy] = isNumber(detail) ? [detail, detail] : detail;
	const hash = encode(
		new Uint32Array(data.buffer),
		info.width,
		info.height,
		dx,
		dy
	);
	ctx.logger.debug("computed blurhash:", hash);
	ctx.outputs[opts.id] = hash;
};
