import { canvasPixels } from "@thi.ng/pixel/canvas";
import { ARGB8888 } from "@thi.ng/pixel/format/argb8888";

export interface StripeOpts {
	size: number;
	col1: number;
	col2: number;
	horizontal: boolean;
}

export const stripes = (opts: Partial<StripeOpts>) => {
	opts = {
		size: 16,
		col1: 0xffffffff,
		col2: 0xff000000,
		...opts,
	};
	const size = opts.size!;
	const col1 = ARGB8888.toABGR(opts.col1!);
	const col2 = ARGB8888.toABGR(opts.col2!);
	const { canvas, ctx, img, data } = opts.horizontal
		? canvasPixels(1, size)
		: canvasPixels(size, 1);
	for (let x = size; x-- > 0; ) {
		data[x] = x & 1 ? col1 : col2;
	}
	ctx.putImageData(img, 0, 0);
	return canvas;
};
