import type {
	DeepPath,
	Event,
	INotify,
	Listener,
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
	Predicate2,
	Watch,
} from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { equiv } from "@thi.ng/equiv";
import { defGetterUnsafe } from "@thi.ng/paths/getter";
import { setInUnsafe } from "@thi.ng/paths/set-in";
import { updateInUnsafe } from "@thi.ng/paths/update-in";
import {
	EVENT_RECORD,
	EVENT_REDO,
	EVENT_UNDO,
	type HistoryEventType,
	type IAtom,
	type IHistory,
	type SwapFn,
} from "./api.js";

export const defHistory = <T>(
	state: IAtom<T>,
	maxLen?: number,
	changed?: Predicate2<T>
) => new History(state, maxLen, changed);

/**
 * Undo/redo history stack wrapper for atoms and cursors. Implements
 * {@link IAtom} interface and so can be used directly in place and delegates to
 * wrapped atom/cursor.
 *
 * @remarks
 * Value changes are only recorded in history if `changed` predicate returns
 * truthy value, or else by calling {@link History.record} directly. This class
 * too implements the
 * [`INotify`](https://docs.thi.ng/umbrella/api/interfaces/INotify.html)
 * interface to support event listeners for {@link History.undo},
 * {@link History.redo} and {@link History.record}.
 */
@INotifyMixin
export class History<T> implements IHistory<T>, INotify<HistoryEventType> {
	state: IAtom<T>;
	maxLen: number;
	changed: Predicate2<T>;

	history!: T[];
	future!: T[];

	/**
	 * @param state - parent state
	 * @param maxLen - max size of undo stack
	 * @param changed - predicate to determine changed values (default `!equiv(a,b)`)
	 */
	constructor(state: IAtom<T>, maxLen = 100, changed?: Predicate2<T>) {
		this.state = state;
		this.maxLen = maxLen;
		this.changed = changed || ((a: T, b: T) => !equiv(a, b));
		this.clear();
	}

	get value() {
		return this.deref();
	}

	set value(val: T) {
		this.reset(val);
	}

	canUndo() {
		return this.history.length > 0;
	}

	canRedo() {
		return this.future.length > 0;
	}

	/**
	 * Clears history & future stacks
	 */
	clear() {
		this.history = [];
		this.future = [];
	}

	/**
	 * Attempts to re-apply most recent historical value to atom and
	 * returns it if successful (i.e. there's a history).
	 *
	 * @remarks
	 * Before the switch, first records the atom's current value into
	 * the future stack (to enable {@link History.redo} feature).
	 * Returns `undefined` if there's no history.
	 *
	 * If undo was possible, the `History.EVENT_UNDO` event is emitted
	 * after the restoration with both the `prev` and `curr` (restored)
	 * states provided as event value (and object with these two keys).
	 * This allows for additional state handling to be executed, e.g.
	 * application of the "Command pattern". See
	 * {@link History.addListener} for registering event listeners.
	 */
	undo() {
		if (this.history.length) {
			const prev = this.state.deref();
			this.future.push(prev);
			const curr = this.state.reset(this.history.pop()!);
			this.notify({ id: EVENT_UNDO, value: { prev, curr } });
			return curr;
		}
	}

	/**
	 * Attempts to re-apply most recent value from future stack to atom
	 * and returns it if successful (i.e. there's a future).
	 *
	 * @remarks
	 * Before the switch, first records the atom's current value into
	 * the history stack (to enable {@link History.undo} feature).
	 * Returns `undefined` if there's no future (so sad!).
	 *
	 * If redo was possible, the `History.EVENT_REDO` event is emitted
	 * after the restoration with both the `prev` and `curr` (restored)
	 * states provided as event value (and object with these two keys).
	 * This allows for additional state handling to be executed, e.g.
	 * application of the "Command pattern". See
	 * {@link History.addListener} for registering event listeners.
	 */
	redo() {
		if (this.future.length) {
			const prev = this.state.deref();
			this.history.push(prev);
			const curr = this.state.reset(this.future.pop()!);
			this.notify({ id: EVENT_REDO, value: { prev, curr } });
			return curr;
		}
	}

	/**
	 * `IReset.reset()` implementation. Delegates to wrapped
	 * atom/cursor, but too applies `changed` predicate to determine if
	 * there was a change and if the previous value should be recorded.
	 *
	 * @param val - replacement value
	 */
	reset(val: T) {
		const prev = this.state.deref();
		this.state.reset(val);
		const changed = this.changed(prev, this.state.deref());
		if (changed) {
			this.record(prev);
		}
		return val;
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
		const prev = this.state.deref();
		const get = defGetterUnsafe(path);
		const prevV = get(prev);
		const curr = setInUnsafe(prev, path, val);
		this.state.reset(curr);
		this.changed(prevV, get(curr)) && this.record(prev);
		return curr;
	}

	resetInUnsafe(path: Path, val: any) {
		return this.resetIn(<any>path, val);
	}

	/**
	 * `ISwap.swap()` implementation. Delegates to wrapped atom/cursor,
	 * but too applies `changed` predicate to determine if there was a
	 * change and if the previous value should be recorded.
	 *
	 * @param fn - update function
	 * @param args - additional args passed to `fn`
	 */
	swap(fn: SwapFn<T, T>, ...args: any[]): T {
		return this.reset(fn(this.state.deref(), ...args));
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
		const prev = this.state.deref();
		const get = defGetterUnsafe(path);
		const prevV = get(prev);
		const curr = updateInUnsafe(this.state.deref(), path, fn, ...args);
		this.state.reset(curr);
		this.changed(prevV, get(curr)) && this.record(prev);
		return curr;
	}

	swapInUnsafe(path: Path, fn: SwapFn<any, any>, ...args: any[]) {
		return this.swapIn(<any>path, fn, ...args);
	}

	/**
	 * Records given state in history. This method is only needed when
	 * manually managing snapshots, i.e. when applying multiple swaps on
	 * the wrapped atom directly, but not wanting to create an history
	 * entry for each change.
	 *
	 * @remarks
	 * **DO NOT call this explicitly if using {@link History.reset} /
	 * {@link History.swap} etc.**
	 *
	 * If no `state` is given, uses the wrapped atom's current state
	 * value (user code SHOULD always call without arg).
	 *
	 * If recording succeeded, the `History.EVENT_RECORD` event is
	 * emitted with the recorded state provided as event value.
	 *
	 * @param state - state to record
	 */
	record(state?: T) {
		const history = this.history;
		const n = history.length;
		let ok = true;
		// check for arg given and not if `state == null` we want to
		// allow null/undefined as possible values
		if (!arguments.length) {
			state = this.state.deref();
			ok = !n || this.changed(history[n - 1], state);
		}
		if (ok) {
			if (n >= this.maxLen) {
				history.shift();
			}
			history.push(state!);
			this.notify({ id: EVENT_RECORD, value: state });
			this.future.length = 0;
		}
	}

	/**
	 * Returns wrapped atom's **current** value.
	 */
	deref(): T {
		return this.state.deref();
	}

	/**
	 * `IWatch.addWatch()` implementation. Delegates to wrapped
	 * atom/cursor.
	 *
	 * @param id - watch ID
	 * @param fn - watch function
	 */
	addWatch(id: string, fn: Watch<T>) {
		return this.state.addWatch(id, fn);
	}

	/**
	 * `IWatch.removeWatch()` implementation. Delegates to wrapped
	 * atom/cursor.
	 *
	 * @param id - watch iD
	 */
	removeWatch(id: string) {
		return this.state.removeWatch(id);
	}

	/**
	 * `IWatch.notifyWatches()` implementation. Delegates to wrapped
	 * atom/cursor.
	 *
	 * @param oldState -
	 * @param newState -
	 */
	notifyWatches(oldState: T, newState: T) {
		return this.state.notifyWatches(oldState, newState);
	}

	release() {
		this.state.release();
		delete (<any>this).state;
		return true;
	}

	/** {@inheritDoc @thi.ng/api#INotify.addListener} */
	// @ts-ignore: mixin
	addListener(id: HistoryEventType, fn: Listener, scope?: any): boolean {}

	/** {@inheritDoc @thi.ng/api#INotify.removeListener} */
	// @ts-ignore: mixin
	removeListener(id: HistoryEventType, fn: Listener, scope?: any): boolean {}

	/** {@inheritDoc @thi.ng/api#INotify.notify} */
	// @ts-ignore: mixin
	notify(e: Event<HistoryEventType>): boolean {}
}
