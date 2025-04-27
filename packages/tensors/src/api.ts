import type {
	ILength,
	ICopy,
	IEmpty,
	IEquiv,
	IEqualsDelta,
	NumericArray,
	Nullable,
} from "@thi.ng/api";

export interface Tensor<T = number> extends Iterable<T>, ILength {
	[id: number]: T;
}

export interface ITensor<T = number>
	extends ICopy<ITensor<T>>,
		IEmpty<ITensor<T>>,
		IEquiv,
		IEqualsDelta<ITensor<T>>,
		Iterable<T> {
	data: Tensor<T>;
	shape: number[];
	stride: number[];
	offset: number;

	readonly length: number;

	index(pos: NumericArray): number;

	get(pos: NumericArray): T;

	set(pos: NumericArray, value: T): void;

	lo(pos: NumericArray | Nullable<number>[]): ITensor<T>;

	hi(pos: NumericArray | Nullable<number>[]): ITensor<T>;

	step(pos: NumericArray): ITensor<T>;

	pick(pos: NumericArray): ITensor<T>;

	pack(): ITensor<T>;

	transpose(pos: NumericArray): ITensor<T>;
}

export interface ITensorStorage<T> {
	alloc(size: number): Tensor<T>;
	release(buf: Tensor<T>): boolean;
}
