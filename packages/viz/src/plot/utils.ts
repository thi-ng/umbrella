import type { Fn } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { clamp, inRange } from "@thi.ng/math/interval";
import type {
	AxisSpec,
	Domain,
	DomainValues,
	PlotFn,
	VizSpec,
} from "../api.js";

/** @internal */
export const __resolveData = <T = number>(
	data: DomainValues<T>,
	domain: Domain
) => (isFunction(data) ? data(domain) : data);

/** @internal */
export const __valueMapper =
	(
		{ scale: scaleX }: AxisSpec,
		{ scale: scaleY, domain: [dmin, dmax] }: AxisSpec,
		project: Fn<number[], number[]> = (x) => x
	) =>
	([x, y]: number[]) =>
		project([scaleX(x), scaleY(clamp(y, dmin, dmax))]);

export function processedPoints(
	{ xaxis, yaxis, project }: VizSpec,
	data: DomainValues
): IterableIterator<[number[], number[]]>;
export function processedPoints(
	{ xaxis, yaxis, project }: VizSpec,
	data: DomainValues,
	pointsOnly: true
): IterableIterator<number[]>;
export function* processedPoints(
	{ xaxis, yaxis, project }: VizSpec,
	data: DomainValues,
	pointOnly = false
): IterableIterator<any> {
	const mapper = __valueMapper(xaxis, yaxis, project);
	const [dmin, dmax] = xaxis.domain;
	for (let p of __resolveData(data, xaxis.domain)) {
		if (!inRange(p[0], dmin, dmax)) continue;
		yield pointOnly ? mapper(p) : [mapper(p), p];
	}
}

/**
 * Returns a simple {@link PlotFn} which uses a single `shape` element and
 * produces its points via {@link processedPoints}.
 *
 * @param shape -
 *
 * @internal
 */
export const defSimplePlotFn =
	<T extends { attribs: any }>(shape: string) =>
	(data: DomainValues, opts: Partial<T> = {}): PlotFn =>
	(spec) =>
		[shape, opts.attribs || {}, [...processedPoints(spec, data, true)]];
