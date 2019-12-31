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
     * Number of warmup iterations (not included in results).
     *
     * @defaultValue 10
     */
    warmup: number;
    /**
     * If true, writes progress & results to console.
     *
     * @defaultValue true
     */
    print: boolean;
}

export interface BenchmarkResult {
    /**
     * Number of iterations
     */
    iter: number;
    /**
     * Total execution time for all runs (in ms)
     */
    total: number;
    /**
     * Mean execution time (in ms)
     */
    mean: number;
    /**
     * Median execution time (in ms)
     */
    median: number;
    /**
     * Min execution time (in ms)
     */
    min: number;
    /**
     * Max execution time (in ms)
     */
    max: number;
    /**
     * First quartile execution time (in ms). I.e. 25% of all runs were
     * faster/equal to this measurement.
     */
    q1: number;
    /**
     * Third quartile execution time (in ms). I.e. 25% of all runs were
     * equal/slower than this measurement.
     */
    q3: number;
    /**
     * Standard deviation (in percent)
     */
    sd: number;
}
