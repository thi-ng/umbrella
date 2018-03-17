import { equiv as _equiv } from "@thi.ng/api/equiv";
import { Path, getter, toPath } from "@thi.ng/paths";

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

    constructor(parent: ReadonlyAtom<any>, path: Path, tx?: ViewTransform<T>, equiv = _equiv) {
        this.parent = parent;
        this.id = `view-${View.NEXT_ID++}`;
        this.tx = tx || ((x: any) => x);
        this.path = toPath(path);
        this.isDirty = true;
        const lookup = getter(this.path);
        const state = this.parent.deref();
        this.unprocessed = state ? lookup(state) : undefined;
        parent.addWatch(this.id, (_, prev, curr) => {
            const pval: T = prev ? lookup(prev) : prev;
            const val: T = curr ? lookup(curr) : curr;
            if (!equiv(val, pval)) {
                this.unprocessed = val;
                this.isDirty = true;
            }
        });
    }

    deref() {
        if (this.isDirty) {
            this.state = this.tx(this.unprocessed);
            this.unprocessed = undefined;
            this.isDirty = false;
        }
        return this.state;
    }

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
        return this.isDirty ? this.tx(this.unprocessed) : this.state;
    }

    release() {
        this.unprocessed = undefined;
        this.isDirty = true;
        return this.parent.removeWatch(this.id);
    }
}
