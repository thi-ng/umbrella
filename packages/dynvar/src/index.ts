import type { Fn0, IBind, ICopy, IDeref } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";

/**
 * Hidden storage for bound value stacks
 */
const __private = new WeakMap<DynVar<any>, any>();

/**
 * Returns new {@link DynVar} with given value `x` as its root binding.
 *
 * @param x - initial value
 */
export const dynvar = <T>(x: T) => new DynVar<T>(x);

/**
 * Simple dynamic scope container & implementation.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping
 *
 */
export class DynVar<T> implements IDeref<T>, IBind<T>, ICopy<DynVar<T>> {
    constructor(val: T) {
        __private.set(this, [val]);
    }

    /**
     * Returns current bound value, i.e. that of the currently active
     * dynamic scope.
     */
    deref() {
        const v = __private.get(this);
        return v[v.length - 1];
    }

    /**
     * Same as {@link DynVar.deref}, but also for `DynVar` to satisfy
     * `Object.valueOf()` contract.
     *
     */
    valueOf() {
        return this.deref();
    }

    /**
     * Returns new `DynVar` with this var's current value as its root
     * binding.
     */
    copy() {
        return new DynVar<T>(this.deref());
    }

    /**
     * Starts new dynamic scope in which given `val` will be bound to
     * this variable. In most cases, calls to `bind()` should always be
     * eventually followed by calls to {@link DynVar.unbind} to restore
     * this var's previously scoped value.
     *
     * @param val - 
     */
    bind(val: T) {
        __private.get(this).push(val);
        return true;
    }

    /**
     * Attempts to end the current scope by restoring this var's bound
     * value to that of parent scope. An error is thrown if attempting
     * to remove the root binding.
     */
    unbind() {
        const v = __private.get(this);
        assert(v.length > 1, `can't unbind root value`);
        v.pop();
        return true;
    }

    /**
     * Replaces current scope's value with new `val`.
     *
     * @param val - 
     */
    set(val: T) {
        const v = __private.get(this);
        v[v.length - 1] = val;
    }

    /**
     * Executes given `body` function in a new scope which has given
     * `val` bound to this variable. The new scope is automatically
     * removed when the function returns or an error occurred.
     *
     * @param val - 
     * @param body - 
     */
    withBinding<R>(val: T, body: Fn0<R>) {
        this.bind(val);
        try {
            return body();
        } finally {
            this.unbind();
        }
    }
}
