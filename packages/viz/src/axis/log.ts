import type { FnN, FnU3 } from "@thi.ng/api";
import { mergeDeepObj } from "@thi.ng/associative/merge-deep";
import { inRange } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { range } from "@thi.ng/transducers/range";
import { range2d } from "@thi.ng/transducers/range2d";
import type {
	AxisSpec,
	Domain,
	InitialAxisSpec,
	Range,
	ScaleFn,
} from "../api.js";
import { axisDefaults } from "./common.js";

/** @internal */
export const log = (base: number): FnN => {
	const lb = 1 / Math.log(base);
	return (x) => (x > 0 ? Math.log(x) * lb : x < 0 ? -Math.log(-x) * lb : 0);
};

export const logScale__ = (
	[d1, d2]: Domain,
	[r1, r2]: Range,
	base = 10
): ScaleFn => {
	const $ = log(base);
	const dr = 1 / $(d2 - d1 + 1);
	return (x) => mix(r1, r2, $(x - d1 + 1) * dr);
};

export const logScale = (
	[d1, d2]: Domain,
	[r1, r2]: Range,
	base = 10
): ScaleFn => {
	const $ = log(base);
	const d11 = $(d1);
	const d3 = $(d2) - d11;
	return (x) => mix(r1, r2, ($(x) - d11) / d3);
};

export const logAxis = (src: InitialAxisSpec & { base?: number }): AxisSpec => {
	const spec = mergeDeepObj(axisDefaults({ base: 10 }), src);
	!spec.scale && (spec.scale = logScale(spec.domain, spec.range, spec.base));
	return spec;
};

/** @internal */
export const logDomain: FnU3<number, number[]> = (d1, d2, base) => {
	const $ = log(base);
	return [Math.floor($(d1)), Math.ceil($(d2))];
};

export const logTicksMajor =
	(base = 10) =>
	([d1, d2]: Domain) => {
		const [d1l, d2l] = logDomain(d1, d2, base);
		return [
			...iterator(
				comp(
					map((x) => Math.pow(base, x)),
					filter((x) => inRange(x, d1, d2))
				),
				range(d1l, d2l + 1)
			),
		];
	};

export const logTicksMinor =
	(base = 10) =>
	([d1, d2]: Domain) => {
		const [d1l, d2l] = logDomain(d1, d2, base);
		return [
			...iterator(
				comp(
					map(([m, n]) => (m * Math.pow(base, n)) / base),
					filter((x) => inRange(x, d1, d2))
				),
				range2d(1, base, d1l, d2l + 1)
			),
		];
	};
