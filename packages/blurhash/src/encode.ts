import type { FnN, FnN3, FnN4 } from "@thi.ng/api";
import { B83_CHARS } from "@thi.ng/base-n/chars/83";
import { BaseNEncoder } from "@thi.ng/base-n/encode";
import { imageCanvas } from "@thi.ng/canvas";
import { signedPow } from "@thi.ng/math/abs";
import { clamp } from "@thi.ng/math/interval";
import { __ensureDetail, __ensureSize } from "./internal/ensure";
import { __fromLinear, __toLinear } from "./internal/linear";

const { PI, cos, floor } = Math;

const BASE83 = new BaseNEncoder(B83_CHARS);

/**
 * Computes the blurhash for the given ABGR 32bit pixel array, image size and
 * detail settings (`detailX` & `detailY` both in [1..9] range, X default = 4, Y
 * default is same as X value).
 *
 * @param pixels
 * @param width
 * @param height
 * @param detailX
 * @param detailY
 */
export const encode = (
	pixels: Uint32Array,
	width: number,
	height: number,
	detailX = 4,
	detailY = detailX
): string => {
	__ensureDetail(detailX, detailY);
	__ensureSize(pixels, width, height);

	let dct: number[] = [],
		cosX: number[] = [],
		cosY: number[] = [],
		k: number,
		x: number,
		y: number,
		pix: number,
		piy: number,
		norm: number;
	for (y = 0; y < detailY; y++) {
		piy = (PI * y) / height;
		for (k = 0; k < height; k++) cosY[k] = cos(piy * k);
		for (x = 0; x < detailX; x++) {
			norm = y > 0 || x > 0 ? 2 : 1;
			pix = (PI * x) / width;
			for (k = 0; k < width; k++) cosX[k] = norm * cos(pix * k);
			__convolve(dct, pixels, width, height, cosX, cosY);
		}
	}

	const ac = dct.slice(3);

	let hash = "";
	// size
	hash += BASE83.encode(detailX - 1 + (detailY - 1) * 9, 1);

	let invMax: number;
	if (ac.length > 0) {
		const totalMax = Math.max(...ac);
		const qmax = clamp(floor(totalMax * 166 - 0.5), 0, 82);
		invMax = 1 / ((qmax + 1) / 166);
		hash += BASE83.encode(qmax, 1);
	} else {
		invMax = 1;
		hash += BASE83.encode(0, 1);
	}
	// DCT base DC offset
	hash += BASE83.encode(__encodeDC(dct[0], dct[1], dct[2]), 4);
	// deltas
	for (k = 0; k < ac.length; k += 3) {
		hash += BASE83.encode(
			__encodeAC(ac[k], ac[k + 1], ac[k + 2], invMax),
			2
		);
	}
	return hash;
};

/**
 * Similar to {@link encode}, but uses the image data of given canvas element as
 * input for encoding.
 *
 * @param canvas
 * @param detailX
 * @param detailY
 */
export const encodeFromCanvas = (
	canvas: HTMLCanvasElement,
	detailX?: number,
	detailY?: number
) => {
	return encode(
		new Uint32Array(
			canvas
				.getContext("2d")!
				.getImageData(0, 0, canvas.width, canvas.height).data.buffer
		),
		canvas.width,
		canvas.height,
		detailX,
		detailY
	);
};

/**
 * Syntax sugar for {@link encodeFromCanvas}. Creates a canvas and draws given
 * image into it. `width` and `height` default to the actual image size, but can be
 * used to resize the image prior to encoding (recommended for large images).
 *
 * @param img
 * @param width
 * @param height
 * @param detailX
 * @param detailY
 */
export const encodeFromImage = (
	img: HTMLImageElement,
	width = img.width,
	height = img.height,
	detailX?: number,
	detailY?: number
) => encodeFromCanvas(imageCanvas(img, width, height).canvas, detailX, detailY);

/** @internal */
const __convolve = (
	coeffs: number[],
	abgrPixels: Uint32Array,
	width: number,
	height: number,
	cosX: number[],
	cosY: number[]
) => {
	let r = 0,
		g = 0,
		b = 0,
		cy: number,
		col: number,
		scale: number;
	for (let y = 0, i = 0; y < height; y++) {
		cy = cosY[y];
		for (let x = 0; x < width; x++, i++) {
			col = abgrPixels[i];
			scale = cosX[x] * cy;
			r += scale * __toLinear(col);
			g += scale * __toLinear(col, 8);
			b += scale * __toLinear(col, 16);
		}
	}
	scale = 1 / (width * height);
	coeffs.push(r * scale, g * scale, b * scale);
};

/** @internal */
const __encodeDC: FnN3 = (r, g, b) =>
	__fromLinear(r, 16) | __fromLinear(g, 8) | __fromLinear(b);

/** @internal */
const __encodeAC: FnN4 = (r, g, b, invMax) =>
	__ac(r * invMax) * 19 * 19 + __ac(g * invMax) * 19 + __ac(b * invMax);

/** @internal */
const __ac: FnN = (x) => clamp(floor(signedPow(x, 0.5) * 9 + 9.5), 0, 18);
