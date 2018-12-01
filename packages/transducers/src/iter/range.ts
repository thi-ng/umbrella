import { isReduced, Reduced } from "../reduced";
import { IReducible, ReductionFn } from "../api";

export function range();
export function range(to: number);
export function range(from: number, to: number);
export function range(from: number, to: number, step: number);
export function range(from?: number, to?: number, step?: number) {
    return new Range(from, to, step);
};

/**
 * Simple class wrapper around given range interval and implementing
 * `Iterable` and `IReducible` interfaces, the latter is used to
 * accelerate use with `reduce`.
 */
export class Range implements
    Iterable<number>,
    IReducible<any, number> {

    protected from: number;
    protected to: number;
    protected step: number;

    constructor(to: number);
    constructor(from: number, to: number);
    constructor(from: number, to: number, step: number);
    constructor(from?: number, to?: number, step?: number) {
        if (from === undefined) {
            from = 0;
            to = Infinity;
        } else if (to === undefined) {
            to = from;
            from = 0;
        }
        step = step === undefined ? (from < to ? 1 : -1) : step;
        this.from = from;
        this.to = to;
        this.step = step;
    }

    *[Symbol.iterator]() {
        const step = this.step;
        const to = this.to;
        let from = this.from;
        if (step > 0) {
            while (from < to) {
                yield from;
                from += step;
            }
        } else if (step < 0) {
            while (from > to) {
                yield from;
                from += step;
            }
        }
    }

    $reduce<T>(rfn: ReductionFn<T, number>, acc: T): T | Reduced<T> {
        const step = this.step;
        if (step > 0) {
            for (let i = this.from, n = this.to;
                i < n && !isReduced(acc);
                i += step) {
                acc = <any>rfn(acc, i);
            }
        } else {
            for (let i = this.from, n = this.to;
                i > n && !isReduced(acc);
                i += step) {
                acc = <any>rfn(acc, i);
            }
        }
        return acc;
    }
}
