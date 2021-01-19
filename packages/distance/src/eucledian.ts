import { dist, dist2, dist3, ReadonlyVec } from "@thi.ng/vectors";
import type { Metric, IDistance } from "./api";

export class Eucledian<T> implements IDistance<T> {
    constructor(public readonly metric: Metric<T>) {}

    to(x: number) {
        return x;
    }

    from(x: number) {
        return x;
    }
}

export const EUCLEDIAN = new Eucledian<ReadonlyVec>(dist);

export const EUCLEDIAN1 = new Eucledian<number>((a, b) => Math.abs(a - b));

export const EUCLEDIAN2 = new Eucledian<ReadonlyVec>(dist2);

export const EUCLEDIAN3 = new Eucledian<ReadonlyVec>(dist3);
