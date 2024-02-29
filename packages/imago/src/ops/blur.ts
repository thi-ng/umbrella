import type { BlurSpec, Processor } from "../api.js";

export const blurProc: Processor = async (spec, input) => {
	const { radius } = <BlurSpec>spec;
	return [input.blur(1 + radius / 2), false];
};
