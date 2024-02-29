import type { HSBLSpec, Processor } from "../api.js";

export const hsblProc: Processor = async (spec, input) => {
	const { h = 0, s = 1, b = 1, l = 0 } = <HSBLSpec>spec;
	return [
		input.modulate({
			hue: h,
			brightness: b,
			saturation: s,
			lightness: l * 255,
		}),
		true,
	];
};
