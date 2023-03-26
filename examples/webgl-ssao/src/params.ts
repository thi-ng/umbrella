import type { IObjectOf } from "@thi.ng/api";
import { reactive, type Stream } from "@thi.ng/rstream";
import { assocObj, map, pairs, push, transduce } from "@thi.ng/transducers";

const slider = (label: string, attribs: any, stream: Stream<number>) => () =>
	[
		"div.mb2",
		["span.dib.w4", label],
		[
			"input.w5",
			{
				...attribs,
				type: "range",
				value: stream.deref(),
				oninput: (e: Event) =>
					stream.next(parseFloat((<HTMLInputElement>e.target).value)),
			},
		],
		["span.ml3", stream.deref()],
	];

type ParamDef = [string, any, number];

// prettier-ignore
export const PARAM_DEFS: IObjectOf<ParamDef> = {
    radius: ["radius", { min: 2, max: 64, step: 1 }, 32],
    bias: ["bias", { min: -0.2, max: 0.2, step: 0.01 }, 0.09],
    baseAttenuation: ["base attenuation", { min: 0.1, max: 2, step: 0.01 }, 1],
    distAttenuation: ["dist attenuation", { min: 0.1, max: 2, step: 0.01 }, 1.2],
    amp: ["amplitude", { min: 0, max: 1, step: 0.01 }, 1],
    specular: ["specular", { min: 0, max: 1, step: 0.01 }, 0.25],
    lightTheta: ["light rotation", { min: 0, max: 3.14, step: 0.01 }, 0.48],
    eyeDist: ["cam distance", { min: 5, max: 10, step: 0.01 }, 5]
};

export const PARAMS = transduce(
	map<[string, ParamDef], [string, Stream<number>]>(([id, spec]) => [
		id,
		reactive(spec[2]),
	]),
	assocObj(),
	pairs(PARAM_DEFS)
);

export const CONTROLS = transduce(
	map(([id, [label, attribs]]) => slider(label, attribs, PARAMS[id])),
	push(),
	pairs(PARAM_DEFS)
);
