import { Fn2, Fn3, Fn4 } from "@thi.ng/api";
import { IGen } from "../api";
import { AGen } from "./agen";

export class Comp1<A, T> extends AGen<T> {
    constructor(protected _op: Fn2<A, T, T>, protected _a: IGen<A>, init: T) {
        super(init);
    }

    next() {
        return (this._val = this._op(this._a.next(), this._val));
    }
}

export class Comp2<A, B, T> extends AGen<T> {
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

export class Comp3<A, B, C, T> extends AGen<T> {
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
