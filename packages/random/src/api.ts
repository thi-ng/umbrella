import type { ICopy } from "@thi.ng/api";

export interface IRandom {
    int(): number;
    float(norm?: number): number;
    norm(scale?: number): number;
    minmax(min: number, max: number): number;
    gaussian(samples?: number, offset?: number, scale?: number): number;
}

export interface ISeedable<T> {
    seed(n: T): this;
}

export type ISeedableRandom<T> = IRandom & ISeedable<T> & ICopy<IRandom>;
