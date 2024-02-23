import { isArrayBufferView, isString } from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import { ROOT } from "@thi.ng/logger";
import sharp, { type Sharp } from "sharp";
import type { ImgProcCtx, ImgProcOpts, ProcSpec } from "./api.js";
import { blurProc } from "./ops/blur.js";
import { compositeProc } from "./ops/composite.js";
import { cropProc } from "./ops/crop.js";
import { ditherProc } from "./ops/dither.js";
import { exifProc } from "./ops/exif.js";
import { extendProc } from "./ops/extend.js";
import { gammaProc } from "./ops/gamma.js";
import { grayscaleProc } from "./ops/grayscale.js";
import { hsblProc } from "./ops/hsbl.js";
import { nestProc } from "./ops/nest.js";
import { outputProc } from "./ops/output.js";
import { resizeProc } from "./ops/resize.js";
import { rotateProc } from "./ops/rotate.js";
import { ensureSize } from "./units.js";
import { createTempFile, deleteFile } from "@thi.ng/file-io";

// ROOT.set(new ConsoleLogger());
export const LOGGER = ROOT.childLogger("imgproc");

/**
 * Main API function. Takes an image input (file path, buffer or existing Sharp
 * instance) and applies given processing pipeline specs in sequence. Returns a
 * promise of final processed image, input metadata (if any) and an object of
 * all written output paths (keyed by each output's {@link OutputSpec.id}). The
 * process can be configured via provided options.
 *
 * @remarks
 * The `parentCtx` arg is internal use only!
 *
 * @param src
 * @param specs
 * @param opts
 * @param parentCtx
 */
export const processImage = async (
	src: string | Buffer | Sharp,
	specs: ProcSpec[],
	opts: Partial<ImgProcOpts> = {},
	parentCtx?: ImgProcCtx
) => {
	let img =
		isString(src) || isArrayBufferView((<any>src).buffer)
			? sharp(<string | Buffer>src)
			: <Sharp>src;
	const meta = await img.metadata();
	ensureSize(meta);

	const ctx: ImgProcCtx = {
		path: isString(src) ? src : parentCtx?.path,
		outputs: parentCtx ? parentCtx.outputs : {},
		logger: opts.logger || LOGGER,
		size: [meta.width!, meta.height!],
		exif: parentCtx ? structuredClone(parentCtx.exif) : {},
		meta,
		opts,
	};

	if (!parentCtx) {
		if (meta.exif && opts.keepEXIF) {
			ctx.logger.warn("TODO keeping input EXIF still unsupported");
		}
		if (meta.icc && opts.keepICC) {
			ctx.logger.debug("storing input ICC profile...");
			ctx.iccFile = createTempFile(meta.icc, ctx.logger);
		}
	}

	try {
		let bake: boolean;
		for (let spec of specs) {
			ctx.logger.debug("processing spec:", spec);
			[img, bake] = await processor(spec, img, ctx);
			if (!bake) {
				ctx.logger.debug("skip baking processor's results...");
				continue;
			}
			const { data, info } = await img
				.raw()
				.toBuffer({ resolveWithObject: true });
			ctx.size = [info.width, info.height];
			img = sharp(data, {
				raw: {
					width: info.width,
					height: info.height,
					channels: info.channels,
				},
			});
		}
		return { img, meta, outputs: ctx.outputs };
	} finally {
		if (ctx.iccFile) deleteFile(ctx.iccFile, ctx.logger);
	}
};

/**
 * Extensible polymorphic function performing a single image processing step.
 *
 * @remarks
 * The function returns a tuple of `[img, bakeFlag]`. If the flag (2nd value)
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
 * To add support for a custom operation/processor, call: `processor.add("myid",
 * myProcessor)`. Note that registered IDs should be unique (but can also
 * override existing impls).
 *
 * @param spec
 * @param img
 * @param ctx
 **/
export const processor = defmulti<
	ProcSpec,
	Sharp,
	ImgProcCtx,
	Promise<[Sharp, boolean]>
>(
	(spec) => spec.op,
	{},
	{
		blur: blurProc,
		composite: compositeProc,
		crop: cropProc,
		dither: ditherProc,
		exif: exifProc,
		extend: extendProc,
		gamma: gammaProc,
		gray: grayscaleProc,
		hsbl: hsblProc,
		nest: nestProc,
		output: outputProc,
		resize: resizeProc,
		rotate: rotateProc,
	}
);
