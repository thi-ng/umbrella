import type { ICopy } from "@thi.ng/api";

export interface INorm {
    /**
     * Returns float in [-scale..scale) interval.
     *
     * @remarks
     * Not to be confused with the {@link normal} distribution function. The
     * name here refers to "normalized".
     *
     * @param scale - default 1
     */
    norm(scale?: number): number;
}

export interface IRandom extends INorm {
    /**
     * Returns unsigned 32bit int
     */
    int(): number;
    /**
     * Returns float in [0..max) interval.
     *
     * @param max - default 1
     */
    float(max?: number): number;
    /**
     * Returns float in [min..max) interval.
     *
     * @param min -
     * @param max -
     */
    minmax(min: number, max: number): number;
}

export interface ISeedable<T> {
    seed(n: T): this;
}

export type ISeedableRandom<T> = IRandom & ISeedable<T> & ICopy<IRandom>;
