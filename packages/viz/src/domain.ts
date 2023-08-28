import type { Fn } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { mix } from "@thi.ng/math/mix";
import { map } from "@thi.ng/transducers/map";
import { max } from "@thi.ng/transducers/max";
import { min } from "@thi.ng/transducers/min";
import { minMax } from "@thi.ng/transducers/min-max";
import { transduce } from "@thi.ng/transducers/transduce";
import type { DomainValueFn } from "./api.js";

export const uniformDomain = (src: Iterable<number>): DomainValueFn => {
	const vals = ensureArray(src);
	return ([d1, d2]) => {
		const norm = vals.length > 1 ? 1 / (vals.length - 1) : 0;
		return vals.map((x, i) => [mix(d1, d2, i * norm), x]);
	};
};

export const dataBounds = <T>(fn: Fn<T, number>, src: T[], pad = 0) => {
	const b = transduce(map(fn), minMax(), src);
	b[0] -= pad;
	b[1] += pad;
	return b;
};

export const dataBounds2 = <T>(
	min: Fn<T, number>,
	max: Fn<T, number>,
	src: T[],
	padMin = 0,
	padMax = padMin
) => [dataMin(min, src, padMin), dataMax(max, src, padMax)];

export const dataMin = <T>(fn: Fn<T, number>, src: T[], pad = 0) =>
	transduce(map(fn), min(), src) - pad;

export const dataMax = <T>(fn: Fn<T, number>, src: T[], pad = 0) =>
	transduce(map(fn), max(), src) + pad;

export const dataMinLog = <T>(fn: Fn<T, number>, src: T[], base = 10) =>
	Math.pow(base, Math.floor(Math.log(dataMin(fn, src)) / Math.log(base)));

export const dataMaxLog = <T>(fn: Fn<T, number>, src: T[], base = 10) =>
	Math.pow(base, Math.ceil(Math.log(dataMax(fn, src)) / Math.log(base)));

export const dataBoundsLog = <T>(
	fn: Fn<T, number>,
	src: T[],
	base?: number
) => [dataMinLog(fn, src, base), dataMaxLog(fn, src, base)];

export const dataBounds2Log = <T>(
	min: Fn<T, number>,
	max: Fn<T, number>,
	src: T[],
	base = 10
) => [dataMinLog(min, src, base), dataMaxLog(max, src, base)];
