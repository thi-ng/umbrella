import type { BufferLike, IntBufferLike } from "@thi.ng/imago";
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

export const iTermImageStringFromIntBuffer = async (
	src: IntBufferLike,
	opts?: Partial<ITermImageBufferOpts>
) =>
	iTermImageStringFromFile(
		<BufferLike>(
			await processImage(src, [
				output({
					id: "main",
					jpeg: { quality: opts?.quality ?? 95 },
				}),
			])
		).outputs.main,
		opts
	);

export const iTermImageStringFromFile = (
	src: BufferLike,
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
