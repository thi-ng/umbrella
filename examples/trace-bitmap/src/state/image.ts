import type { Range0_3 } from "@thi.ng/api";
import { mod } from "@thi.ng/math";
import {
	GRAY8,
	IntBuffer,
	imageFromURL,
	intBufferFromImage,
} from "@thi.ng/pixel";
import { read } from "@thi.ng/pixel-io-netpbm";
import type { DitherMode, ImageParam } from "../api";
import { DB } from "./atom";
import { resetCanvasView } from "./canvas";

/**
 * Asynchronously loads an image and then places the result pixel buffer into
 * the state atom to which the {@link imageProcessor} and UI are subscribed to.
 *
 * @remarks
 * Since browsers don't have native support for PPM/PGM image format we're using
 * our own image parser for those images. The rest (PNG,JPG,GIF,WEBP etc.) can
 * be handled via browser API directly.
 *
 * See {@link readPBM} for more details...
 */
export const loadImage = async (file: File) => {
	let buf: IntBuffer;
	if (/\.p[bgp]m$/.test(file.name)) {
		buf = await readPBM(file);
	} else {
		const url = URL.createObjectURL(file);
		const img = await imageFromURL(url);
		URL.revokeObjectURL(url);
		buf = intBufferFromImage(img, GRAY8);
	}
	DB.swapIn(["img"], (state) => ({
		...state,
		rotate: 0,
		buf,
	}));
	resetCanvasView();
};

/**
 * Asynchronously reads a PBM, PGM or PPM image file using
 * https://thi.ng/pixel-io-netpbm. Returns a grayscale pixel buffer.
 *
 * @param file
 */
const readPBM = (file: File) =>
	new Promise<IntBuffer>((resolve, fail) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			resolve(
				read(new Uint8Array(<ArrayBuffer>e.target!.result)).as(GRAY8)
			);
		};
		reader.onerror = (e) => fail(e);
		reader.readAsArrayBuffer(file);
	});

/**
 * State handler to update a single (numeric) image param in the central
 * {@link DB} atom.
 *
 * @param key
 * @param val
 */
export const setImageParam = (
	key: Exclude<ImageParam, "buf" | "dither">,
	val: string
) => DB.resetIn(["img", key], parseFloat(val));

/**
 * State handler to update the image dithering mode in the central {@link DB}
 * atom. Also see {@link DITHER_MODES}.
 *
 * @param mode
 */
export const setImageDither = (mode: DitherMode) =>
	DB.resetIn(["img", "dither"], mode);

export const rotateImage = (dir: -1 | 1) =>
	DB.swapIn(["img", "rotate"], (x) => <Range0_3>mod(x + dir, 4));
