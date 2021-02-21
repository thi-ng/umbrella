import type { Fn, Fn3 } from "@thi.ng/api";
import type { FuzzyFn, LVarDomain } from "@thi.ng/fuzzy";

export type InstrumentFn<T> = Fn3<FuzzyFn, LVarDomain, number, T>;

export interface AsciiVizOpts {
    /**
     * Width in characters
     *
     * @defaultValue 100
     */
    width: number;
    /**
     * Height in characters
     *
     * @defaultValue 16
     */
    height: number;
    /**
     * Char to use for empty space
     *
     * @defaultValue "."
     */
    empty: string;
}

export interface VizualizeVarOpts {
    /**
     * Number of samples to evaluate for each fuzzy set.
     *
     * @defaultValue 200
     */
    samples: number;
    /**
     * Visualization width
     *
     * @defaultValue 600
     */
    width: number;
    /**
     * Visualization height
     *
     * @defaultValue 100
     */
    height: number;
    /**
     * If true, includes a legend of color coded labels of the fuzzy sets.
     *
     * @defaultValue true
     */
    labels: boolean;
    /**
     * Color factory function. Converts number in [0..1) interval into an CSS
     * color string.
     */
    stroke: Fn<number, string>;
    /**
     * Color factory function. Converts number in [0..1) interval into an CSS
     * color string.
     */
    fill: Fn<number, string>;
}
