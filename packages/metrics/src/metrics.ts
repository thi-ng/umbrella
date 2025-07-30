import type { NumericArray } from "@thi.ng/api";
import { TAU } from "@thi.ng/math/api";
import { fract } from "@thi.ng/math/prec";
import { circularMean, circularSD } from "@thi.ng/vectors/circular";
import { dot } from "@thi.ng/vectors/dot";
import { vmax } from "@thi.ng/vectors/max";
import { vmean } from "@thi.ng/vectors/mean";
import { vmin } from "@thi.ng/vectors/min";
import { sd } from "@thi.ng/vectors/variance";
import type { Metric, Range, WeightedMetric } from "./api.js";

/**
 * Computes a {@link Metric} for given `values`.
 *
 * @remarks
 * Use {@link defCircularMetric} for angular/circular values. Use
 * {@link defWeightedMetric} if the values have assigned weights.
 *
 * @param values
 */
export const defMetric = (values: NumericArray): Metric => {
	const [min, max] = valueRange(values);
	return {
		min,
		max,
		mean: vmean(values),
		sd: sd(values),
	};
};

/**
 * Computes a {@link WeightedMetric} for given `values` and their `weights` (the
 * latter MUST sum to 1.0).
 *
 * @remarks
 * The `weighted` result is computed as `dot(values, weights)`.
 *
 * @param values
 * @param weights
 */
export const defWeightedMetric = (
	values: NumericArray,
	weights: NumericArray
): WeightedMetric => {
	const [min, max] = valueRange(values);
	const mean = vmean(values);
	return {
		min,
		max,
		mean,
		sd: sd(values),
		weighted: dot(values, weights),
	};
};

/**
 * Computes a {@link Metric} for given angular/circular `values` (normalized to
 * [0,1] range). The `mean` and `sd` are computed using circular versions and
 * the `min`/`max` bounds via {@link circularRange}.
 *
 * @param values
 */
export const defCircularMetric = (values: NumericArray): Metric => {
	const scaledValues = values.map((x) => x * TAU);
	const mean = fract(circularMean(scaledValues) / TAU);
	const [min, max] = circularRange(values, mean);
	return {
		min,
		max,
		mean,
		sd: circularSD(scaledValues) / TAU,
	};
};

export const valueRange = (values: NumericArray): Range => [
	vmin(values),
	vmax(values),
];

/**
 * Constructs the min/max range of given normalized angular `values` around
 * given mean hue (also normalized), considering circular wrap-around. If `min >
 * max` in the result `[min,max]`, then the hue range is crossing 0 degrees.
 *
 * @param values
 * @param range
 * @param mean
 */
export const circularRange = (values: NumericArray, mean: number): Range => {
	const range = valueRange(values);
	const [min, max] = range;
	if (mean < min || mean > max) {
		return [
			(<number[]>values).reduce(
				(acc: number[], x: number) => {
					const d = fract(mean - x);
					return d < 0.5 && d > acc[1] ? [x, d] : acc;
				},
				[max, fract(mean - max)]
			)[0],
			(<number[]>values).reduce(
				(acc, x) => {
					const d = fract(x - mean);
					return d < 0.5 && d > acc[1] ? [x, d] : acc;
				},
				[min, fract(min - mean)]
			)[0],
		];
	}
	return range;
};

export const aggregateMetrics = (metrics: Metric[]): Metric => {
	const mean = __mean(metrics, "mean");
	const sd = __mean(metrics, "sd");
	const [min, max] = aggregateMetricRanges(metrics);
	return { mean, min, max, sd };
};

export const aggregateWeightedMetrics = (
	metrics: WeightedMetric[]
): WeightedMetric => {
	const res = <WeightedMetric>aggregateMetrics(metrics);
	res.weighted = __mean(metrics, "weighted");
	return res;
};

export const aggregateCircularMetrics = (metrics: Metric[]): Metric => {
	const mean = circularMean(metrics.map((x) => x.mean * TAU)) / TAU;
	const sd = __mean(metrics, "sd");
	const [min, max] = aggregateMetricRanges(metrics);
	return { mean, min, max, sd };
};

export const aggregateMetricRanges = (metrics: Metric[]): Range => [
	vmin(metrics.map((x) => x.min)),
	vmax(metrics.map((x) => x.max)),
];

/** @internal */
const __mean = <T extends Metric>(metrics: T[], key: keyof T) =>
	vmean(metrics.map((x) => <number>x[key]));
