import {
    Fn2,
    Fn3,
    Fn4,
    Fn5,
    FnAny
} from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors";
import { IGen } from "../api";
import { AGen } from "../gen/agen";

export function compG<A, T>(op: Fn2<A, T, T>, a: IGen<A>, init: T): IGen<T>;
export function compG<A, B, T>(
    op: Fn3<A, B, T, T>,
    a: IGen<A>,
    b: IGen<B>,
    init: T
): IGen<T>;
export function compG<A, B, C, T>(
    op: Fn4<A, B, C, T, T>,
    a: IGen<A>,
    b: IGen<B>,
    c: IGen<C>,
    init: T
): IGen<T>;
export function compG<A, B, C, D, T>(
    op: Fn5<A, B, C, D, T, T>,
    a: IGen<A>,
    b: IGen<B>,
    c: IGen<C>,
    d: IGen<D>,
    init: T
): IGen<T>;
export function compG(op: FnAny<any>, ...args: any[]): IGen<any> {
    switch (args.length) {
        case 2:
            return new CompG1(op, args[0], args[1]);
        case 3:
            return new CompG2(op, args[0], args[1], args[2]);
        case 4:
            return new CompG3(op, args[0], args[1], args[2], args[3]);
        case 5:
            return new CompG4(op, args[0], args[1], args[2], args[3], args[4]);
        default:
            illegalArity(args.length);
    }
}

export class CompG1<A, T> extends AGen<T> {
    constructor(protected _op: Fn2<A, T, T>, protected _a: IGen<A>, init: T) {
        super(init);
    }

    next() {
        return (this._val = this._op(this._a.next(), this._val));
    }
}

export class CompG2<A, B, T> extends AGen<T> {
    constructor(
        protected _op: Fn3<A, B, T, T>,
        protected _a: IGen<A>,
        protected _b: IGen<B>,
        init: T
    ) {
        super(init);
    }

    next() {
        return (this._val = this._op(
            this._a.next(),
            this._b.next(),
            this._val
        ));
    }
}

export class CompG3<A, B, C, T> extends AGen<T> {
    constructor(
        protected _op: Fn4<A, B, C, T, T>,
        protected _a: IGen<A>,
        protected _b: IGen<B>,
        protected _c: IGen<C>,
        init: T
    ) {
        super(init);
    }

    next() {
        return (this._val = this._op(
            this._a.next(),
            this._b.next(),
            this._c.next(),
            this._val
        ));
    }
}

export class CompG4<A, B, C, D, T> extends AGen<T> {
    constructor(
        protected _op: Fn5<A, B, C, D, T, T>,
        protected _a: IGen<A>,
        protected _b: IGen<B>,
        protected _c: IGen<C>,
        protected _d: IGen<D>,
        init: T
    ) {
        super(init);
    }

    next() {
        return (this._val = this._op(
            this._a.next(),
            this._b.next(),
            this._c.next(),
            this._d.next(),
            this._val
        ));
    }
}
