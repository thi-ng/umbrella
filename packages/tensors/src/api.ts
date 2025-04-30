// SPDX-License-Identifier: Apache-2.0
import type {
	Type as $Type,
	Fn2,
	Fn3,
	Fn4,
	ICopy,
	IEqualsDelta,
	IEquiv,
	ILength,
	Maybe,
	NumericArray,
} from "@thi.ng/api";
import type { Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";

export interface TensorData<T = number> extends Iterable<T>, ILength {
	[id: number]: T;
	fill(x: T, start?: number, end?: number): TensorData<T>;
}

export type Type = $Type | "num" | "str";

export type NumType = Type | "num";

export type Shape1 = [number];
export type Shape2 = [number, number];
export type Shape3 = [number, number, number];
export type Shape4 = [number, number, number, number];

export type Shape = Shape1 | Shape2 | Shape3 | Shape4;

export type ShapeTensor<S extends Shape, T> = S extends Shape4
	? Tensor4<T>
	: S extends Shape3
	? Tensor3<T>
	: S extends Shape2
	? Tensor2<T>
	: Tensor1<T>;

export type Nested<T> = T[] | T[][] | T[][][] | T[][][][];

export type NestedTensor<N extends Nested<T>, T> = N extends T[][][][]
	? Tensor4<T>
	: N extends T[][][]
	? Tensor3<T>
	: N extends T[][]
	? Tensor2<T>
	: Tensor1<T>;

export interface TypeMap {
	u8: number;
	u8c: number;
	i8: number;
	u16: number;
	i16: number;
	u32: number;
	i32: number;
	f32: number;
	f64: number;
	num: number;
	str: string;
}

export interface TensorOpts<T, S extends Shape> {
	/**
	 * Tensor data. Unless {@link TensorOpts.copy} is false, by default will be
	 * copied to memory obtained from configured storage.
	 */
	data?: TensorData<T>;
	/**
	 * Optionally configured storage provider. By default uses the
	 * datatype-specific implementation from global {@link STORAGE} registry.
	 */
	storage?: ITensorStorage<T>;
	/**
	 * Optionally configured stride tuple. By default the strides will be
	 * obtained from the tensor shape and will be in row-major order.
	 */
	stride?: S;
	/**
	 * Optional start index of the data values (only inteded to be used if
	 * {@link TensorOpts.data} is given).
	 */
	offset?: number;
	/**
	 * Only used if {@link TensorOpts.data} is given. If true (default), the
	 * data will be copied to memory obtained from configured storage.
	 */
	copy?: boolean;
}

export interface TensorFromArrayOpts<T extends Type, V> {
	type: T;
	storage?: ITensorStorage<V>;
}

export interface ITensor<T = number>
	extends ICopy<ITensor<T>>,
		IEquiv,
		IEqualsDelta<ITensor<T>> {
	readonly type: Type;
	readonly storage: ITensorStorage<T>;
	readonly data: TensorData<T>;
	readonly shape: number[];
	readonly stride: number[];
	readonly offset: number;
	readonly length: number;
	readonly dim: number;
	readonly order: number[];

	orderedShape: number[];
	orderedStride: number[];

	[Symbol.iterator](): IterableIterator<T>;

	empty(storage?: ITensorStorage<T>): this;

	index(pos: NumericArray): number;

	get(pos: NumericArray): T;

	set(pos: NumericArray, value: T): this;

	lo(pos: NumericArray): this;

	hi(pos: NumericArray): this;

	step(select: NumericArray): this;

	pick(select: NumericArray): ITensor<T>;

	pack(storage?: ITensorStorage<T>): this;

	reshape<S extends Shape>(newShape: S, newStride?: S): ShapeTensor<S, T>;

	resize<S extends Shape>(
		newShape: S,
		fill?: T,
		storage?: ITensorStorage<T>
	): ShapeTensor<S, T>;

	transpose(order: NumericArray): this;

	toJSON(): any;
}

export interface TensorCtor<T = number> {
	new (
		type: Type,
		storage: ITensorStorage<T>,
		data: TensorData<T>,
		shape: number[],
		stride: number[],
		offset?: number
	): ITensor<T>;
}

export interface ITensorStorage<T> {
	alloc(size: number): TensorData<T>;
	from(iter: Iterable<T>): TensorData<T>;
	release(buf: TensorData<T>): boolean;
}

export type StorageRegistry = Record<Type, ITensorStorage<any>>;

export type TensorOpN<
	A = number,
	B = A,
	TB extends ITensor<B> = ITensor<B>
> = Fn2<TB, A, TB>;

export type TensorOpT<
	A = number,
	B = A,
	TA extends ITensor<A> = ITensor<A>,
	TB extends ITensor<B> = ITensor<B>
> = Fn2<TB | null, TA, TB>;

export type TensorOpTN<
	A = number,
	B = A,
	TA extends ITensor<A> = ITensor<A>,
	TB extends ITensor<B> = ITensor<B>
> = Fn3<TB | null, TA, A, TB>;

export type TensorOpTNN<
	A = number,
	B = A,
	TA extends ITensor<A> = ITensor<A>,
	TB extends ITensor<B> = ITensor<B>
> = Fn4<TB | null, TA, A, A, TB>;

export type TensorOpTT<
	A = number,
	B = A,
	TA extends ITensor<A> = ITensor<A>,
	TB extends ITensor<B> = ITensor<B>
> = Fn3<TB | null, TA, TA, TB>;

export type TensorOpTTT<
	A = number,
	B = A,
	TA extends ITensor<A> = ITensor<A>,
	TB extends ITensor<B> = ITensor<B>
> = Fn4<TB | null, TA, TA, TA, TB>;

export type TensorOpRT<A, B, TA extends ITensor<A> = ITensor<A>> = (a: TA) => B;

export type TensorOpRTT<A, B, TA extends ITensor<A> = ITensor<A>> = (
	a: TA,
	b: TA
) => B;

export interface MultiTensorOp<TOP> {
	/**
	 * Adds / overwrites implementation for given tensor dimension.
	 *
	 * @param dim -
	 * @param op -
	 */
	add(dim: number, op: TOP): TOP;
	/**
	 * Adds / overwrites default implementation (SHOULD support arbitrary tensor
	 * dimensions).
	 *
	 * @param op -
	 */
	default(op: TOP): TOP;
	/**
	 * Returns implementation for given tensor dimension or default
	 * implementation.
	 *
	 * @param dim -
	 */
	impl(dim?: number): Maybe<TOP>;
}

export type MultiTensorOpImpl<T> = T & MultiTensorOp<T>;

export type MultiTensorOpN<A = number, B = A> = MultiTensorOpImpl<
	TensorOpN<A, B>
>;

export type MultiTensorOpT<A = number, B = A> = MultiTensorOpImpl<
	TensorOpT<A, B>
>;

export type MultiTensorOpTN<A = number, B = A> = MultiTensorOpImpl<
	TensorOpTN<A, B>
>;

export type MultiTensorOpTNN<A = number, B = A> = MultiTensorOpImpl<
	TensorOpTNN<A, B>
>;

export type MultiTensorOpTT<A = number, B = A> = MultiTensorOpImpl<
	TensorOpTT<A, B>
>;

export type MultiTensorOpTTT<A = number, B = A> = MultiTensorOpImpl<
	TensorOpTTT<A, B>
>;

export type MultiTensorOpRT<A = number, B = A> = MultiTensorOpImpl<
	TensorOpRT<A, B>
>;

export type MultiTensorOpRTT<A = number, B = A> = MultiTensorOpImpl<
	TensorOpRTT<A, B>
>;
