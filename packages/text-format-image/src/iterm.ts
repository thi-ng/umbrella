// SPDX-License-Identifier: Apache-2.0
import type { IntBufferLike } from "@thi.ng/imago";
import { output } from "@thi.ng/imago/ops";
import { processImage } from "@thi.ng/imago/proc";

export interface ITermImageBaseOpts {
	width: string;
	height: string;
	uniform: boolean;
}

export interface ITermImageOpts extends ITermImageBaseOpts {
	mime: string;
}

export interface ITermImageBufferOpts extends ITermImageBaseOpts {
	/**
	 * JPEG quality setting (in [1,100] range).
	 *
	 * @defaultValue 95
	 */
	quality: number;
}

/**
 * Converts given integer pixel buffer (thi.ng/pixel compatible) to an iTerm
 * image string using given options.
 *
 * @remarks
 * Also see {@link iTermImageStringFromBinary}.
 *
 * @param src
 * @param opts
 */
export const iTermImageStringFromIntBuffer = async (
	src: IntBufferLike,
	opts?: Partial<ITermImageBufferOpts>
) =>
	iTermImageStringFromBinary(
		<Buffer>(
			await processImage(src, [
				output({
					id: "main",
					jpeg: { quality: opts?.quality ?? 95 },
				}),
			])
		).outputs.main,
		opts
	);

/**
 * Converts given binary blob (representing the full contents of a supported
 * image file format, e.g. JPG/PNG) to an iTerm image string using given
 * options.
 *
 * @example
 * ```ts tangle:../export/iterm-image-string.ts
 * import { iTermImageStringFromBinary } from "@thi.ng/text-format-image";
 * import { readFileSync } from "node:fs";
 *
 * // read JPG as binary blob
 * const src = readFileSync("assets/examples/zig-cellular.jpg");
 *
 * // convert to image string to show image at 200px width
 * // example will only work in terminals supporting the iTerm image format
 * console.log(iTermImageStringFromBinary(src, { width: "400px" }));
 * ```
 *
 * @param src
 * @param opts
 */
export const iTermImageStringFromBinary = (
	src: Uint8Array | Buffer,
	{
		mime = "image/jpg",
		uniform = true,
		width,
		height,
	}: Partial<ITermImageOpts> = {}
) => {
	const res = ["\x1b]1337", ";File=inline=1", ";size=", src.length];
	mime && res.push(";type=", mime);
	width && res.push(";width=", width);
	height && res.push(";height=", height);
	uniform === false && res.push(";preserveAspectRatio=0");
	res.push(":", btoa(String.fromCharCode(...src)), "\x07");
	return res.join("");
};
