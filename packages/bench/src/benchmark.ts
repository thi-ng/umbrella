import type { BenchmarkOpts, BenchmarkResult } from "./api.js";
import { benchResult } from "./bench.js";
import { FORMAT_DEFAULT } from "./format/default.js";

export const DEFAULT_OPTS: BenchmarkOpts = {
    title: "benchmark",
    iter: 1e3,
    size: 1,
    warmup: 10,
    output: true,
    format: FORMAT_DEFAULT,
};

export const benchmark = (
    fn: () => void,
    opts?: Partial<BenchmarkOpts>
): BenchmarkResult => {
    const _opts = <BenchmarkOpts>{ ...DEFAULT_OPTS, ...opts };
    const { iter, size, warmup, output, format } = _opts;
    output && outputString(format!.start(_opts));
    const t = benchResult(fn, warmup * size)[1];
    output && outputString(format!.warmup(t, _opts));
    const samples: number[] = [];
    for (let i = iter!; --i >= 0; ) {
        samples.push(benchResult(fn, size)[1]);
    }
    samples.sort((a, b) => a - b);
    const total = samples.reduce((acc, x) => acc + x, 0);
    const mean = total / iter!;
    const median = samples[iter! >> 1];
    const min = samples[0];
    const max = samples[iter! - 1];
    const q1 = samples[Math.ceil(iter! * 0.25)];
    const q3 = samples[Math.ceil(iter! * 0.75)];
    const sd =
        (Math.sqrt(
            samples.reduce((acc, x) => acc + (mean - x) ** 2, 0) / iter!
        ) /
            mean) *
        100;
    const res: BenchmarkResult = {
        title: _opts.title,
        iter,
        size,
        total,
        mean,
        median,
        min,
        max,
        q1,
        q3,
        sd,
    };
    output && outputString(format!.result(res));
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
