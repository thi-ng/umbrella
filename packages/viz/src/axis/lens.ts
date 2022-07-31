import { mergeDeepObj } from "@thi.ng/associative/merge-deep";
import { lens, mix } from "@thi.ng/math/mix";
import { safeDiv } from "@thi.ng/math/safe-div";
import type {
	AxisSpec,
	Domain,
	InitialAxisSpec,
	Range,
	ScaleFn,
} from "../api.js";
import { axisDefaults } from "./common.js";

export const lensScale = (
	[d1, d2]: Domain,
	[r1, r2]: Range,
	focus = (d1 + d2) / 2,
	strength: number
): ScaleFn => {
	const dr = d2 - d1;
	const f = safeDiv(focus - d1, dr);
	return (x) => mix(r1, r2, lens(f, strength, safeDiv(x - d1, dr)));
};

export const lensAxis = (
	src: InitialAxisSpec & { focus?: number; strength?: number }
): AxisSpec => {
	const spec = mergeDeepObj(
		axisDefaults({
			focus: (src.domain[0] + src.domain[1]) / 2,
			strength: 1,
		}),
		src
	);
	!spec.scale &&
		(spec.scale = lensScale(
			spec.domain,
			spec.range,
			spec.focus,
			spec.strength
		));
	return spec;
};
