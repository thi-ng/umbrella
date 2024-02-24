import type {
	DeepPath,
	Fn,
	OptPathVal,
	Path,
	Path0,
	Path1,
	Path2,
	Path3,
	Path4,
	Path5,
	Path6,
	Path7,
	Path8,
	Predicate2,
} from "@thi.ng/api";
import { equiv as _equiv } from "@thi.ng/equiv";
import { defGetterUnsafe } from "@thi.ng/paths/getter";
import { toPath } from "@thi.ng/paths/path";
import type { IView, ReadonlyAtom } from "./api.js";
import { nextID } from "./idgen.js";

export function defView<T, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path0,
	tx?: Fn<T, R>,
	lazy?: boolean,
	equiv?: Predicate2<T>
): View<R extends undefined ? T : R>;
export function defView<T, A, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path1<T, A>,
	tx?: Fn<OptPathVal<T, [A]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A]>>
): View<R extends undefined ? OptPathVal<T, [A]> : R>;
export function defView<T, A, B, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path2<T, A, B>,
	tx?: Fn<OptPathVal<T, [A, B]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A, B]>>
): View<R extends undefined ? OptPathVal<T, [A, B]> : R>;
export function defView<T, A, B, C, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path3<T, A, B, C>,
	tx?: Fn<OptPathVal<T, [A, B, C]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A, B, C]>>
): View<R extends undefined ? OptPathVal<T, [A, B, C]> : R>;
export function defView<T, A, B, C, D, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path4<T, A, B, C, D>,
	tx?: Fn<OptPathVal<T, [A, B, C, D]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A, B, C, D]>>
): View<R extends undefined ? OptPathVal<T, [A, B, C, D]> : R>;
export function defView<T, A, B, C, D, E, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path5<T, A, B, C, D, E>,
	tx?: Fn<OptPathVal<T, [A, B, C, D, E]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A, B, C, D, E]>>
): View<R extends undefined ? OptPathVal<T, [A, B, C, D, E]> : R>;
export function defView<T, A, B, C, D, E, F, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path6<T, A, B, C, D, E, F>,
	tx?: Fn<OptPathVal<T, [A, B, C, D, E, F]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A, B, C, D, E, F]>>
): View<R extends undefined ? OptPathVal<T, [A, B, C, D, E, F]> : R>;
export function defView<T, A, B, C, D, E, F, G, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path7<T, A, B, C, D, E, F, G>,
	tx?: Fn<OptPathVal<T, [A, B, C, D, E, F, G]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A, B, C, D, E, F, G]>>
): View<R extends undefined ? OptPathVal<T, [A, B, C, D, E, F, G]> : R>;
export function defView<T, A, B, C, D, E, F, G, H, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: Path8<T, A, B, C, D, E, F, G, H>,
	tx?: Fn<OptPathVal<T, [A, B, C, D, E, F, G, H]>, R>,
	lazy?: boolean,
	equiv?: Predicate2<OptPathVal<T, [A, B, C, D, E, F, G, H]>>
): View<R extends undefined ? OptPathVal<T, [A, B, C, D, E, F, G, H]> : R>;
export function defView<T, A, B, C, D, E, F, G, H, R = undefined>(
	parent: ReadonlyAtom<T>,
	path: DeepPath<T, A, B, C, D, E, F, G, H>,
	tx?: Fn<any, R>,
	lazy?: boolean,
	equiv?: Predicate2<any>
): View<R extends undefined ? any : R>;
export function defView(
	parent: ReadonlyAtom<any>,
	path: Path,
	tx?: Fn<any, any>,
	lazy?: boolean,
	equiv?: Predicate2<any>
) {
	return new View(parent, path, tx, lazy, equiv);
}

export function defViewUnsafe<T = undefined>(
	parent: ReadonlyAtom<any>,
	path: Path,
	tx?: Fn<any, T>,
	lazy?: boolean,
	equiv?: Predicate2<any>
): View<T extends undefined ? any : T> {
	return new View<any>(parent, path, tx, lazy, equiv);
}

/**
 * This class implements readonly access to a deeply nested value with in an
 * Atom/Cursor. An optional transformer function can be supplied at creation
 * time to produce a derived/materialized view of the actual value held in the
 * atom.
 *
 * @remarks
 * Views can be created via {@link defView} or {@link defViewUnsafe} which are
 * given a parent state container. Views can be
 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html).deref}'d
 * like atoms and polled for value changes using {@link IView.changed}. The
 * transformer is only applied once per value change and its result cached until
 * the next change.
 *
 * If the optional `lazy` is true (default), the transformer will only be
 * executed with the first
 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html).deref}
 * after each value change. If `lazy` is false, the transformer function will be
 * executed immediately after a value change occurred and so can be used like a
 * watch which only triggers if there was an actual value change (in contrast to
 * normal watches, which execute with each update, regardless of value change).
 *
 * Related, the actual value change predicate can be customized. If not given,
 * the default
 * [`equiv()`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html) will be
 * used.
 *
 * @example
 * ```ts
 * import { defAtom, defView } from "@thi.ng/atom";
 *
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
	readonly path: Path;

	protected state: T | undefined;
	protected tx: Fn<any, T>;
	protected unprocessed: any;
	protected isDirty: boolean;
	protected isLazy: boolean;

	constructor(
		parent: ReadonlyAtom<any>,
		path: Path,
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
		const lookup = defGetterUnsafe(this.path);
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
	 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html).deref}.
	 */
	changed() {
		return this.isDirty;
	}

	/**
	 * Like
	 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html).deref},
	 * but doesn't update view's cached state and dirty flag if value has
	 * changed.
	 *
	 * @remarks
	 * If there's an unprocessed value change, returns result of this sub's
	 * transformer or else the cached value.
	 *
	 * **Important:** Use this function only if the view has none or or a
	 * stateless transformer. Else might cause undefined/inconsistent behavior
	 * when calling `view` or
	 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html).deref}
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
