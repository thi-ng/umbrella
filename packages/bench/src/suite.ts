import type { Benchmark, BenchmarkResult, BenchmarkSuiteOpts } from "./api.js";
import { benchmark, DEFAULT_OPTS, outputString } from "./benchmark.js";

export const suite = (
    cases: Benchmark[],
    opts?: Partial<BenchmarkSuiteOpts>
) => {
    const _opts = <BenchmarkSuiteOpts>{
        ...DEFAULT_OPTS,
        ...opts,
    };
    _opts.output && outputString(_opts.format.prefix());
    const results: BenchmarkResult[] = [];
    for (let c of cases) {
        results.push(benchmark(c.fn, { ..._opts, ...c.opts, title: c.title }));
    }
    _opts.output && outputString(_opts.format.total(results));
    _opts.output && outputString(_opts.format.suffix());
    return results;
};
