import type { Fn, Fn0, Fn2 } from "@thi.ng/api";

export type Timestamp = number | bigint;

export type TimingResult<T> = [T, number];

export interface BenchmarkOpts {
	/**
	 * Benchmark title (only used if `print` enabled)
	 */
	title: string;
	/**
	 * Number of iterations
	 *
	 * @defaultValue 1000
	 */
	iter: number;
	/**
	 * Number of calls per iteration, i.e. total number of iterations will be
	 * `iter * size`.
	 *
	 * @defaultValue 1
	 */
	size: number;
	/**
	 * Externally defined batch size, similar to {@link BenchmarkOpts.size},
	 * i.e. calls per iteration. However, this option is ONLY used for computing
	 * {@link BenchmarkResult.freq} and has no impact on actual benchmark
	 * execution.
	 *
	 * @remarks
	 * This option is only to be used if the benchmarked function uses internal
	 * looping to execute multiple iterations. E.g. if internally executing N
	 * iterations, `extSize` should be set to that number.
	 */
	extSize: number;
	/**
	 * Number of warmup iterations (not included in results).
	 *
	 * @defaultValue 10
	 */
	warmup: number;
	/**
	 * Result formatter
	 *
	 * @defaultValue FORMAT_DEFAULT
	 */
	format: BenchmarkFormatter;
	/**
	 * If false, all output will be supressed.
	 *
	 * @defaultValue true
	 */
	output: boolean;
}

export type OptsWithoutTitle = Omit<BenchmarkOpts, "title">;

export interface BenchmarkSuiteOpts extends OptsWithoutTitle {}

export interface BenchmarkResult {
	title: string;
	/**
	 * Number of iterations
	 */
	iter: number;
	/**
	 * Number of calls per iteration
	 */
	size: number;
	/**
	 * Total execution time for all runs (in ms)
	 */
	total: number;
	/**
	 * Frequency aka number of ops per second
	 */
	freq: number;
	/**
	 * Mean execution time (in ms) per iteration (batch of
	 * {@link BenchmarkResult.size} calls)
	 */
	mean: number;
	/**
	 * Median execution time (in ms) per iteration (batch of
	 * {@link BenchmarkResult.size} calls)
	 */
	median: number;
	/**
	 * Min execution time (in ms) per iteration (batch of
	 * {@link BenchmarkResult.size} calls)
	 */
	min: number;
	/**
	 * Max execution time (in ms) per iteration (batch of
	 * {@link BenchmarkResult.size} calls)
	 */
	max: number;
	/**
	 * First quartile execution time (in ms) per iteration (batch of
	 * {@link BenchmarkResult.size} calls). I.e. 25% of all runs were
	 * faster/equal to this measurement.
	 */
	q1: number;
	/**
	 * Third quartile execution time (in ms) per iteration (batch of
	 * {@link BenchmarkResult.size} calls). I.e. 25% of all runs were
	 * equal/slower than this measurement.
	 */
	q3: number;
	/**
	 * Standard deviation (in percent)
	 */
	sd: number;
}

export interface BenchmarkFormatter {
	/**
	 * Called once before the benchmark suite runs any benchmarks.
	 */
	prefix: Fn0<string>;
	/**
	 * Called once for each given benchmark in the suite. Receives benchmark
	 * options.
	 */
	start: Fn<BenchmarkOpts, string>;
	/**
	 * Called once per benchmark, just after warmup. Receives warmup time taken
	 * (in milliseconds) and benchmark opts.
	 */
	warmup: Fn2<number, BenchmarkOpts, string>;
	/**
	 * Called once per benchmark with collected result.
	 */
	result: Fn<BenchmarkResult, string>;
	/**
	 * Called once after all benchmarks have run. Receives array of all results.
	 */
	total: Fn<BenchmarkResult[], string>;
	/**
	 * Called at the very end of the benchmark suite. Useful if a format
	 * requires any form of final suffix.
	 */
	suffix: Fn0<string>;
}

export interface Benchmark {
	/**
	 * Benchmark title
	 */
	title: string;
	/**
	 * Benchmark function. Will be called `size` times per `iter`ation (see
	 * {@link BenchmarkOpts}).
	 */
	fn: Fn0<void>;
	/**
	 * Optional & partial benchmark specific option overrides (merged with opts
	 * given to suite)
	 */
	opts?: Partial<OptsWithoutTitle>;
}

let PRECISION = 2;

export const setPrecision = (prec: number) => (PRECISION = prec);

export const FLOAT = (x: number) => x.toFixed(PRECISION);

export const EMPTY = () => "";
