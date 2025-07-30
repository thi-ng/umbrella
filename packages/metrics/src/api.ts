/**
 * 2-tuple representing a closed [min,max] value range/interval
 */
export type Range = [number, number];

export interface Metric {
	/** Average value */
	mean: number;
	/** Minimum value */
	min: number;
	/** Maximum value */
	max: number;
	/** Standard deviation */
	sd: number;
}

export interface WeightedMetric extends Metric {
	/**
	 * Weighted mean value (see {@link defWeightedMetric}).
	 */
	weighted: number;
}
