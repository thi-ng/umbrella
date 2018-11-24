import { ICopy } from "@thi.ng/api/api";

export interface IRandom {
    int(): number;
    float(): number;
    norm(scale?: number): number;
    minmax(min: number, max: number): number;
    gaussian(samples?: number, offset?: number, scale?: number): number;
}

export interface ISeedable<T> {
    seed(n: T): this;
}

export type ISeedableRandom<T> = IRandom & ISeedable<T> & ICopy<IRandom>;

const INV_MAX = 1 / 0xffffffff;

export abstract class ARandom implements IRandom {

    abstract int(): number;

    float(norm = 1) {
        return this.int() * INV_MAX * norm;
    }

    norm(norm = 1) {
        return this.int() * INV_MAX * norm * 2 - norm;
    }

    minmax(min: number, max: number) {
        return this.float() * (max - min) + min;
    }

    /**
     * Returns approx. normal distribution using CLT.
     *
     * https://en.wikipedia.org/wiki/Central_limit_theorem
     *
     * @param n
     * @param offset
     * @param scale
     */
    gaussian(n = 10, offset = -0.5, scale = 1) {
        let sum = 0;
        let m = n;
        while (m-- > 0) sum += this.float(scale);
        return sum / n + offset;
    }
}
