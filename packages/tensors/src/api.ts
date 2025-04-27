import type {
	Type as $Type,
	ICopy,
	IEqualsDelta,
	IEquiv,
	ILength,
	NumericArray,
} from "@thi.ng/api";

export interface TensorData<T = number> extends Iterable<T>, ILength {
	[id: number]: T;
}

export type Type = $Type | "num" | "str";

export interface ITensor<T = number>
	extends ICopy<ITensor<T>>,
		IEquiv,
		IEqualsDelta<ITensor<T>>,
		Iterable<T> {
	readonly data: TensorData<T>;
	readonly shape: number[];
	readonly stride: number[];
	readonly offset: number;

	readonly storage: ITensorStorage<T>;

	readonly length: number;

	readonly type: Type;

	empty(storage?: ITensorStorage<T>): ITensor<T>;

	index(pos: NumericArray): number;

	get(pos: NumericArray): T;

	set(pos: NumericArray, value: T): this;

	lo(pos: NumericArray): ITensor<T>;

	hi(pos: NumericArray): ITensor<T>;

	step(pos: NumericArray): ITensor<T>;

	pick(pos: NumericArray): ITensor<T>;

	pack(storage?: ITensorStorage<T>): ITensor<T>;

	resize(
		newShape: number[],
		fill?: T,
		storage?: ITensorStorage<T>
	): ITensor<T>;

	transpose(pos: NumericArray): ITensor<T>;
}

export interface ITensorStorage<T> {
	alloc(size: number): TensorData<T>;
	from(iter: Iterable<T>): TensorData<T>;
	release(buf: TensorData<T>): boolean;
}

export type StorageRegistry = Record<Type, ITensorStorage<any>>;
