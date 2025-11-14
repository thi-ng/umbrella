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
import { magSq } from "@thi.ng/vectors/magsq";
import type { FeatureAnalysisResult } from "./api.ts";

const { sqrt } = Math;

const FMT_EDGE = FLOAT_GRAY_RANGE(-24, 24);
const FMT_SOBEL = FLOAT_GRAY_RANGE(-4, 4);

export const analyzeFeatures = (
	img: FloatBuffer | IntBuffer
): FeatureAnalysisResult => {
	const { width, height } = img;
	const numPixels = width * height;
	const $img =
		img.format !== FLOAT_GRAY ? img.as(FLOAT_GRAY) : <FloatBuffer>img;

	const imgEdge = convolveImage($img, { kernel: EDGE5 });
	imgEdge.format = FMT_EDGE;
	const imgSobelX = convolveImage($img, { kernel: SOBEL_X });
	imgSobelX.format = FMT_SOBEL;
	const imgSobelY = convolveImage($img, { kernel: SOBEL_Y });
	imgSobelY.format = FMT_SOBEL;

	const edge = sqrt(magSq(imgEdge.data)) / numPixels;
	const sobX = magSq(imgSobelX.data);
	const sobY = magSq(imgSobelY.data);
	const sobelX = sqrt(sobX) / numPixels;
	const sobelY = sqrt(sobY) / numPixels;
	const sobel = sqrt(sobX + sobY) / numPixels;

	return {
		imgEdge,
		imgSobelX,
		imgSobelY,
		edge,
		sobelX,
		sobelY,
		sobel,
	};
};
