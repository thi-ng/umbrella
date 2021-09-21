import type { IXform } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import type { IProc, IProc2 } from "../api";

/**
 * Abstract base class for unit gens in this package. Provides
 * {@link @thi.ng/api#IDeref} to obtain the gen's current value and
 * `Iterable` implementations to use gens as ES6 iterables.
 */
export abstract class AProc<A, B> implements IProc<A, B>, IXform<A, B> {
    constructor(protected _val: B) {}

    deref() {
        return this._val;
    }

    abstract next(x: A): B;

    xform() {
        return map((x: A) => this.next(x));
    }
}

export abstract class AProc2<A, B, C> implements IProc2<A, B, C> {
    constructor(protected _val: C) {}

    deref() {
        return this._val;
    }

    abstract next(a: A, b: B): C;
}
