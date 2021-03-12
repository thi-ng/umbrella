import { BenchmarkFormatter, EMPTY, FLOAT } from "../api";

export const FORMAT_DEFAULT: BenchmarkFormatter = {
    prefix: EMPTY,
    start: ({ title }) => `benchmarking: ${title}`,
    warmup: (t, { warmup }) => `\twarmup... ${FLOAT(t)}ms (${warmup} runs)`,
    result: ({ iter, size, total, mean, median, min, max, q1, q3, sd }) =>
        // prettier-ignore
        `\ttotal: ${FLOAT(total)}ms, runs: ${iter} (@ ${size} calls/iter)
\tmean: ${FLOAT(mean)}ms, median: ${FLOAT(median)}ms, range: [${FLOAT(min)}..${FLOAT(max)}]
\tq1: ${FLOAT(q1)}ms, q3: ${FLOAT(q3)}ms
\tsd: ${FLOAT(sd)}%`,
    total: (res) => {
        const fastest = res.slice().sort((a, b) => a.mean - b.mean)[0];
        return `Fastest: "${fastest.title}"`;
    },
    suffix: () => `---`,
};
