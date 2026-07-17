// SPDX-License-Identifier: Apache-2.0
import type { BenchmarkOpts, BenchmarkResult } from "./api.js";
import { benchResult, benchResultAsync } from "./bench.js";
import { FORMAT_DEFAULT } from "./format/default.js";

export const DEFAULT_OPTS: BenchmarkOpts = {
	title: "benchmark",
	iter: 1e3,
	size: 1,
	extSize: 1,
	warmup: 10,
	output: true,
	format: FORMAT_DEFAULT,
};

export const benchmark = (fn: () => any, opts?: Partial<BenchmarkOpts>) => {
	const $opts = <BenchmarkOpts>{ ...DEFAULT_OPTS, ...opts };
	let { iter, size, warmup, output, format } = $opts;
	output && outputString(format.start($opts));
	const t = benchResult(fn, warmup * size)[1];
	output && outputString(format.warmup(t, $opts));
	const samples: number[] = [];
	for (let i = iter; i-- > 0;) {
		samples.push(benchResult(fn, size)[1]);
	}
	return benchmarkResult(samples, $opts);
};

/**
 * Async version of {@link benchmark}.
 *
 * @param fn
 * @param opts
 */
export const benchmarkAsync = async (
	fn: () => Promise<any>,
	opts?: Partial<BenchmarkOpts>
) => {
	const $opts = <BenchmarkOpts>{ ...DEFAULT_OPTS, ...opts };
	let { iter, size, warmup, output, format } = $opts;
	output && outputString(format.start($opts));
	const t = (await benchResultAsync(fn, warmup * size))[1];
	output && outputString(format.warmup(t, $opts));
	const samples: number[] = [];
	for (let i = iter; i-- > 0;) {
		samples.push((await benchResultAsync(fn, size))[1]);
	}
	return benchmarkResult(samples, $opts);
};

/**
 * Helper for {@link benchmark}, {@link benchmarkAsync}. Takes an array of
 * benchmark samples and computes result statistics using provided options. If
 * `opts.output` is true, also outputs formatted result.
 *
 * @param samples
 * @param opts
 */
export const benchmarkResult = (
	samples: number[],
	{ iter, size, extSize, format, output, title }: BenchmarkOpts
): BenchmarkResult => {
	samples.sort((a, b) => a - b);
	const total = samples.reduce((acc, x) => acc + x, 0);
	const freq = (iter * size * extSize * 1000) / total;
	const mean = total / iter;
	const median = samples[iter >> 1];
	const min = samples[0];
	const max = samples[iter - 1];
	const q1 = samples[Math.floor(iter * 0.25)];
	const q3 = samples[Math.floor(iter * 0.75)];
	const sd =
		(Math.sqrt(
			samples.reduce((acc, x) => acc + (mean - x) ** 2, 0) / iter
		) /
			mean) *
		100;
	const res: BenchmarkResult = {
		title,
		iter,
		size,
		total,
		freq,
		mean,
		median,
		min,
		max,
		q1,
		q3,
		sd,
	};
	output && outputString(format.result(res));
	return res;
};

/**
 * Only outputs non-empty strings to console.
 *
 * @param str
 *
 * @internal
 */
export const outputString = (str: string) => str !== "" && console.log(str);
