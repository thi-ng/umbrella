// SPDX-License-Identifier: Apache-2.0
import type { Range1_4 } from "@thi.ng/api";
import { isArrayBufferView, isString } from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import { createTempFile, deleteFile } from "@thi.ng/file-io";
import { ROOT } from "@thi.ng/logger";
import sharp, { type Sharp } from "sharp";
import type {
	BufferLike,
	ImgProcCtx,
	ImgProcOpts,
	IntBufferLike,
	ProcSpec,
} from "./api.js";
import { blurProc } from "./ops/blur.js";
import { compositeProc } from "./ops/composite.js";
import { cropProc } from "./ops/crop.js";
import { ditherProc } from "./ops/dither.js";
import { exifProc } from "./ops/exif.js";
import { extendProc } from "./ops/extend.js";
import { gammaProc } from "./ops/gamma.js";
import { grayscaleProc } from "./ops/grayscale.js";
import { hsblProc } from "./ops/hsbl.js";
import { iccProc } from "./ops/icc.js";
import { nestProc } from "./ops/nest.js";
import { outputProc } from "./ops/output.js";
import { resizeProc } from "./ops/resize.js";
import { rotateProc } from "./ops/rotate.js";
import { ensureSize, isIntBufferLike } from "./utils.js";

// ROOT.set(new ConsoleLogger());
export const LOGGER = ROOT.childLogger("imgproc");

/**
 * Main API function. Takes an image input (file path, Buffer, ArrayBuffer,
 * thi.ng/pixel IntBuffer or an existing Sharp instance) and applies given
 * processing pipeline specs in sequence. Returns a promise of final processed
 * image, input metadata (if any), an environment object of arbitrary data
 * (likely produced by custom ops/processors) and an object of all written
 * output paths (keyed by each output's {@link OutputSpec.id}). The process
 * pipeline can be additionally configured via provided options.
 *
 * @remarks
 * The `parentCtx` arg is internal use only (nested processors)!
 *
 * @param src
 * @param specs
 * @param opts
 * @param parentCtx
 */
export const processImage = async (
	src: string | BufferLike | ArrayBuffer | IntBufferLike | Sharp,
	specs: ProcSpec[],
	opts: Partial<ImgProcOpts> = {},
	parentCtx?: ImgProcCtx
) => {
	let img =
		isString(src) || isArrayBufferView(src)
			? sharp(<string | BufferLike>src)
			: isIntBufferLike(src)
			? sharp(new Uint8Array(src.data.buffer), {
					raw: {
						width: src.width,
						height: src.height,
						channels: <Range1_4>src.format.channels.length,
					},
			  })
			: <Sharp>src;
	const meta = await img.metadata();
	ensureSize(meta);

	const ctx: ImgProcCtx = {
		path: isString(src) ? src : parentCtx?.path,
		outputs: parentCtx ? parentCtx.outputs : {},
		outputMeta: parentCtx ? parentCtx.outputMeta : {},
		env: parentCtx ? parentCtx.env : opts.env || {},
		logger: opts.logger || LOGGER,
		size: [meta.width!, meta.height!],
		exif: parentCtx ? structuredClone(parentCtx.exif) : {},
		opts: { ...opts },
		meta,
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
		return {
			img,
			meta,
			env: ctx.env,
			outputs: ctx.outputs,
			outputMeta: ctx.outputMeta,
		};
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
		icc: iccProc,
		nest: nestProc,
		output: outputProc,
		resize: resizeProc,
		rotate: rotateProc,
	}
);
