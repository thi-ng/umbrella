import type { Fn2, Fn3, Fn4, Fn5, FnAny } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import { AGen } from "./agen.js";
import type { IGen } from "./api.js";

export function mapG<A, T>(op: Fn2<A, T, T>, a: IGen<A>, init: T): IGen<T>;
export function mapG<A, B, T>(
    op: Fn3<A, B, T, T>,
    a: IGen<A>,
    b: IGen<B>,
    init: T
): IGen<T>;
export function mapG<A, B, C, T>(
    op: Fn4<A, B, C, T, T>,
    a: IGen<A>,
    b: IGen<B>,
    c: IGen<C>,
    init: T
): IGen<T>;
export function mapG<A, B, C, D, T>(
    op: Fn5<A, B, C, D, T, T>,
    a: IGen<A>,
    b: IGen<B>,
    c: IGen<C>,
    d: IGen<D>,
    init: T
): IGen<T>;
export function mapG(op: FnAny<any>, ...args: any[]): IGen<any> {
    switch (args.length) {
        case 2:
            return new MapG1(op, args[0], args[1]);
        case 3:
            return new MapG2(op, args[0], args[1], args[2]);
        case 4:
            return new MapG3(op, args[0], args[1], args[2], args[3]);
        case 5:
            return new MapG4(op, args[0], args[1], args[2], args[3], args[4]);
        default:
            illegalArity(args.length);
    }
}

export class MapG1<A, T> extends AGen<T> {
    constructor(protected _op: Fn2<A, T, T>, protected _a: IGen<A>, init: T) {
        super(init);
    }

    next() {
        return (this._val = this._op(this._a.next(), this._val));
    }
}

export class MapG2<A, B, T> extends AGen<T> {
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

export class MapG3<A, B, C, T> extends AGen<T> {
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

export class MapG4<A, B, C, D, T> extends AGen<T> {
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
