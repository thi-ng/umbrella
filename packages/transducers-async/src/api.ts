import type { Fn, Fn0 } from "@thi.ng/api";
import type { Reduced } from "@thi.ng/transducers";

/**
 * Reducer function tuple, reducing item of type `A` to `Promise<B>`.
 */
export type AsyncReducer<A, B> = [
	AsyncReducerInit<B>,
	AsyncReducerComplete<B>,
	AsyncReduction<A, B>
];

export type AsyncReducerInit<T> = Fn0<Promise<T>>;

export type AsyncReducerComplete<T> = Fn<T, Promise<T>>;

export type AsyncReduction<A, B> = (acc: B, x: A) => Promise<B | Reduced<B>>;

export type AsyncTransducer<A, B> = (
	rfn: AsyncReducer<B, any>
) => AsyncReducer<A, any>;

/**
 * A transducer or a custom type with a {@link IXform} implementation.
 */
export type AsyncTxLike<A, B> = AsyncTransducer<A, B> | IXformAsync<A, B>;

export type AsyncMultiplexTxLike<A, B> =
	| AsyncTxLike<A, B>
	| [AsyncTxLike<A, B>, boolean];

export interface IXformAsync<A, B> {
	xformAsync(): AsyncTransducer<A, B>;
}
