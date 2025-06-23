// SPDX-License-Identifier: Apache-2.0
import {
	convolveImage,
	EDGE5,
	SOBEL_X,
	SOBEL_Y,
} from "@thi.ng/pixel-convolve/convolve";
import { type FloatBuffer } from "@thi.ng/pixel/float";
import { FLOAT_GRAY } from "@thi.ng/pixel/format/float-gray";
import { FLOAT_GRAY_RANGE } from "@thi.ng/pixel/format/float-gray-range";
import type { IntBuffer } from "@thi.ng/pixel/int";

const FMT_EDGE = FLOAT_GRAY_RANGE(-24, 24);
const FMT_SOBEL = FLOAT_GRAY_RANGE(-4, 4);

export const analyzeFeatures = (img: FloatBuffer | IntBuffer) => {
	const $img =
		img.format !== FLOAT_GRAY ? img.as(FLOAT_GRAY) : <FloatBuffer>img;
	const { width, height } = $img;
	const numPixels = width * height;

	const imgEdge = convolveImage($img, { kernel: EDGE5 });
	imgEdge.format = FMT_EDGE;

	const imgSobelX = convolveImage($img, { kernel: SOBEL_X });
	imgSobelX.format = FMT_SOBEL;

	const imgSobelY = convolveImage($img, { kernel: SOBEL_Y });
	imgSobelY.format = FMT_SOBEL;

	const magSq = (img: FloatBuffer) =>
		img.data.reduce((acc, x) => acc + x * x);

	const scoreEdge = Math.sqrt(magSq(imgEdge)) / numPixels;
	const scoreSobel =
		Math.sqrt(magSq(imgSobelX) + magSq(imgSobelY)) / numPixels;

	return {
		imgEdge,
		imgSobelX,
		imgSobelY,
		scoreEdge,
		scoreSobel,
	};
};
