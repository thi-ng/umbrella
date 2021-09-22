import type { IProc } from "./api";
import { AProc } from "./aproc";

/**
 * Higher order {@link IProc}. Constructs a new processor from given procs,
 * which accepts a single input and passes it to each of the given processors,
 * resulting in a tuple output (i.e. the input is processed in parallel (e.g.
 * for multi-band processing), unlike w/ {@link serial}).
 *
 * @remarks
 * In functional programming terms, the equivavelent is `juxt` (see
 * thi.ng/compose)
 *
 * See {@link bounce} for combining results back into a single channel output.
 *
 * @param a
 * @param b
 */
export function multiplex<T, A, B>(
    a: IProc<T, A>,
    b: IProc<T, B>
): Multiplex<T, [A, B]>;
export function multiplex<T, A, B, C>(
    a: IProc<T, A>,
    b: IProc<T, B>,
    c: IProc<T, C>
): Multiplex<T, [A, B, C]>;
export function multiplex<T, A, B, C, D>(
    a: IProc<T, A>,
    b: IProc<T, B>,
    c: IProc<T, C>,
    d: IProc<T, D>
): Multiplex<T, [A, B, C, D]>;
export function multiplex<T>(...procs: IProc<T, any>[]): Multiplex<T, any[]> {
    return new Multiplex(procs);
}

export class Multiplex<A, B extends any[]> extends AProc<A, B> {
    protected _procs: IProc<A, any>[];

    constructor(procs: IProc<A, any>[]) {
        super(<B>procs.map((p) => p.deref()));
        this._procs = procs;
    }

    next(x: A) {
        return (this._val = <B>this._procs.map((p) => p.next(x)));
    }
}
