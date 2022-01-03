import type { IRandom } from "@thi.ng/random";
import { pickRandom } from "@thi.ng/random/pick-random";
import { SYSTEM } from "@thi.ng/random/system";
import { weightedRandom } from "@thi.ng/random/weighted-random";
import { analog } from "./analog.js";
import type { TypedColor } from "./api.js";

export interface VariationOpts {
    /**
     * Max. number of color variations to produce.
     *
     * @defaultValue Infinity
     */
    num: number;
    /**
     * Weights (given in same order as colors) for randomly selecting colors. By
     * default colors will be chosen with uniform distribution.
     */
    weights: number[];
    /**
     * Normalized tolerance value for randomizing channel values
     *
     * @defaultValue 0.05
     */
    delta: number;
    /**
     * PRNG instance to use.
     *
     * @defaultValue SYSTEM (aka `Math.random()`)
     */
    rnd: IRandom;
}

export function* variations<T extends TypedColor<any>>(
    src: T[],
    opts?: Partial<VariationOpts>
) {
    opts = { rnd: SYSTEM, delta: 0.05, num: Infinity, ...opts };
    const pick = opts.weights
        ? weightedRandom(src, opts.weights, opts.rnd)
        : () => pickRandom(src, opts!.rnd);
    for (let i = opts.num!; i-- > 0; ) {
        const col = pick();
        yield <T>analog(col.empty(), col, opts.delta!, opts.rnd);
    }
}
