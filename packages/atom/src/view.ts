import { equiv as _equiv } from "@thi.ng/equiv";
import { getter, toPath } from "@thi.ng/paths";
import { nextID } from "./idgen";
import type {
    Fn,
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    Predicate2,
    Val1,
    Val2,
    Val3,
    Val4,
    Val5,
    Val6,
    Val7,
    Val8,
} from "@thi.ng/api";
import type { AtomPath, IView, ReadonlyAtom } from "./api";

export function defView<T, R>(
    parent: ReadonlyAtom<T>,
    path: readonly [],
    tx?: Fn<T, R>,
    lazy?: boolean,
    equiv?: Predicate2<T>
): View<R extends undefined ? T : R>;
export function defView<T, A extends Keys<T>, R>(
    parent: ReadonlyAtom<T>,
    path: readonly [A],
    tx?: Fn<Val1<T, A>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val1<T, A>>
): View<R extends undefined ? Val1<T, A> : R>;
export function defView<T, A extends Keys<T>, B extends Keys1<T, A>, R>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B],
    tx?: Fn<Val2<T, A, B>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val2<T, A, B>>
): View<R extends undefined ? Val2<T, A, B> : R>;
export function defView<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    R
>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B, C],
    tx?: Fn<Val3<T, A, B, C>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val3<T, A, B, C>>
): View<R extends undefined ? Val3<T, A, B, C> : R>;
export function defView<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    R
>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B, C, D],
    tx?: Fn<Val4<T, A, B, C, D>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val4<T, A, B, C, D>>
): View<R extends undefined ? Val4<T, A, B, C, D> : R>;
export function defView<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    R
>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B, C, D, E],
    tx?: Fn<Val5<T, A, B, C, D, E>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val5<T, A, B, C, D, E>>
): View<R extends undefined ? Val5<T, A, B, C, D, E> : R>;
export function defView<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    R
>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B, C, D, E, F],
    tx?: Fn<Val6<T, A, B, C, D, E, F>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val6<T, A, B, C, D, E, F>>
): View<R extends undefined ? Val6<T, A, B, C, D, E, F> : R>;
export function defView<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    R
>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B, C, D, E, F, G],
    tx?: Fn<Val7<T, A, B, C, D, E, F, G>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val7<T, A, B, C, D, E, F, G>>
): View<R extends undefined ? Val7<T, A, B, C, D, E, F, G> : R>;
export function defView<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>,
    R
>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B, C, D, E, F, G, H],
    tx?: Fn<Val8<T, A, B, C, D, E, F, G, H>, R>,
    lazy?: boolean,
    equiv?: Predicate2<Val8<T, A, B, C, D, E, F, G, H>>
): View<R extends undefined ? Val8<T, A, B, C, D, E, F, G, H> : R>;
export function defView<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>,
    R
>(
    parent: ReadonlyAtom<T>,
    path: readonly [A, B, C, D, E, F, G, H, ...PropertyKey[]],
    tx?: Fn<any, R>,
    lazy?: boolean,
    equiv?: Predicate2<any>
): View<R extends undefined ? any : R>;
export function defView(
    parent: ReadonlyAtom<any>,
    path: AtomPath,
    tx?: Fn<any, any>,
    lazy?: boolean,
    equiv?: Predicate2<any>
) {
    return new View(parent, path, tx, lazy, equiv);
}

export function defViewUnsafe(
    parent: ReadonlyAtom<any>,
    path: string | AtomPath,
    tx?: Fn<any, any>,
    lazy?: boolean,
    equiv?: Predicate2<any>
) {
    return new View<any>(parent, path, tx, lazy, equiv);
}

/**
 * This class implements readonly access to a deeply nested value with
 * in an Atom/Cursor. An optional transformer function can be supplied
 * at creation time to produce a derived/materialized view of the actual
 * value held in the atom.
 *
 * @remarks
 * Views can be created directly or via the {@link IViewable.addView}
 * method of the parent state. Views can be
 * {@link @thi.ng/api#IDeref.deref}'d like atoms and polled for value
 * changes using {@link IView.changed}. The transformer is only applied
 * once per value change and its result cached until the next change.
 *
 * If the optional `lazy` is true (default), the transformer will only
 * be executed with the first {@link @thi.ng/api#IDeref.deref} after
 * each value change. If `lazy` is false, the transformer function will
 * be executed immediately after a value change occurred and so can be
 * used like a watch which only triggers if there was an actual value
 * change (in contrast to normal watches, which execute with each
 * update, regardless of value change).
 *
 * Related, the actual value change predicate can be customized. If not
 * given, the default {@link @thi.ng/equiv#equiv} will be used.
 *
 * @example
 * ```ts
 * a = defAtom({ a: { b: 1 } });
 * v = defView(a, ["a", "b"], (x) => x * 10);
 *
 * v.deref()
 * // 10
 *
 * // update atom state
 * a.resetIn(["a", "b"], 2);
 * // { a: { b: 2 } }
 *
 * v.changed()
 * // true
 * v.deref()
 * // 20
 *
 * // remove view from parent state
 * v.release()
 * ```
 */
export class View<T> implements IView<T> {
    readonly id: string;

    readonly parent: ReadonlyAtom<any>;
    readonly path: AtomPath;

    protected state: T | undefined;
    protected tx: Fn<any, T>;
    protected unprocessed: any;
    protected isDirty: boolean;
    protected isLazy: boolean;

    constructor(
        parent: ReadonlyAtom<any>,
        path: string | AtomPath,
        tx?: Fn<any, T>,
        lazy = true,
        equiv = _equiv
    ) {
        this.parent = parent;
        this.id = `view-${nextID()}`;
        this.tx = tx || ((x: any) => x);
        this.path = toPath(path);
        this.isDirty = true;
        this.isLazy = lazy;
        const lookup = getter(this.path);
        const state = this.parent.deref();
        this.unprocessed = state ? lookup(state) : undefined;
        if (!lazy) {
            this.state = this.tx(this.unprocessed);
            this.unprocessed = undefined;
        }
        parent.addWatch(this.id, (_, prev, curr) => {
            const pval: T = prev ? lookup(prev) : prev;
            const val: T = curr ? lookup(curr) : curr;
            if (!equiv(val, pval)) {
                if (lazy) {
                    this.unprocessed = val;
                } else {
                    this.state = this.tx(val);
                }
                this.isDirty = true;
            }
        });
    }

    get value() {
        return this.deref();
    }

    /**
     * Returns view's value. If the view has a transformer, the
     * transformed value is returned. The transformer is only run once
     * per value change.
     *
     * @remarks
     * See class comments about difference between lazy/eager behaviors.
     */
    deref() {
        if (this.isDirty) {
            if (this.isLazy) {
                this.state = this.tx(this.unprocessed);
                this.unprocessed = undefined;
            }
            this.isDirty = false;
        }
        return this.state;
    }

    /**
     * Returns true, if the view's value has changed since last
     * {@link @thi.ng/api#IDeref.deref}.
     */
    changed() {
        return this.isDirty;
    }

    /**
     * Like {@link @thi.ng/api#IDeref.deref}, but doesn't update view's
     * cached state and dirty flag if value has changed.
     *
     * @remarks
     * If there's an unprocessed value change, returns result of this
     * sub's transformer or else the cached value.
     *
     * **Important:** Use this function only if the view has none or or
     * a stateless transformer. Else might cause undefined/inconsistent
     * behavior when calling `view` or {@link @thi.ng/api#IDeref.deref}
     * subsequently.
     */
    view() {
        return this.isDirty && this.isLazy
            ? this.tx(this.unprocessed)
            : this.state;
    }

    /**
     * Disconnects this view from parent state, marks itself
     * dirty/changed and sets its unprocessed raw value to `undefined`.
     */
    release() {
        this.unprocessed = undefined;
        if (!this.isLazy) {
            this.state = this.tx(undefined);
        }
        this.isDirty = true;
        return this.parent.removeWatch(this.id);
    }
}
