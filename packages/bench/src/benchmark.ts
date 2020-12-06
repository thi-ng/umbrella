import type { BenchmarkOpts, BenchmarkResult } from "./api";
import { benchResult } from "./bench";
import { timedResult } from "./timed";

export const benchmark = (
    fn: () => void,
    opts?: Partial<BenchmarkOpts>
): BenchmarkResult => {
    opts = { title: "", iter: 1e3, warmup: 10, print: true, ...opts };
    const { iter, warmup, print } = opts;
    print && console.log(`benchmarking: ${opts.title}`);
    const t = benchResult(fn, warmup)[1];
    print && console.log(`\twarmup... ${t.toFixed(2)}ms (${warmup} runs)`);
    print && console.log("\texecuting...");
    const samples: number[] = [];
    for (let i = iter!; --i >= 0; ) {
        samples.push(timedResult(fn)[1]);
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
    if (print) {
        console.log(`\ttotal: ${total.toFixed(2)}ms, runs: ${iter}`);
        console.log(
            `\tmean: ${mean.toFixed(2)}ms, median: ${median.toFixed(
                2
            )}ms, range: [${min.toFixed(2)}..${max.toFixed(2)}]`
        );
        console.log(`\tq1: ${q1.toFixed(2)}ms, q3: ${q3.toFixed(2)}ms`);
        console.log(`\tsd: ${sd.toFixed(2)}%`);
    }
    return {
        iter: iter!,
        total,
        mean,
        median,
        min,
        max,
        q1,
        q3,
        sd,
    };
};
