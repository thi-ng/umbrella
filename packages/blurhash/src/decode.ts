import { B83_CHARS } from "@thi.ng/base-n/chars/83";
import { BaseNDecoder } from "@thi.ng/base-n/decode";
import { canvas2d, type Canvas2DOpts } from "@thi.ng/canvas";
import { signedPow } from "@thi.ng/math/abs";
import { __ensureSize } from "./internal/ensure";
import { __fromLinear, __toLinear } from "./internal/linear";

const { PI, cos, floor } = Math;

const BASE83 = new BaseNDecoder(B83_CHARS);

/**
 * Decodes given blurhash string into a ABGR 32bit int array of given
 * resolution. The optional `contrast` arg can be used to adjust the contrast of
 * the resulting image.
 *
 * @remarks
 * If `pixels` is given, it MUST have a length of `width * height` and will be
 * used to write the decoded image to. If `pixels` is NOT given, it will be
 * created automatically.
 *
 * See also {@link decodeToCanvas}.
 *
 * @param hash
 * @param width
 * @param height
 * @param contrast
 * @param pixels
 */
export const decode = (
	hash: string,
	width: number,
	height: number,
	contrast = 1,
	pixels?: Uint32Array
) => {
	const sizeFlag = BASE83.decode(hash[0]);
	const detailX = (sizeFlag % 9) + 1;
	const detailY = floor(sizeFlag / 9 + 1);
	const max = (contrast * (BASE83.decode(hash[1]) + 1)) / 166;
	const colors: number[] = [];
	if (pixels) {
		__ensureSize(pixels, width, height);
	} else {
		pixels = new Uint32Array(width * height);
	}
	let x: number,
		y: number,
		i: number,
		j: number,
		k: number,
		idx: number,
		pix: number,
		piy: number,
		r: number,
		g: number,
		b: number,
		basis: number,
		basisX: number[] = [],
		basisY: number[] = [],
		by: number;

	__decodeDC(colors, BASE83.decode(hash.substring(2, 6)));
	for (i = 2, k = detailX * detailY * 2; i < k; i += 2) {
		__decodeAC(colors, BASE83.decode(hash.substring(4 + i, 6 + i)), max);
	}

	for (idx = y = 0; y < height; y++) {
		piy = (PI * y) / height;
		for (k = 0; k < detailY; k++) basisY[k] = cos(piy * k);
		for (x = 0; x < width; x++, idx++) {
			pix = (PI * x) / width;
			for (k = 0; k < detailX; k++) basisX[k] = cos(pix * k);
			r = 0;
			g = 0;
			b = 0;
			for (j = 0, k = 0; j < detailY; j++) {
				by = basisY[j];
				for (i = 0; i < detailX; i++, k += 3) {
					basis = basisX[i] * by;
					r += colors[k] * basis;
					g += colors[k + 1] * basis;
					b += colors[k + 2] * basis;
				}
			}
			pixels[idx] =
				0xff000000 |
				__fromLinear(b, 16) |
				__fromLinear(g, 8) |
				__fromLinear(r);
		}
	}
	return pixels;
};

/**
 * Similar to {@link decode}, but also creates a canvas of given size and writes
 * the decoded image into it. Returns canvas element.
 *
 * @param hash
 * @param width
 * @param height
 * @param contrast
 * @param parent
 * @param opts
 */
export const decodeToCanvas = (
	hash: string,
	width: number,
	height: number,
	contrast = 1,
	parent?: HTMLElement,
	opts?: Partial<Canvas2DOpts>
) => {
	const { canvas, ctx } = canvas2d(width, height, parent, opts);
	const idata = ctx.getImageData(0, 0, width, height);
	decode(hash, width, height, contrast, new Uint32Array(idata.data.buffer));
	ctx.putImageData(idata, 0, 0);
	return canvas;
};

/** @internal */
const __decodeDC = (colors: number[], x: number) =>
	colors.push(__toLinear(x, 16), __toLinear(x, 8), __toLinear(x));

/** @internal */
const __decodeAC = (colors: number[], x: number, scale: number) =>
	colors.push(
		signedPow((floor(x / (19 * 19)) - 9) / 9, 2) * scale,
		signedPow(((floor(x / 19) % 19) - 9) / 9, 2) * scale,
		signedPow(((x % 19) - 9) / 9, 2) * scale
	);
