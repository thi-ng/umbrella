import type { IProc } from "../api";
import { AProc } from "../proc/aproc";

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
