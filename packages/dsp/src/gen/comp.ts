import { Fn2, Fn3, Fn4 } from "@thi.ng/api";
import { IGen } from "../api";
import { AGen } from "./agen";

export class Comp1<A, T> extends AGen<T> {
    constructor(protected op: Fn2<A, T, T>, protected a: IGen<A>, init: T) {
        super(init);
    }

    next() {
        return (this.val = this.op(this.a.next(), this.val));
    }
}

export class Comp2<A, B, T> extends AGen<T> {
    constructor(
        protected op: Fn3<A, B, T, T>,
        protected a: IGen<A>,
        protected b: IGen<B>,
        init: T
    ) {
        super(init);
    }

    next() {
        return (this.val = this.op(this.a.next(), this.b.next(), this.val));
    }
}

export class Comp3<A, B, C, T> extends AGen<T> {
    constructor(
        protected op: Fn4<A, B, C, T, T>,
        protected a: IGen<A>,
        protected b: IGen<B>,
        protected c: IGen<C>,
        init: T
    ) {
        super(init);
    }

    next() {
        return (this.val = this.op(
            this.a.next(),
            this.b.next(),
            this.c.next(),
            this.val
        ));
    }
}
