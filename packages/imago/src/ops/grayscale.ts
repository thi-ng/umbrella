import { isNumber } from "@thi.ng/checks";
import type { GrayscaleSpec, Processor } from "../api.js";

export const grayscaleProc: Processor = async (spec, input) => {
	const { gamma } = <GrayscaleSpec>spec;
	if (gamma !== false) {
		input = input.gamma(isNumber(gamma) ? gamma : undefined);
	}
	return [input.grayscale(), true];
};
