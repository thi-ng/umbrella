import { typedArray } from "@thi.ng/api";
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
import sharp from "sharp";
import type { DitherMode, DitherSpec, Processor } from "../api.js";

/**
 * @internal
 */
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

export const ditherProc: Processor = async (spec, input, ctx) => {
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
		orderedDither(img, defBayer(size), rgb ? [num, num, num] : [num]);
	} else {
		ditherWith(DITHER_KERNELS[mode], img, {
			channels: rgb ? [Lane.RED, Lane.GREEN, Lane.BLUE] : undefined,
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
};
