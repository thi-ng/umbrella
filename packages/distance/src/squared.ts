import { distSq, distSq2, distSq3, ReadonlyVec } from "@thi.ng/vectors";
import type { Metric, IDistance } from "./api";

export class DistSquared<T> implements IDistance<T> {
    constructor(public readonly metric: Metric<T>) {}

    to(x: number) {
        return x * x;
    }

    from(x: number) {
        return Math.sqrt(x);
    }
}

export const DIST_SQ = new DistSquared<ReadonlyVec>(distSq);

export const DIST_SQ1 = new DistSquared<number>((a, b) => (a - b) ** 2);

export const DIST_SQ2 = new DistSquared<ReadonlyVec>(distSq2);

export const DIST_SQ3 = new DistSquared<ReadonlyVec>(distSq3);
