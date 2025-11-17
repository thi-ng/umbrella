// SPDX-License-Identifier: Apache-2.0
import { isNumber } from "@thi.ng/checks";
import type { Sharp } from "sharp";
import type { MaxSizeSpec, Processor, ResizeSpec } from "../api.js";
import { resizeProc } from "./resize.js";

export const maxsizeProc: Processor = async (spec, input, ctx) => {
	const { maxSize } = <MaxSizeSpec>spec;
	const [width, height] = ctx.size;
	const result: [Sharp, boolean] = [input, false];
	if (isNumber(maxSize)) {
		if (width > maxSize || height > maxSize)
			return resizeProc(
				<ResizeSpec>{ ...spec, size: maxSize, unit: "px" },
				input,
				ctx
			);
	} else {
		const [maxW, maxH] = maxSize;
		const resizeWidth = maxW > 0 && width > maxW;
		const resizeHeight = maxH > 0 && height > maxH;
		const specW = <ResizeSpec>{ ...spec, size: [maxW, -1], unit: "px" };
		const specH = { ...specW, size: [-1, maxH] };
		if (width >= height) {
			return resizeWidth
				? resizeProc(specW, input, ctx)
				: resizeHeight
				? resizeProc(specH, input, ctx)
				: result;
		} else {
			return resizeHeight
				? resizeProc(specH, input, ctx)
				: resizeWidth
				? resizeProc(specW, input, ctx)
				: result;
		}
	}
	return result;
};
