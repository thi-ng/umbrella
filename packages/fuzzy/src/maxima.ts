import { EPS, eqDelta } from "@thi.ng/math";
import type { DefuzzStrategy } from "./api";

export interface MaximaOpts {
    samples: number;
    eps: number;
}

const defaultOpts = (opts?: Partial<MaximaOpts>): MaximaOpts => ({
    samples: 100,
    eps: EPS,
    ...opts,
});

export const meanOfMaximaStrategy = (
    opts?: Partial<MaximaOpts>
): DefuzzStrategy => {
    const { samples, eps } = defaultOpts(opts);
    return (fn, [min, max]) => {
        const delta = (max - min) / samples;
        let peak = -Infinity;
        let peakPos = min;
        let n = 1;
        for (let i = 0; i <= samples; i++) {
            const t = min + i * delta;
            const x = fn(t);
            if (eqDelta(x, peak, eps)) {
                peakPos += t;
                n++;
            } else if (x > peak) {
                peak = x;
                peakPos = t;
                n = 1;
            }
        }
        return peakPos / n;
    };
};

export const firstOfMaximaStrategy = (
    opts?: Partial<MaximaOpts>
): DefuzzStrategy => {
    const { samples } = defaultOpts(opts);
    return (fn, [min, max]) => {
        const delta = (max - min) / samples;
        let peak = -Infinity;
        let peakPos = min;
        for (let i = 0; i <= samples; i++) {
            const t = min + i * delta;
            const x = fn(t);
            if (x > peak) {
                peak = x;
                peakPos = t;
            }
        }
        return peakPos;
    };
};

export const lastOfMaximaStrategy = (
    opts?: Partial<MaximaOpts>
): DefuzzStrategy => {
    const impl = firstOfMaximaStrategy(opts);
    return (fn, [min, max]) => impl(fn, [max, min]);
};
