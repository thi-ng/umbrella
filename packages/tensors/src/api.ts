import type {
	Type as $Type,
	Fn2,
	Fn3,
	ICopy,
	IEqualsDelta,
	IEquiv,
	ILength,
	Maybe,
	NumericArray,
} from "@thi.ng/api";

export interface TensorData<T = number> extends Iterable<T>, ILength {
	[id: number]: T;
	fill(x: T, start?: number, end?: number): TensorData<T>;
}

export type Type = $Type | "num" | "str";

export interface TensorOpts<T> {
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
	stride?: ITensor["stride"];
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

	empty(storage?: ITensorStorage<T>): ITensor<T>;

	index(pos: NumericArray): number;

	get(pos: NumericArray): T;

	set(pos: NumericArray, value: T): this;

	lo(pos: NumericArray): ITensor<T>;

	hi(pos: NumericArray): ITensor<T>;

	step(pos: NumericArray): ITensor<T>;

	pick(pos: NumericArray): ITensor<T>;

	pack(storage?: ITensorStorage<T>): ITensor<T>;

	reshape(newShape: number[], newStride?: number[]): ITensor<T>;

	resize(
		newShape: number[],
		fill?: T,
		storage?: ITensorStorage<T>
	): ITensor<T>;

	transpose(pos: NumericArray): ITensor<T>;

	toJSON(): any;
}

export interface ITensorStorage<T> {
	alloc(size: number): TensorData<T>;
	from(iter: Iterable<T>): TensorData<T>;
	release(buf: TensorData<T>): boolean;
}

export type StorageRegistry = Record<Type, ITensorStorage<any>>;

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

export type TensorOpTT<
	A = number,
	B = A,
	TA extends ITensor<A> = ITensor<A>,
	TB extends ITensor<B> = ITensor<B>
> = Fn3<TB | null, TA, TA, TB>;

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

export type MultiTensorOpT<A = number, B = A> = MultiTensorOpImpl<
	TensorOpT<A, B>
>;

export type MultiTensorOpTN<A = number, B = A> = MultiTensorOpImpl<
	TensorOpTN<A, B>
>;

export type MultiTensorOpTT<A = number, B = A> = MultiTensorOpImpl<
	TensorOpTT<A, B>
>;
