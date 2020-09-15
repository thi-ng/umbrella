import type { IProc } from "../api";
import { AProc } from "../proc/aproc";

export function compP<A, B, C>(a: IProc<A, B>, b: IProc<B, C>): IProc<A, C>;
export function compP<A, B, C, D>(
    a: IProc<A, B>,
    b: IProc<B, C>,
    c: IProc<C, D>
): IProc<A, D>;
export function compP<A, B, C, D, E>(
    a: IProc<A, B>,
    b: IProc<B, C>,
    c: IProc<C, D>,
    d: IProc<D, E>
): IProc<A, E>;
export function compP<A, B, C, D, E>(
    a: IProc<A, B>,
    b: IProc<B, C>,
    c: IProc<C, D>,
    d: IProc<D, E>,
    ...xs: IProc<any, any>[]
): IProc<A, any>;
export function compP(...procs: IProc<any, any>[]): IProc<any, any> {
    const [a, b, c, d] = procs;
    switch (procs.length) {
        case 2:
            return new CompP2(a, b);
        case 3:
            return new CompP3(a, b, c);
        case 4:
            return new CompP4(a, b, c, d);
        default:
            return new CompP(procs);
    }
}

export class CompP2<A, B, C> extends AProc<A, C> {
    constructor(protected _a: IProc<A, B>, protected _b: IProc<B, C>) {
        super(<any>null);
    }

    next(x: A) {
        return (this._val = this._b.next(this._a.next(x)));
    }
}

export class CompP3<A, B, C, D> extends AProc<A, D> {
    constructor(
        protected _a: IProc<A, B>,
        protected _b: IProc<B, C>,
        protected _c: IProc<C, D>
    ) {
        super(<any>null);
    }

    next(x: A) {
        return (this._val = this._c.next(this._b.next(this._a.next(x))));
    }
}

export class CompP4<A, B, C, D, E> extends AProc<A, E> {
    constructor(
        protected _a: IProc<A, B>,
        protected _b: IProc<B, C>,
        protected _c: IProc<C, D>,
        protected _d: IProc<D, E>
    ) {
        super(<any>null);
    }

    next(x: A) {
        return (this._val = this._d.next(
            this._c.next(this._b.next(this._a.next(x)))
        ));
    }
}

export class CompP extends AProc<any, any> {
    constructor(protected _procs: IProc<any, any>[]) {
        super(<any>null);
    }

    next(x: any) {
        return (this._val = this._procs.reduce((x, p) => p.next(x), x));
    }
}
