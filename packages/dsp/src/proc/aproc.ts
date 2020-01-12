import { IProc } from "../api";

/**
 * Abstract base class for unit gens in this package. Provides
 * {@link @thi.ng/api#IDeref} to obtain the gen's current value and
 * `Iterable` implementations to use gens as ES6 iterables.
 */
export abstract class AProc<A, B> implements IProc<A, B> {
    constructor(protected _val: B) {}

    deref() {
        return this._val;
    }

    abstract next(x: A): B;
}
