import type { GammaSpec, Processor } from "../api.js";

export const gammaProc: Processor = async (spec, input) => {
	const { gamma } = <GammaSpec>spec;
	return [input.gamma(gamma, 1), false];
};
