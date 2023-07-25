import type {
	EVENT_ALL,
	FnO,
	IClear,
	IDeref,
	IID,
	IRelease,
	IWatch,
	OptPathVal,
	Path,
	Path0,
	Path1,
	Path2,
	Path3,
	Path4,
	Path5,
	Path6,
	PathVal,
	Predicate,
} from "@thi.ng/api";

export type SwapFn<A, B = A> = FnO<A, B>;

export interface ReadonlyAtom<T> extends IDeref<T>, IRelease, IWatch<T> {}

export interface IAtom<T> extends ReadonlyAtom<T>, IReset<T>, ISwap<T> {}

export interface IReset<T> {
	reset(val: T): T;

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
	// resetIn<A, B, C, D, E, F, G>(
	//     path: Path7<T, A, B, C, D, E, F, G>,
	//     val: PathVal<T, [A, B, C, D, E, F, G]>
	// ): T;
	// resetIn<A, B, C, D, E, F, G, H>(
	//     path: Path8<T, A, B, C, D, E, F, G, H>,
	//     val: PathVal<T, [A, B, C, D, E, F, G, H]>
	// ): T;
	// resetIn<A, B, C, D, E, F, G, H>(
	//     path: DeepPath<T, A, B, C, D, E, F, G, H>,
	//     val: any
	// ): T;

	resetInUnsafe(path: Path, val: any): T;
}

export interface ISwap<T> {
	swap(fn: SwapFn<T, T>, ...args: any[]): T;

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
	// swapIn<A, B, C, D, E, F, G>(
	//     path: Path7<T, A, B, C, D, E, F, G>,
	//     fn: SwapFn<
	//         OptPathVal<T, [A, B, C, D, E, F, G]>,
	//         PathVal<T, [A, B, C, D, E, F, G]>
	//     >,
	//     ...args: any[]
	// ): T;
	// swapIn<A, B, C, D, E, F, G, H>(
	//     path: Path8<T, A, B, C, D, E, F, G, H>,
	//     fn: SwapFn<
	//         OptPathVal<T, [A, B, C, D, E, F, G, H]>,
	//         PathVal<T, [A, B, C, D, E, F, G, H]>
	//     >,
	//     ...args: any[]
	// ): T;
	// swapIn<A, B, C, D, E, F, G, H>(
	//     path: DeepPath<T, A, B, C, D, E, F, G, H>,
	//     fn: SwapFn<any, any>,
	//     ...args: any[]
	// ): T;

	swapInUnsafe(path: Path, fn: SwapFn<any, any>, ...args: any[]): T;
}

export interface IView<T> extends IDeref<T | undefined>, IID<string>, IRelease {
	readonly path: Path;
	readonly value: T | undefined;

	view(): T | undefined;
	changed(): boolean;
}

export interface CursorOpts<T> {
	validate: Predicate<T>;
	id: string;
}

export interface IHistory<T> extends IAtom<T>, IClear {
	canUndo(): boolean;
	canRedo(): boolean;

	undo(): T | undefined;
	redo(): T | undefined;

	record(): void;
}

export const EVENT_UNDO = "undo";
export const EVENT_REDO = "redo";
export const EVENT_RECORD = "record";

export type HistoryEventType =
	| typeof EVENT_RECORD
	| typeof EVENT_UNDO
	| typeof EVENT_REDO
	| typeof EVENT_ALL;
