// SPDX-License-Identifier: Apache-2.0
import type { Maybe, NumericArray } from "@thi.ng/api";
import { swizzle } from "@thi.ng/arrays/swizzle";
import { isNumber } from "@thi.ng/checks/is-number";
import { equiv, equivArrayLike } from "@thi.ng/equiv";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { outOfBounds } from "@thi.ng/errors/out-of-bounds";
import { unsupported } from "@thi.ng/errors/unsupported";
import { dot2, dot3, dot4 } from "@thi.ng/vectors/dot";
import { eqDeltaS as _eqDelta } from "@thi.ng/vectors/eqdelta";
import { product, product2, product3, product4 } from "@thi.ng/vectors/product";
import type {
	ITensor,
	ITensorStorage,
	Nested,
	NestedTensor,
	NumType,
	Shape,
	ShapeTensor,
	TensorCtor,
	TensorData,
	TensorFromArrayOpts,
	TensorOpts,
	Type,
	TypeMap,
} from "./api.js";
import { illegalShape } from "./errors.js";
import { format } from "./format.js";
import { STORAGE } from "./storage.js";

const { abs, ceil, min } = Math;

export abstract class ATensor<T = number> implements ITensor<T> {
	constructor(
		public type: Type,
		public storage: ITensorStorage<T>,
		public data: TensorData<T>,
		public shape: number[],
		public stride: number[],
		public offset = 0
	) {}

	abstract get dim(): number;
	abstract get length(): number;

	get order() {
		return strideOrder(this.stride);
	}

	get orderedShape(): number[] {
		return swizzle(this.order)(this.shape);
	}

	get orderedStride(): number[] {
		return swizzle(this.order)(this.stride);
	}

	abstract [Symbol.iterator](): IterableIterator<T>;

	broadcast<S extends Shape>(shape: S, stride: S): ShapeTensor<S, T> {
		return <any>(
			new TENSOR_IMPLS[shape.length]!(
				this.type,
				this.storage,
				this.data,
				shape,
				stride,
				this.offset
			)
		);
	}

	copy() {
		return <typeof this>(
			new (<TensorCtor<T>>this.constructor)(
				this.type,
				this.storage,
				this.data,
				this.shape.slice(),
				this.stride.slice(),
				this.offset
			)
		);
	}

	empty(storage = this.storage) {
		return <typeof this>(
			new (<TensorCtor<T>>this.constructor)(
				this.type,
				storage,
				storage.alloc(this.length),
				this.shape.slice(),
				shapeToStride(this.shape)
			)
		);
	}

	equiv(o: any) {
		return (
			this === o ||
			(o instanceof ATensor &&
				equiv(this.shape, o.shape) &&
				equivArrayLike([...this], [...o]))
		);
	}

	eqDelta(o: ITensor<T>, eps = 1e-6): boolean {
		return (
			this === o ||
			(equiv(this.shape, o.shape) &&
				_eqDelta(<any>[...this], <any>[...o], this.length, eps))
		);
	}

	abstract index(pos: NumericArray): number;

	position(index: number) {
		const { order, stride } = this;
		index -= this.offset;
		const idx = order.map((o) => {
			const i = ~~(index / stride[o]);
			index -= i * stride[o];
			return i;
		});
		return swizzle(order)(idx);
	}

	abstract get(pos: NumericArray): T;

	abstract set(pos: NumericArray, v: T): this;

	hi(pos: NumericArray): this {
		return <typeof this>(
			new (<TensorCtor<T>>this.constructor)(
				this.type,
				this.storage,
				this.data,
				__hi(pos, this),
				this.stride,
				this.offset
			)
		);
	}

	lo(pos: NumericArray): this {
		const { shape, offset } = __lo(pos, this);
		return <typeof this>(
			new (<TensorCtor<T>>this.constructor)(
				this.type,
				this.storage,
				this.data,
				shape,
				this.stride,
				offset
			)
		);
	}

	step(select: NumericArray) {
		const { shape, stride, offset } = __step(select, this);
		return <typeof this>(
			new (<TensorCtor<T>>this.constructor)(
				this.type,
				this.storage,
				this.data,
				shape,
				stride,
				offset
			)
		);
	}

	pick(select: NumericArray): ITensor<T> {
		const { shape, stride, offset } = __pick(select, this);
		return tensor<any, any>(this.type, shape, {
			data: this.data,
			storage: this.storage,
			copy: false,
			stride: <any>stride,
			offset,
		});
	}

	pack(storage = this.storage) {
		return <typeof this>(
			new (<TensorCtor<T>>this.constructor)(
				this.type,
				storage,
				storage.from(this),
				this.shape.slice(),
				shapeToStride(this.shape)
			)
		);
	}

	reshape<S extends Shape>(newShape: S, newStride?: S): ShapeTensor<S, T> {
		const newLength = product(newShape);
		if (newLength !== this.length) illegalShape(newShape);
		return tensor<any, S>(this.type, newShape, {
			storage: this.storage,
			data: this.data,
			copy: false,
			stride: <any>newStride ?? shapeToStride(newShape),
			offset: this.offset,
		});
	}

	abstract resize<S extends Shape>(
		newShape: S,
		fill?: T,
		storage?: ITensorStorage<T>
	): ShapeTensor<S, T>;

	transpose(order: NumericArray) {
		const reorder = swizzle(order);
		return <typeof this>(
			new (<TensorCtor<T>>this.constructor)(
				this.type,
				this.storage,
				this.data,
				reorder(this.shape),
				reorder(this.stride),
				this.offset
			)
		);
	}

	abstract toString(): string;

	toJSON() {
		return {
			buf: [...this],
			shape: this.shape,
			stride: shapeToStride(this.shape),
		};
	}
}

export class Tensor1<T = number> extends ATensor<T> {
	*[Symbol.iterator](): IterableIterator<T> {
		let {
			data,
			shape: [sx],
			stride: [tx],
			offset,
		} = this;
		for (; sx-- > 0; offset += tx) yield data[offset];
	}

	get dim() {
		return 1;
	}

	get order() {
		return [0];
	}

	get length() {
		return this.shape[0];
	}

	index([x]: NumericArray) {
		return this.offset + x * this.stride[0];
	}

	position(index: number): number[] {
		// sign(this.stride[0]) * floor((index - this.offset) / abs(this.stride[0]))
		return [~~((index - this.offset) / this.stride[0])];
	}

	get([x]: NumericArray) {
		return this.data[this.offset + x * this.stride[0]];
	}

	set([x]: NumericArray, v: T) {
		this.data[this.offset + x * this.stride[0]] = v;
		return this;
	}

	pick([x]: NumericArray) {
		if (x < 0 && x >= this.length) outOfBounds(x);
		return new Tensor1(
			this.type,
			this.storage,
			this.data,
			[1],
			[1],
			this.offset + x * this.stride[0]
		);
	}

	resize<S extends Shape>(
		newShape: S,
		fill?: T,
		storage = this.storage
	): ShapeTensor<S, T> {
		const newLength = product(newShape);
		const newData = storage.alloc(newLength);
		if (fill !== undefined) newData.fill(fill);
		const {
			data,
			shape: [sx],
			stride: [tx],
		} = this;
		const n = min(sx, newLength);
		for (
			let i = this.offset, ii = 0, x = 0;
			x < sx && ii < n;
			x++, i += tx, ii++
		) {
			newData[ii] = data[i];
		}
		return tensor<any, S>(this.type, newShape, {
			storage,
			data: newData,
			copy: false,
		});
	}

	transpose(_: number[]) {
		return this.copy();
	}

	toString() {
		const res = [];
		for (let x of this) res.push(format(x));
		return res.join(" ");
	}
}

export class Tensor2<T = number> extends ATensor<T> {
	protected _n!: number;

	*[Symbol.iterator]() {
		const {
			data,
			shape: [sx, sy],
			stride: [tx, ty],
		} = this;
		let ox: number, x: number, y: number;
		for (ox = this.offset, x = 0; x < sx; x++, ox += tx) {
			for (y = 0; y < sy; y++) {
				yield data[ox + y * ty];
			}
		}
	}

	get length() {
		return this._n || (this._n = product2(this.shape));
	}

	get dim() {
		return 2;
	}

	get order() {
		return abs(this.stride[1]) > abs(this.stride[0]) ? [1, 0] : [0, 1];
	}

	index(pos: NumericArray) {
		return this.offset + dot2(pos, this.stride);
	}

	get(pos: NumericArray) {
		return this.data[this.offset + dot2(pos, this.stride)];
	}

	set(pos: NumericArray, v: T) {
		this.data[this.offset + dot2(pos, this.stride)] = v;
		return this;
	}

	resize<S extends Shape>(
		newShape: S,
		fill?: T,
		storage = this.storage
	): ShapeTensor<S, T> {
		const newLength = product(newShape);
		const newData = storage.alloc(newLength);
		if (fill !== undefined) newData.fill(fill);
		const {
			data,
			shape: [sx, sy],
			stride: [tx, ty],
		} = this;
		const n = min(this.length, newLength);
		let ox: number, x: number, y: number, i: number;
		for (ox = this.offset, i = 0, x = 0; x < sx; x++, ox += tx) {
			for (y = 0; y < sy && i < n; y++, i++) {
				newData[i] = data[ox + y * ty];
			}
		}
		return tensor<any, S>(this.type, newShape, {
			storage,
			data: newData,
			copy: false,
		});
	}

	toString() {
		const res = [];
		for (let i = 0; i < this.shape[0]; i++) {
			res.push(this.pick([i]).toString());
		}
		return res.join("\n");
	}
}

export class Tensor3<T = number> extends ATensor<T> {
	protected _n!: number;

	*[Symbol.iterator]() {
		const {
			data,
			shape: [sx, sy, sz],
			stride: [tx, ty, tz],
		} = this;
		let ox: number, oy: number, x: number, y: number, z: number;
		for (ox = this.offset, x = 0; x < sx; x++, ox += tx) {
			for (oy = ox, y = 0; y < sy; y++, oy += ty) {
				for (z = 0; z < sz; z++) {
					yield data[oy + z * tz];
				}
			}
		}
	}

	get length() {
		return this._n || (this._n = product3(this.shape));
	}

	get dim() {
		return 3;
	}

	index(pos: NumericArray) {
		return this.offset + dot3(pos, this.stride);
	}

	get(pos: NumericArray) {
		return this.data[this.offset + dot3(pos, this.stride)];
	}

	set(pos: NumericArray, v: T) {
		this.data[this.offset + dot3(pos, this.stride)] = v;
		return this;
	}

	resize<S extends Shape>(
		newShape: S,
		fill?: T,
		storage = this.storage
	): ShapeTensor<S, T> {
		const newLength = product(newShape);
		const newData = storage.alloc(newLength);
		if (fill !== undefined) newData.fill(fill);
		const {
			data,
			shape: [sx, sy, sz],
			stride: [tx, ty, tz],
		} = this;
		const n = min(this.length, newLength);
		let ox: number, oy: number, x: number, y: number, z: number, i: number;
		for (ox = this.offset, i = 0, x = 0; x < sx; x++, ox += tx) {
			for (oy = ox, y = 0; y < sy; y++, oy += ty) {
				for (z = 0; z < sz && i < n; z++, i++) {
					newData[i] = data[oy + z * tz];
				}
			}
		}
		return tensor<any, S>(this.type, newShape, {
			storage,
			data: newData,
			copy: false,
		});
	}

	toString() {
		const res = [];
		for (let i = 0; i < this.shape[0]; i++) {
			res.push(`--- ${i}: ---`, this.pick([i]).toString());
		}
		return res.join("\n");
	}
}

export class Tensor4<T = number> extends ATensor<T> {
	protected _n!: number;

	*[Symbol.iterator]() {
		const {
			data,
			shape: [sx, sy, sz, sw],
			stride: [tx, ty, tz, tw],
			offset,
		} = this;
		let ox: number,
			oy: number,
			oz: number,
			x: number,
			y: number,
			z: number,
			w: number;
		for (ox = offset, x = 0; x < sx; x++, ox += tx) {
			for (oy = ox, y = 0; y < sy; y++, oy += ty) {
				for (oz = oy, z = 0; z < sz; z++, oz += tz) {
					for (w = 0; w < sw; w++) {
						yield data[oz + w * tw];
					}
				}
			}
		}
	}

	get length() {
		return this._n || (this._n = product4(this.shape));
	}

	get dim() {
		return 4;
	}

	index(pos: NumericArray) {
		return this.offset + dot4(pos, this.stride);
	}

	get(pos: NumericArray) {
		return this.data[this.offset + dot4(pos, this.stride)];
	}

	set(pos: NumericArray, v: T) {
		this.data[this.offset + dot4(pos, this.stride)] = v;
		return this;
	}

	resize<S extends Shape>(
		newShape: S,
		fill?: T,
		storage = this.storage
	): ShapeTensor<S, T> {
		const newLength = product(newShape);
		const newData = storage.alloc(newLength);
		if (fill !== undefined) newData.fill(fill);
		const {
			data,
			shape: [sx, sy, sz, sw],
			stride: [tx, ty, tz, tw],
		} = this;
		const n = min(this.length, newLength);
		let ox: number,
			oy: number,
			oz: number,
			x: number,
			y: number,
			z: number,
			w: number,
			i: number;
		for (ox = this.offset, i = 0, x = 0; x < sx; x++, ox += tx) {
			for (oy = ox, y = 0; y < sy; y++, oy += ty) {
				for (oz = oy, z = 0; z < sz; z++, oz += tz) {
					for (w = 0; w < sw && i < n; w++, i++) {
						newData[i] = data[oz + w * tw];
					}
				}
			}
		}
		return tensor<any, S>(this.type, newShape, {
			storage,
			data: newData,
			copy: false,
		});
	}

	toString() {
		const res = [];
		for (let i = 0; i < this.shape[0]; i++) {
			res.push(`--- cube ${i}: ---`, this.pick([i]).toString());
		}
		return res.join("\n");
	}
}

export const TENSOR_IMPLS: Maybe<TensorCtor<any>>[] = [
	undefined,
	Tensor1,
	Tensor2,
	Tensor3,
	Tensor4,
];

/** Syntax sugar for {@link tensorFromArray}. */
export function tensor<T extends NumType, N extends Nested<number>>(
	data: N,
	opts?: TensorFromArrayOpts<T, number>
): NestedTensor<N, number>;
/** Syntax sugar for {@link tensorFromArray}. */
export function tensor<N extends Nested<string>>(
	data: N,
	opts?: TensorFromArrayOpts<"str", string>
): NestedTensor<N, string>;
/**
 * Creates a new {@link ITensor} instance for given data type, shape and
 * options.
 *
 * @remarks
 * Currently only 1D - 4D tensors are supported.
 *
 * @param type
 * @param shape
 * @param opts
 */
export function tensor<T extends Type, S extends Shape>(
	type: T,
	shape: S,
	opts?: TensorOpts<TypeMap[T], S>
): ShapeTensor<S, TypeMap[T]>;
export function tensor(...args: any[]): ITensor<any> {
	if (Array.isArray(args[0])) return tensorFromArray(args[0], args[1]);
	const type: Type = args[0];
	const shape: number[] = args[1];
	const opts: Maybe<TensorOpts<any, any>> = args[2];
	const storage = opts?.storage ?? STORAGE[type];
	const stride = opts?.stride ?? shapeToStride(shape);
	let data: TensorData<any>;
	if (opts?.data) {
		if (opts?.copy === false) data = opts.data;
		else data = storage.from(opts.data);
	} else {
		data = storage.alloc(product(shape!));
	}
	let offset = opts?.offset;
	if (offset === undefined) {
		offset = 0;
		for (let i = 0; i < shape.length; i++) {
			if (stride[i] < 0) {
				offset -= (shape[i] - 1) * stride[i];
			}
		}
	}
	const ctor = TENSOR_IMPLS[shape.length];
	return ctor
		? new ctor(type, storage, data, shape, stride, offset)
		: unsupported(`unsupported dimension: ${shape.length}`);
}

/**
 * Creates a new {@link ITensor} instance from given (possibly nested) numeric
 * array, and options.
 *
 * @remarks
 * Currently only 1D - 4D tensors are supported.
 *
 * @param data
 * @param opts
 */
export function tensorFromArray<T extends NumType, N extends Nested<number>>(
	data: N,
	opts?: TensorFromArrayOpts<T, number>
): NestedTensor<N, number>;
/**
 * Creates a new {@link ITensor} instance from given (possibly nested) string
 * array, and options.
 *
 * @remarks
 * Currently only 1D - 4D tensors are supported.
 *
 * @param data
 * @param opts
 */
export function tensorFromArray<N extends Nested<string>>(
	data: N,
	opts?: TensorFromArrayOpts<"str", string>
): NestedTensor<N, string>;
export function tensorFromArray(
	data: Nested<any>,
	opts?: TensorFromArrayOpts<any, any>
): ITensor<any> {
	const shape: Shape = [data.length];
	let $data: any[] = data;
	while (Array.isArray($data[0])) {
		shape.push($data[0].length);
		$data = $data.flat();
	}
	const $type = opts?.type ?? <Type>(isNumber($data[0]) ? "num" : "str");
	if ($type === "str" && isNumber($data[0]))
		illegalArgs("mismatched data type");
	return tensor<any, any>($type, shape, {
		data: $data,
		copy: $type !== "num" && $type !== "str",
		storage: opts?.storage,
	});
}

export const zeroes = <S extends Shape>(
	shape: S,
	type: NumType = "num",
	storage?: ITensorStorage<number>
): ShapeTensor<S, number> => tensor<any, S>(type, shape, { storage });

export const ones = <S extends Shape>(
	shape: S,
	type: NumType = "num",
	storage?: ITensorStorage<number>
): ShapeTensor<S, number> => {
	const res = tensor<any, S>(type, shape, { storage });
	res.data.fill(1);
	return res;
};

export const shapeToStride = (shape: number[]) => {
	const n = shape.length;
	const stride = new Array(n);
	for (let i = n, s = 1; i-- > 0; s *= shape[i]) {
		stride[i] = s;
	}
	return stride;
};

export const strideOrder = (strides: number[]) =>
	strides
		.map((x, i) => [x, i])
		.sort((a, b) => abs(b[0]) - abs(a[0]))
		.map((x) => x[1]);

/** @internal */
const __lo = (
	select: NumericArray,
	{ shape, stride, offset }: ITensor<any>
) => {
	const newShape: number[] = [];
	for (let i = 0, n = shape.length; i < n; i++) {
		const x = select[i];
		newShape.push(
			x >= 0 ? ((offset += stride[i] * x), shape[i] - x) : shape[i]
		);
	}
	return { shape: newShape, offset };
};

/** @internal */
const __hi = (select: NumericArray, { shape }: ITensor<any>) => {
	const newShape: number[] = [];
	for (let i = 0, n = shape.length; i < n; i++) {
		const x = select[i];
		newShape.push(x > 0 ? x : shape[i]);
	}
	return newShape;
};

/** @internal */
const __step = (
	select: NumericArray,
	{ shape, stride, offset }: ITensor<any>
) => {
	const newShape = shape.slice();
	const newStride = stride.slice();
	for (let i = 0, n = shape.length; i < n; i++) {
		const x = select[i];
		if (x) {
			if (x < 0) {
				offset += stride[i] * (shape[i] - 1);
				newShape[i] = ceil(-shape[i] / x);
			} else {
				newShape[i] = ceil(shape[i] / x);
			}
			newStride[i] *= x;
		}
	}
	return { shape: newShape, stride: newStride, offset };
};

/** @internal */
const __pick = (
	select: NumericArray,
	{ shape, stride, offset }: ITensor<any>
) => {
	const newShape: number[] = [];
	const newStride: number[] = [];
	for (let i = 0, n = shape.length; i < n; i++) {
		const x = select[i];
		if (x >= 0) {
			offset += stride[i] * x;
		} else {
			newShape.push(shape[i]);
			newStride.push(stride[i]);
		}
	}
	return { shape: newShape, stride: newStride, offset };
};
