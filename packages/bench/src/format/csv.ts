import { EMPTY, FLOAT, type BenchmarkFormatter } from "../api.js";

export const FORMAT_CSV: BenchmarkFormatter = {
	prefix: () =>
		`Title,Iterations,Size,Total,Frequency,Mean,Median,Min,Max,Q1,Q3,SD%`,
	start: EMPTY,
	warmup: EMPTY,
	result: (res) =>
		`"${res.title}",${res.iter},${res.size},${[
			res.total,
			res.freq,
			res.mean,
			res.median,
			res.min,
			res.max,
			res.q1,
			res.q3,
			res.sd,
		]
			.map(FLOAT)
			.join(",")}`,
	total: EMPTY,
	suffix: EMPTY,
};
