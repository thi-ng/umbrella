import { equiv as _equiv } from "@thi.ng/api/equiv";
import { getter, Path, toPath } from "@thi.ng/paths";

import { IView, ReadonlyAtom, ViewTransform } from "./api";

/**
 * This class implements readonly access to a deeply nested value with
 * in an Atom/Cursor. An optional transformer function can be supplied
 * at creation time to produce a derived/materialized view of the actual
 * value held in the atom. Views can be created directly or via the
 * `.addView()` method of the parent state. Views can be `deref()`'d
 * like atoms and polled for value changes using `changed()`. The
 * transformer is only applied once per value change and its result
 * cached until the next change.
 *
 * If the optional `lazy` is true (default), the transformer will only
 * be executed with the first `deref()` after each value change. If
 * `lazy` is false, the transformer function will be executed
 * immediately after a value change occurred and so can be used like a
 * watch which only triggers if there was an actual value change (in
 * contrast to normal watches, which execute with each update,
 * regardless of value change).
 *
 * Related, the actual value change predicate can be customized. If not
 * given, the default `@thi.ng/api/equiv` will be used.
 *
 * ```
 * a = new Atom({a: {b: 1}});
 * v = a.addView("a.b", (x) => x * 10);
 *
 * v.deref()
 * // 10
 *
 * // update atom state
 * a.swap((state) => setIn(state, "a.b", 2));
 * // {a: {b: 2}}
 *
 * v.changed()
 * // true
 * v.deref()
 * // 20
 *
 * v.release()
 * // remove view from parent state
 * ```
 */
export class View<T> implements
    IView<T> {

    protected static NEXT_ID = 0;

    readonly id: string;

    readonly parent: ReadonlyAtom<any>;
    readonly path: PropertyKey[];

    protected state: T;
    protected tx: ViewTransform<T>;
    protected unprocessed: any;
    protected isDirty: boolean;
    protected isLazy: boolean;

    constructor(parent: ReadonlyAtom<any>, path: Path, tx?: ViewTransform<T>, lazy = true, equiv = _equiv) {
        this.parent = parent;
        this.id = `view-${View.NEXT_ID++}`;
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

    /**
     * Returns view's value. If the view has a transformer, the
     * transformed value is returned. The transformer is only run once
     * per value change. See class comments about difference between
     * lazy/eager behaviors.
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
     * `deref()`.
     */
    changed() {
        return this.isDirty;
    }

    /**
     * Like `deref()`, but doesn't update view's cached state and dirty
     * flag if value has changed. If there's an unprocessed value
     * change, returns result of this sub's transformer or else the
     * cached value.
     *
     * **Important:** Use this function only if the view has none or or
     * a stateless transformer. Else might cause undefined/inconsistent
     * behavior when calling `view()` or `deref()` subsequently.
     */
    view() {
        return this.isDirty && this.isLazy ? this.tx(this.unprocessed) : this.state;
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
