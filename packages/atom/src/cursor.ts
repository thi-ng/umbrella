import type {
	DeepPath,
	IID,
	IRelease,
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
	PathVal,
	Watch,
} from "@thi.ng/api";
import { defGetterUnsafe } from "@thi.ng/paths/getter";
import { defSetterUnsafe } from "@thi.ng/paths/setter";
import type { CursorOpts, IAtom, SwapFn } from "./api.js";
import { Atom } from "./atom.js";
import { nextID } from "./idgen.js";

export function defCursor<T, A>(
	parent: IAtom<T>,
	path: Path1<T, A>,
	opts?: Partial<CursorOpts<PathVal<T, [A]>>>
): Cursor<PathVal<T, [A]>>;
export function defCursor<T, A, B>(
	parent: IAtom<T>,
	path: Path2<T, A, B>,
	opts?: Partial<CursorOpts<PathVal<T, [A, B]>>>
): Cursor<PathVal<T, [A, B]>>;
export function defCursor<T, A, B, C>(
	parent: IAtom<T>,
	path: Path3<T, A, B, C>,
	opts?: Partial<CursorOpts<PathVal<T, [A, B, C]>>>
): Cursor<PathVal<T, [A, B, C]>>;
export function defCursor<T, A, B, C, D>(
	parent: IAtom<T>,
	path: Path4<T, A, B, C, D>,
	opts?: Partial<CursorOpts<PathVal<T, [A, B, C, D]>>>
): Cursor<PathVal<T, [A, B, C, D]>>;
export function defCursor<T, A, B, C, D, E>(
	parent: IAtom<T>,
	path: Path5<T, A, B, C, D, E>,
	opts?: Partial<CursorOpts<PathVal<T, [A, B, C, D, E]>>>
): Cursor<PathVal<T, [A, B, C, D, E]>>;
export function defCursor<T, A, B, C, D, E, F>(
	parent: IAtom<T>,
	path: Path6<T, A, B, C, D, E, F>,
	opts?: Partial<CursorOpts<PathVal<T, [A, B, C, D, E, F]>>>
): Cursor<PathVal<T, [A, B, C, D, E, F]>>;
export function defCursor<T, A, B, C, D, E, F, G>(
	parent: IAtom<T>,
	path: Path7<T, A, B, C, D, E, F, G>,
	opts?: Partial<CursorOpts<PathVal<T, [A, B, C, D, E, F, G]>>>
): Cursor<PathVal<T, [A, B, C, D, E, F, G]>>;
export function defCursor<T, A, B, C, D, E, F, G, H>(
	parent: IAtom<T>,
	path: Path8<T, A, B, C, D, E, F, G, H>,
	opts?: Partial<CursorOpts<PathVal<T, [A, B, C, D, E, F, G, H]>>>
): Cursor<PathVal<T, [A, B, C, D, E, F, G, H]>>;
export function defCursor<T, A, B, C, D, E, F, G, H>(
	parent: IAtom<T>,
	path: DeepPath<T, A, B, C, D, E, F, G, H>,
	opts?: Partial<CursorOpts<any>>
): Cursor<any>;
export function defCursor(
	parent: IAtom<any>,
	path: Path,
	opts?: Partial<CursorOpts<any>>
): Cursor<any> {
	return new Cursor(parent, path, opts);
}

export function defCursorUnsafe<T = any>(
	parent: IAtom<any>,
	path: Path,
	opts?: Partial<CursorOpts<any>>
) {
	return new Cursor<T>(parent, path, opts);
}

/**
 * A cursor provides read/write access to a path location within a nested
 * (Atom-like) parent state.
 *
 * @remarks
 * Cursors behave like Atoms for all practical purposes, i.e. support
 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html).deref},
 * {@link IReset.reset}, {@link ISwap.swap},
 * [`IWatch`](https://docs.thi.ng/umbrella/api/interfaces/IWatch.html).addWatch}
 * etc. However, when updating a cursor's value, the parent state will be
 * updated at the cursor's path as well (incl. triggering any watches and/or
 * validators) attached to the parent. Likewise, when the parent state is
 * modified externally, the cursor's value will automatically update as well.
 * The update order of cursor's sharing a common parent is undefined, but can be
 * overridden by extending this class with a custom
 * [`IWatch`](https://docs.thi.ng/umbrella/api/interfaces/IWatch.html).notifyWatches}
 * implementation.
 *
 * If creating multiple cursors w/ a shared parent and each cursor configured
 * with a custom ID (provided via config object to ctor), it's the user's
 * responsibility to ensure the given IDs are unique. Cursors are implemented by
 * attaching a watch to the parent and the ID is used to identify each watch.
 *
 * When using the optional validator predicate (also specified via config object
 * to ctor), the cursor's validator MUST NOT conflict with the one assigned to
 * the parent or else both will go out-of-sync. Therefore, when requiring
 * validation and updating values via cursors it's recommended to only specify
 * validators for leaf-level cursors in the hierarchy.
 */
export class Cursor<T> implements IAtom<T>, IID<string>, IRelease {
	readonly id: string;
	parent: IAtom<any>;

	protected local: Atom<T>;
	protected selfUpdate: boolean;

	constructor(
		parent: IAtom<any>,
		path: Path,
		opts: Partial<CursorOpts<T>> = {}
	) {
		const validate = opts.validate;
		const lookup = defGetterUnsafe(path);
		const update = defSetterUnsafe(path);
		this.parent = parent;
		this.id = opts.id || `cursor-${nextID()}`;
		this.selfUpdate = false;
		this.local = new Atom<T>(lookup(parent.deref()), validate);
		this.local.addWatch(this.id, (_, prev, curr) => {
			if (prev !== curr) {
				this.selfUpdate = true;
				parent.swap((state) => update(state, curr));
				this.selfUpdate = false;
			}
		});
		parent.addWatch(this.id, (_, prev, curr) => {
			if (!this.selfUpdate) {
				const cval = lookup!(curr);
				if (cval !== lookup!(prev)) {
					this.local.reset(cval);
				}
			}
		});
	}

	get value() {
		return this.deref();
	}

	set value(val: T) {
		this.reset(val);
	}

	deref() {
		return this.local.deref();
	}

	release() {
		this.local.release();
		this.parent.removeWatch(this.id);
		delete (<any>this).local;
		delete (<any>this).parent;
		return true;
	}

	reset(val: T) {
		return this.local.reset(val);
	}

	resetIn(path: Path0, val: T): T;
	resetIn<A>(path: Path1<T, A>, val: PathVal<T, [A]>): T;
	resetIn<A, B>(path: Path2<T, A, B>, val: PathVal<T, [A, B]>): T;
	resetIn<A, B, C>(path: Path3<T, A, B, C>, val: PathVal<T, [A, B, C]>): T;
	resetIn<A, B, C, D>(
		path: Path4<T, A, B, C, D>,
		val: PathVal<T, [A, B, C, D]>
	): T;
	resetIn<A, B, C, D, E>(
		path: Path5<T, A, B, C, D, E>,
		val: PathVal<T, [A, B, C, D, E]>
	): T;
	resetIn<A, B, C, D, E, F>(
		path: Path6<T, A, B, C, D, E, F>,
		val: PathVal<T, [A, B, C, D, E, F]>
	): T;
	resetIn<A, B, C, D, E, F, G>(
		path: Path7<T, A, B, C, D, E, F, G>,
		val: PathVal<T, [A, B, C, D, E, F, G]>
	): T;
	resetIn<A, B, C, D, E, F, G, H>(
		path: Path8<T, A, B, C, D, E, F, G, H>,
		val: PathVal<T, [A, B, C, D, E, F, G, H]>
	): T;
	resetIn<A, B, C, D, E, F, G, H>(
		path: DeepPath<T, A, B, C, D, E, F, G, H>,
		val: any
	): T;
	resetIn(path: Path, val: any) {
		return this.local.resetInUnsafe(path, val);
	}

	resetInUnsafe(path: Path, val: any) {
		return this.local.resetInUnsafe(path, val);
	}

	swap(fn: SwapFn<T, T>, ...args: any[]): T {
		return this.local.swap(fn, ...args);
	}

	swapIn<A>(path: Path0, fn: SwapFn<T, T>, ...args: any[]): T;
	swapIn<A>(
		path: Path1<T, A>,
		fn: SwapFn<OptPathVal<T, [A]>, PathVal<T, [A]>>,
		...args: any[]
	): T;
	swapIn<A, B>(
		path: Path2<T, A, B>,
		fn: SwapFn<OptPathVal<T, [A, B]>, PathVal<T, [A, B]>>,
		...args: any[]
	): T;
	swapIn<A, B, C>(
		path: Path3<T, A, B, C>,
		fn: SwapFn<OptPathVal<T, [A, B, C]>, PathVal<T, [A, B, C]>>,
		...args: any[]
	): T;
	swapIn<A, B, C, D>(
		path: Path4<T, A, B, C, D>,
		fn: SwapFn<OptPathVal<T, [A, B, C, D]>, PathVal<T, [A, B, C, D]>>,
		...args: any[]
	): T;
	swapIn<A, B, C, D, E>(
		path: Path5<T, A, B, C, D, E>,
		fn: SwapFn<OptPathVal<T, [A, B, C, D, E]>, PathVal<T, [A, B, C, D, E]>>,
		...args: any[]
	): T;
	swapIn<A, B, C, D, E, F>(
		path: Path6<T, A, B, C, D, E, F>,
		fn: SwapFn<
			OptPathVal<T, [A, B, C, D, E, F]>,
			PathVal<T, [A, B, C, D, E, F]>
		>,
		...args: any[]
	): T;
	swapIn<A, B, C, D, E, F, G>(
		path: Path7<T, A, B, C, D, E, F, G>,
		fn: SwapFn<
			OptPathVal<T, [A, B, C, D, E, F, G]>,
			PathVal<T, [A, B, C, D, E, F, G]>
		>,
		...args: any[]
	): T;
	swapIn<A, B, C, D, E, F, G, H>(
		path: Path8<T, A, B, C, D, E, F, G, H>,
		fn: SwapFn<
			OptPathVal<T, [A, B, C, D, E, F, G, H]>,
			PathVal<T, [A, B, C, D, E, F, G, H]>
		>,
		...args: any[]
	): T;
	swapIn<A, B, C, D, E, F, G, H>(
		path: DeepPath<T, A, B, C, D, E, F, G, H>,
		fn: SwapFn<any, any>,
		...args: any[]
	): T;
	swapIn(path: Path, fn: SwapFn<any, any>, ...args: any[]) {
		return this.local.swapInUnsafe(path, fn, ...args);
	}

	swapInUnsafe(path: Path, fn: SwapFn<any, any>, ...args: any[]) {
		return this.local.swapInUnsafe(path, fn, ...args);
	}

	addWatch(id: string, fn: Watch<T>) {
		return this.local.addWatch(id, fn);
	}

	removeWatch(id: string): boolean {
		return this.local.removeWatch(id);
	}

	notifyWatches(oldState: T, newState: T) {
		return this.local.notifyWatches(oldState, newState);
	}
}
