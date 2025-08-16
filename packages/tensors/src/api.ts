// SPDX-License-Identifier: Apache-2.0
import type {
	Type as $Type,
	ICopy,
	IEqualsDelta,
	IEquiv,
	ILength,
	IRelease,
	Maybe,
	NumericArray,
} from "@thi.ng/api";
import type { Tensor0, Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";

export interface TensorData<T = number> extends Iterable<T>, ILength {
	[id: number]: T;
	fill(x: T, start?: number, end?: number): TensorData<T>;
}

export type Type = $Type | "num" | "str";

export type NumType = $Type | "num";

export type Shape0 = [];
export type Shape1 = [number];
export type Shape2 = [number, number];
export type Shape3 = [number, number, number];
export type Shape4 = [number, number, number, number];

export type Shape = Shape0 | Shape1 | Shape2 | Shape3 | Shape4;

export type ShapeTensor<S extends Shape, T> = S extends Shape4
	? Tensor4<T>
	: S extends Shape3
	? Tensor3<T>
	: S extends Shape2
	? Tensor2<T>
	: S extends Shape1
	? Tensor1<T>
	: Tensor0<T>;

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

/**
 * Source data type for tensor conversion via {@link asTensor}.
 */
export interface TensorLike<T extends Type, S extends Shape> {
	/** Data type */
	type: T;
	/** Tensor data/values (MUST match `type`) */
	data: TensorData<TypeMap[T]>;
	/** Tensor shape */
	shape: S;
	/** Stride/layout information of data */
	stride: S;
	/** Start index (default: 0) */
	offset?: number;
}

export interface ITensor<T = number>
	extends ICopy<ITensor<T>>,
		IEquiv,
		IEqualsDelta<ITensor<T>>,
		IRelease {
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

	/**
	 * Internal use only. Creates a shallow view used for broadcasting
	 * operators. See {@link broadcast} for details.
	 *
	 * @param shape
	 * @param stride
	 *
	 * @internal
	 */
	broadcast<S extends Shape>(shape: S, stride: S): ShapeTensor<S, T>;

	/**
	 * Returns a new tensor of same shape, but all values zeroed. Unless
	 * `storage` is given, the new data will be allocated using this tensor's
	 * storage provider.
	 *
	 * @param storage
	 */
	empty(storage?: ITensorStorage<T>): this;

	/**
	 * Computes linear array index from given grid position. Reverse-op of
	 * {@link ITensor.position}.
	 *
	 * @remarks
	 * The given `pos` is assumed to be integral and valid. No bounds checking
	 * performed.
	 *
	 * @param pos
	 */
	index(pos: NumericArray): number;

	/**
	 * Computes nD grid position for given linear array index. Reverse-op of
	 * {@link ITensor.index}.
	 *
	 * @remarks
	 * The given `index` is assumed to be valid. No bounds checking performed.
	 *
	 * **CAUTION:** Currently only supports tensors with positive strides,
	 * otherwise will yield incorrect results! Tensors with negative strides
	 * (aka flipped axes in reverse order) need to be first packed via
	 * {@link ITensor.pack}.
	 *
	 * @param index
	 */
	position(index: number): number[];

	/**
	 * Returns value at given grid position. No bounds checking.
	 *
	 * @param pos
	 */
	get(pos: NumericArray): T;

	/**
	 * Sets value at given grid position. No bounds checking.
	 *
	 * @param pos
	 * @param value
	 */
	set(pos: NumericArray, value: T): this;

	/**
	 * Returns a new tensor of the bottom-right region starting from given
	 * `pos`. View transform only, no data will be copied.
	 *
	 * @remarks
	 * Also see {@link Itensor.hi}, {@link ITensor.crop}.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-lo.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * const a = range(16).reshape([4, 4]);
	 * print(a);
	 * //        0    1.0000    2.0000    3.0000
	 * //   4.0000    5.0000    6.0000    7.0000
	 * //   8.0000    9.0000   10.0000   11.0000
	 * //  12.0000   13.0000   14.0000   15.0000
	 *
	 * const b = a.lo([2, 1]);
	 * print(b);
	 * //   9.0000   10.0000   11.0000
	 * //  13.0000   14.0000   15.0000
	 * ```
	 *
	 * @param pos
	 */
	lo(pos: NumericArray): this;

	/**
	 * Returns a new tensor of the top-left region until given `pos` (excluded).
	 * View transform only, no data will be copied.
	 *
	 * @remarks
	 * Also see {@link Itensor.lo}, {@link ITensor.crop}.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-hi.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * const a = range(16).reshape([4, 4]);
	 * print(a);
	 * //        0    1.0000    2.0000    3.0000
	 * //   4.0000    5.0000    6.0000    7.0000
	 * //   8.0000    9.0000   10.0000   11.0000
	 * //  12.0000   13.0000   14.0000   15.0000
	 *
	 * const b = a.hi([2, 3]);
	 * print(b);
	 * //        0    1.0000    2.0000
	 * //   4.0000    5.0000    6.0000
	 * ```
	 *
	 * @param pos
	 */
	hi(pos: NumericArray): this;

	/**
	 * Returns a new tensor of the extracted region defined by `pos` and `size`.
	 * This op is a combination of {@link ITensor.lo} and {@link ITensor.hi}.
	 * View transform only, no data will be copied.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-crop.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * const a = range(16).reshape([4, 4]);
	 * print(a);
	 * //        0    1.0000    2.0000    3.0000
	 * //   4.0000    5.0000    6.0000    7.0000
	 * //   8.0000    9.0000   10.0000   11.0000
	 * //  12.0000   13.0000   14.0000   15.0000
	 *
	 * const b = a.crop([1, 1], [2, 2]);
	 * print(b);
	 * //   5.0000    6.0000
	 * //   9.0000   10.0000
	 * ```
	 *
	 * @param pos
	 * @param size
	 */
	crop(pos: NumericArray, size: NumericArray): this;

	/**
	 * Returns a new tensor with step sizes adjusted for selected axes (Using
	 * zero for an axis will keep its current step size). View transform only,
	 * no data will be copied.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-step.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * const a = range(16).reshape([4, 4]);
	 * print(a);
	 * //        0    1.0000    2.0000    3.0000
	 * //   4.0000    5.0000    6.0000    7.0000
	 * //   8.0000    9.0000   10.0000   11.0000
	 * //  12.0000   13.0000   14.0000   15.0000
	 *
	 * // only select every 2nd row
	 * const b = a.step([2, 1]);
	 * print(b);
	 * //        0    1.0000    2.0000    3.0000
	 * //   8.0000    9.0000   10.0000   11.0000
	 *
	 * // keep rows as is (zero), only select every 2nd column
	 * print(b.step([0, 2]));
	 * //        0    2.0000
	 * //   8.0000   10.0000
	 * ```
	 *
	 * @param select
	 */
	step(select: NumericArray): this;

	/**
	 * Returns a new tensor with only the `select`ed axes. A -1 will select all
	 * value in that axis. View transform only, no data will be copied.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-pick.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * // 3D 4x4x4 tensor with values in [0,64) range
	 * const a = range(64).reshape([4, 4, 4]);
	 *
	 * // pick entire slice #2
	 * print(a.pick([2]));
	 * //  32.0000   33.0000   34.0000   35.0000
	 * //  36.0000   37.0000   38.0000   39.0000
	 * //  40.0000   41.0000   42.0000   43.0000
	 * //  44.0000   45.0000   46.0000   47.0000
	 *
	 * // pick slice #2, row #2 (1D tensor)
	 * print(a.pick([2, 2]));
	 * //  40.0000   41.0000   42.0000   43.0000
	 *
	 * // pick slice #2, column #2 (1D tensor)
	 * print(a.pick([2, -1, 2]));
	 * //  34.0000   38.0000   42.0000   46.0000
	 * ```
	 *
	 * @param select
	 */
	pick(select: NumericArray): ITensor<T>;

	/**
	 * Creates a "packed" copy of this tensor with dense striding and the new
	 * data array only holding the values actually referenced by this tensor.
	 * Unless `storage` is given, the new data will be allocated using this
	 * tensor's storage provider.
	 *
	 * @remarks
	 * Since most other `ITensor` ops are zero-copy, view-only transforms, often
	 * resulting in "sparse" views which are only addressing a subset of the
	 * values stored, using `.pack()` is useful to extract data into a dense
	 * tensor/buffer.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-pack.ts
	 * import { range } from "@thi.ng/tensors";
	 *
	 * const a = range(16).reshape([4, 4]);
	 * console.log("a data", a.data);
	 * // a data [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
	 *
	 * // only select every 2nd row & column
	 * const b = a.step([2, 2]);
	 * console.log("b values", [...b]);
	 * // b values [ 0, 2, 8, 10 ]
	 * console.log("b data", b.data);
	 * // b data [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
	 *
	 * // create packed version of `b`
	 * const c = b.pack();
	 * console.log("c data", c.data);
	 * // c data [ 0, 2, 8, 10 ]
	 * ```
	 *
	 * @param storage
	 */
	pack(storage?: ITensorStorage<T>): this;

	/**
	 * Returns a new tensor with same data but given new shape (and optionally
	 * new strides). The total number of elements of the new shape MUST match
	 * that of the current shape (otherwise an error will be thrown).
	 *
	 * @remarks
	 * Also see {@link ITensor.crop} and {@link ITensor.resize}
	 *
	 * @example
	 * ```ts tangle:../export/itensor-reshape.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * // 1D tensor
	 * const a = range(16);
	 *
	 * // reshape as 2D tensor
	 * print(a.reshape([4, 4]));
	 * //         0    1.0000    2.0000    3.0000
	 * //    4.0000    5.0000    6.0000    7.0000
	 * //    8.0000    9.0000   10.0000   11.0000
	 * //   12.0000   13.0000   14.0000   15.0000
	 *
	 * // reshape as 3D tensor
	 * print(a.reshape([2, 2, 4]));
	 * // --- 0: ---
	 * //         0    1.0000    2.0000    3.0000
	 * //    4.0000    5.0000    6.0000    7.0000
	 * // --- 1: ---
	 * //    8.0000    9.0000   10.0000   11.0000
	 * //   12.0000   13.0000   14.0000   15.0000
	 * ```
	 *
	 * @param newShape
	 * @param newStride
	 */
	reshape<S extends Shape>(newShape: S, newStride?: S): ShapeTensor<S, T>;

	/**
	 * Returns a copy of the tensor resized to `newShape`. If the new shape is
	 * larger than the current shape, the extra data values will be initialized
	 * to `fill` (default: zero). Values will be copied in current iteration
	 * order (same logic as numpy). Unless `storage` is given, the new data will
	 * be allocated using this tensor's storage provider.
	 *
	 * @remarks
	 * Also see {@link ITensor.crop}, {@link ITensor.reshape}.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-resize.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * // 2D 4x4 tensor with values in [0,16) range
	 * const a = range(16).reshape([4, 4]);
	 *
	 * print(a.resize([4, 8]));
	 * //        0    1.0000    2.0000    3.0000    4.0000    5.0000    6.0000    7.0000
	 * //   8.0000    9.0000   10.0000   11.0000   12.0000   13.0000   14.0000   15.0000
	 * //        0         0         0         0         0         0         0         0
	 * //        0         0         0         0         0         0         0         0
	 * ```
	 *
	 * @param newShape
	 * @param fill
	 * @param storage
	 */
	resize<S extends Shape>(
		newShape: S,
		fill?: T,
		storage?: ITensorStorage<T>
	): ShapeTensor<S, T>;

	/**
	 * Returns a new tensor with the given new axis `order`. View transform
	 * only, no data will be copied.
	 *
	 * @example
	 * ```ts tangle:../export/itensor-transpose.ts
	 * import { print, range } from "@thi.ng/tensors";
	 *
	 * const a = range(12).reshape([3, 4]);
	 * print(a);
	 * //        0    1.0000    2.0000    3.0000
	 * //   4.0000    5.0000    6.0000    7.0000
	 * //   8.0000    9.0000   10.0000   11.0000
	 *
	 * // swap row & column order
	 * const b = a.transpose([1, 0]);
	 * print(b);
	 * //        0    4.0000    8.0000
	 * //   1.0000    5.0000    9.0000
	 * //   2.0000    6.0000   10.0000
	 * //   3.0000    7.0000   11.0000
	 * ```
	 *
	 * @param order
	 */
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
	/**
	 * Attempts to allocate/create an array for given number of items. Throws an
	 * error if unsuccessful.
	 *
	 * @param size
	 */
	alloc(size: number): TensorData<T>;
	/**
	 * Attempts to allocate/create an array for given iterable. Throws an
	 * error if unsuccessful.
	 *
	 * @param iter
	 */
	from(iter: Iterable<T>): TensorData<T>;
	/**
	 * Attempts to release the array/memory used by given buffer. Returns true
	 * if successful.
	 *
	 * @param buf
	 */
	release(buf: TensorData<T>): boolean;
}

export type StorageRegistry = Record<Type, ITensorStorage<any>>;

// pretier-ignore
export interface TensorOpT<T = number> {
	(out: Tensor0<T> | null, a: Tensor0<T>): Tensor0<T>;
	(out: Tensor1<T> | null, a: Tensor1<T>): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>): Tensor4<T>;
}

// Code gen for signatures:
// tx.transduce(tx.comp(tx.map(([a,b])=>`(out: Tensor${Math.max(a,b)}<T> | null, a: Tensor${a}<T>, b: Tensor${b}<T>): Tensor${Math.max(a,b)}<T>;`), tx.distinct(), tx.partition(5), tx.map(x=>x.join("\n"))), tx.str("\n\n"), tx.permutations(d=[0,1,2,3,4],d,d))

// pretier-ignore
export interface TensorOpTT<T = number> {
	(out: Tensor0<T> | null, a: Tensor0<T>, b: Tensor0<T>): Tensor0<T>;
	(out: Tensor1<T> | null, a: Tensor0<T>, b: Tensor1<T>): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor0<T>, b: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor4<T>): Tensor4<T>;

	(out: Tensor1<T> | null, a: Tensor1<T>, b: Tensor0<T>): Tensor1<T>;
	(out: Tensor1<T> | null, a: Tensor1<T>, b: Tensor1<T>): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor1<T>, b: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor4<T>): Tensor4<T>;

	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor0<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor1<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor4<T>): Tensor4<T>;
}

// Code gen for signatures:
// tx.transduce(tx.comp(tx.map(([a,b,c])=>`(out: Tensor${Math.max(a,b,c)}<T> | null, a: Tensor${a}<T>, b: Tensor${b}<T>, c: Tensor${c}<T>): Tensor${Math.max(a,b,c)}<T>;`), tx.distinct(), tx.partition(5), tx.map(x=>x.join("\n"))), tx.str("\n\n"), tx.permutations(d=[0,1,2,3,4],d,d))

// prettier-ignore
export interface TensorOpTTT<T = number> {
	(out: Tensor0<T> | null, a: Tensor0<T>, b: Tensor0<T>, c: Tensor0<T>): Tensor0<T>;
	(out: Tensor1<T> | null, a: Tensor0<T>, b: Tensor0<T>, c: Tensor1<T>): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor0<T>, b: Tensor0<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor0<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor0<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor1<T> | null, a: Tensor0<T>, b: Tensor1<T>, c: Tensor0<T>): Tensor1<T>;
	(out: Tensor1<T> | null, a: Tensor0<T>, b: Tensor1<T>, c: Tensor1<T>): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor0<T>, b: Tensor1<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor1<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor1<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor2<T> | null, a: Tensor0<T>, b: Tensor2<T>, c: Tensor0<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor0<T>, b: Tensor2<T>, c: Tensor1<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor0<T>, b: Tensor2<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor2<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor2<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor3<T>, c: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor3<T>, c: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor3<T>, c: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor0<T>, b: Tensor3<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor3<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor4<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor4<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor4<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor4<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor0<T>, b: Tensor4<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor1<T> | null, a: Tensor1<T>, b: Tensor0<T>, c: Tensor0<T>): Tensor1<T>;
	(out: Tensor1<T> | null, a: Tensor1<T>, b: Tensor0<T>, c: Tensor1<T>): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor1<T>, b: Tensor0<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor0<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor0<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor1<T> | null, a: Tensor1<T>, b: Tensor1<T>, c: Tensor0<T>): Tensor1<T>;
	(out: Tensor1<T> | null, a: Tensor1<T>, b: Tensor1<T>, c: Tensor1<T>): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor1<T>, b: Tensor1<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor1<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor1<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor2<T> | null, a: Tensor1<T>, b: Tensor2<T>, c: Tensor0<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor1<T>, b: Tensor2<T>, c: Tensor1<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor1<T>, b: Tensor2<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor2<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor2<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor3<T>, c: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor3<T>, c: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor3<T>, c: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor1<T>, b: Tensor3<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor3<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor4<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor4<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor4<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor4<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor1<T>, b: Tensor4<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor0<T>, c: Tensor0<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor0<T>, c: Tensor1<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor0<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor0<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor0<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor1<T>, c: Tensor0<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor1<T>, c: Tensor1<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor1<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor1<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor1<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor2<T>, c: Tensor0<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor2<T>, c: Tensor1<T>): Tensor2<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, b: Tensor2<T>, c: Tensor2<T>): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor2<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor2<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor3<T>, c: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor3<T>, c: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor3<T>, c: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor2<T>, b: Tensor3<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor3<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor4<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor4<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor4<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor4<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor2<T>, b: Tensor4<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor0<T>, c: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor0<T>, c: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor0<T>, c: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor0<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor0<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor1<T>, c: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor1<T>, c: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor1<T>, c: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor1<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor1<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor2<T>, c: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor2<T>, c: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor2<T>, c: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor2<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor2<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor3<T>, c: Tensor0<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor3<T>, c: Tensor1<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor3<T>, c: Tensor2<T>): Tensor3<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, b: Tensor3<T>, c: Tensor3<T>): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor3<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor4<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor4<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor4<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor4<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor3<T>, b: Tensor4<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor0<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor0<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor0<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor0<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor0<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor1<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor1<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor1<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor1<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor1<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor2<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor2<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor2<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor2<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor2<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor3<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor3<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor3<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor3<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor3<T>, c: Tensor4<T>): Tensor4<T>;

	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor4<T>, c: Tensor0<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor4<T>, c: Tensor1<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor4<T>, c: Tensor2<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor4<T>, c: Tensor3<T>): Tensor4<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, b: Tensor4<T>, c: Tensor4<T>): Tensor4<T>;
}

export interface TensorOpN<A = number, B = A> {
	(out: Tensor0<B>, n: A): Tensor0<B>;
	(out: Tensor1<B>, n: A): Tensor1<B>;
	(out: Tensor2<B>, n: A): Tensor2<B>;
	(out: Tensor3<B>, n: A): Tensor3<B>;
	(out: Tensor4<B>, n: A): Tensor4<B>;
}

export interface TensorOpTN<T = number> {
	(out: Tensor0<T> | null, a: Tensor0<T>, n: T): Tensor0<T>;
	(out: Tensor1<T> | null, a: Tensor1<T>, n: T): Tensor1<T>;
	(out: Tensor2<T> | null, a: Tensor2<T>, n: T): Tensor2<T>;
	(out: Tensor3<T> | null, a: Tensor3<T>, n: T): Tensor3<T>;
	(out: Tensor4<T> | null, a: Tensor4<T>, n: T): Tensor4<T>;
}

export interface TensorOpTNN<T = number> {
	(out: Tensor0<T>, a: Tensor0<T>, n: T, m: T): Tensor0<T>;
	(out: Tensor1<T>, a: Tensor1<T>, n: T, m: T): Tensor1<T>;
	(out: Tensor2<T>, a: Tensor2<T>, n: T, m: T): Tensor2<T>;
	(out: Tensor3<T>, a: Tensor3<T>, n: T, m: T): Tensor3<T>;
	(out: Tensor4<T>, a: Tensor4<T>, n: T, m: T): Tensor4<T>;
}

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

/**
 * Convolution kernel spec for use with {@link applyKernel}.
 *
 * @remarks
 * Provided implementations:
 *
 * - {@link MAX2_MOORE}
 * - {@link MAX2_VON_NEUMANN}
 * - {@link MAXIMA2_MOORE}
 * - {@link MAXIMA2_VON_NEUMANN}
 */
export interface KernelSpec<T = any> {
	/**
	 * Kernel shape/size
	 */
	shape: Exclude<Shape, Shape0>;
	/**
	 * Windowed intialization. Returns initial accumulator for each new kernel
	 * window.
	 */
	init: () => T;
	/**
	 * Windowed reduction function. Receives current accumulator, domain value
	 * and kernel-local coordinates. Returns updated accumulator.
	 *
	 * @param acc
	 * @param value
	 * @param coords
	 */
	reduce: (acc: T, value: number, ...coords: number[]) => T;
	/**
	 * Windowed reducer result function. Produces final result from current
	 * accumulator.
	 *
	 * @param acc
	 */
	complete: (acc: T) => number;
}
