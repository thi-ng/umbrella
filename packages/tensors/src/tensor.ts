import type { NumericArray } from "@thi.ng/api";
import { swizzle } from "@thi.ng/arrays/swizzle";
import { equiv, equivArrayLike } from "@thi.ng/equiv";
import { assert } from "@thi.ng/errors/assert";
import { unsupported } from "@thi.ng/errors/unsupported";
import { dot2, dot3 } from "@thi.ng/vectors/dot";
import { eqDeltaS as _eqDelta } from "@thi.ng/vectors/eqdelta";
import { product, product2, product3 } from "@thi.ng/vectors/product";
import type { ITensor, ITensorStorage, TensorData, Type } from "./api.js";
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

	abstract get order(): number[];

	abstract get length(): number;

	get orderedShape(): number[] {
		return swizzle(this.order)(this.shape);
	}

	get orderedStride(): number[] {
		return swizzle(this.order)(this.stride);
	}

	abstract [Symbol.iterator](): IterableIterator<T>;

	abstract index(pos: NumericArray): number;

	abstract copy(): ITensor<T>;

	abstract empty(storage?: ITensorStorage<T>): ITensor<T>;

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

	abstract get(pos: NumericArray): T;

	abstract set(pos: NumericArray, v: T): this;

	abstract lo(pos: NumericArray): ITensor<T>;

	abstract hi(pos: NumericArray): ITensor<T>;

	abstract step(pos: NumericArray): ITensor<T>;

	abstract pick(pos: NumericArray): ITensor<T>;

	abstract pack(storage?: ITensorStorage<T>): ITensor<T>;

	abstract resize(
		newShape: number[],
		fill?: T,
		storage?: ITensorStorage<T>
	): ITensor<T>;

	abstract transpose(pos: NumericArray): ITensor<T>;

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
	*[Symbol.iterator]() {
		let {
			data,
			length,
			stride: [s],
			offset,
		} = this;
		for (; length-- > 0; offset += s) yield data[offset];
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

	copy() {
		return new Tensor1<T>(
			this.type,
			this.storage,
			this.data,
			[this.shape[0]],
			[this.stride[0]],
			this.offset
		);
	}

	empty(storage = this.storage) {
		const n = this.shape[0];
		return new Tensor1<T>(this.type, storage, storage.alloc(n), [n], [1]);
	}

	index([x]: NumericArray) {
		return this.offset + x * this.stride[0];
	}

	get([x]: NumericArray) {
		return this.data[this.offset + x * this.stride[0]];
	}

	set([x]: NumericArray, v: T) {
		this.data[this.offset + x * this.stride[0]] = v;
		return this;
	}

	hi(select: NumericArray) {
		return new Tensor1<T>(
			this.type,
			this.storage,
			this.data,
			__hi(select, this),
			this.stride,
			this.offset
		);
	}

	lo(select: NumericArray) {
		const { shape, offset } = __lo(select, this);
		return new Tensor1(
			this.type,
			this.storage,
			this.data,
			shape,
			this.stride,
			offset
		);
	}

	step(select: NumericArray) {
		const { shape, stride, offset } = __step(select, this);
		return new Tensor1(
			this.type,
			this.storage,
			this.data,
			shape,
			stride,
			offset
		);
	}

	pick([x]: NumericArray) {
		assert(x >= 0 && x < this.length);
		return new Tensor1(
			this.type,
			this.storage,
			this.data,
			[1],
			[1],
			this.offset + x * this.stride[0]
		);
	}

	pack(storage = this.storage) {
		return new Tensor1(
			this.type,
			this.storage,
			storage.from(this),
			[this.shape[0]],
			[1]
		);
	}

	resize(newShape: number[], fill?: T, storage = this.storage) {
		const newLength = product(newShape);
		const newData = storage.alloc(newLength);
		if (fill !== undefined) (<any>newData).fill(fill); // FIXME type cast
		const {
			data,
			shape: [sx],
			stride: [tx],
		} = this;
		for (
			let i = this.offset, n = min(this.length, newLength), j = 0, x = 0;
			x < sx && j < n;
			x++, i += tx
		) {
			newData[j] = data[i];
		}
		return tensor(this.type, newShape, {
			storage,
			data: newData,
			copy: false,
		});
	}

	transpose() {
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
		for (let i = this.offset, x = 0; x < sx; x++, i += tx) {
			for (let y = 0; y < sy; y++) {
				yield data[i + y * ty];
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

	copy() {
		return new Tensor2<T>(
			this.type,
			this.storage,
			this.data,
			this.shape.slice(),
			this.stride.slice(),
			this.offset
		);
	}

	empty(storage = this.storage) {
		return new Tensor2<T>(
			this.type,
			storage,
			storage.alloc(this.length),
			this.shape.slice(),
			shapeToStride(this.shape)
		);
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

	hi(select: NumericArray) {
		return new Tensor2<T>(
			this.type,
			this.storage,
			this.data,
			__hi(select, this),
			this.stride,
			this.offset
		);
	}

	lo(select: NumericArray) {
		const { shape, offset } = __lo(select, this);
		return new Tensor2(
			this.type,
			this.storage,
			this.data,
			shape,
			this.stride,
			offset
		);
	}

	step(select: NumericArray) {
		const { shape, stride, offset } = __step(select, this);
		return new Tensor2(
			this.type,
			this.storage,
			this.data,
			shape,
			stride,
			offset
		);
	}

	pick(select: NumericArray) {
		const { shape, stride, offset } = __pick(select, this);
		return tensor(this.type, shape, {
			storage: this.storage,
			data: this.data,
			copy: false,
			stride,
			offset,
		});
	}

	pack(storage = this.storage) {
		return new Tensor2(
			this.type,
			storage,
			storage.from(this),
			this.shape.slice(),
			shapeToStride(this.shape)
		);
	}

	resize(newShape: number[], fill?: T, storage = this.storage) {
		const newLength = product(newShape);
		const newData = storage.alloc(newLength);
		if (fill !== undefined) (<any>newData).fill(fill); // FIXME type cast
		const {
			data,
			shape: [sx, sy],
			stride: [tx, ty],
		} = this;
		for (
			let i = this.offset, n = min(this.length, newLength), j = 0, x = 0;
			x < sx;
			x++, i += tx
		) {
			for (let y = 0; y < sy && j < n; y++, j++) {
				newData[j] = data[i + y * ty];
			}
		}
		return tensor(this.type, newShape, {
			storage,
			data: newData,
			copy: false,
		});
	}

	transpose([x, y]: NumericArray) {
		const s = this.shape;
		const t = this.stride;
		return new Tensor2(
			this.type,
			this.storage,
			this.data,
			[s[x], s[y]],
			[t[x], t[y]],
			this.offset
		);
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
		for (let i = this.offset, x = 0; x < sx; x++, i += tx) {
			for (let j = i, y = 0; y < sy; y++, j += ty) {
				for (let z = 0; z < sz; z++) {
					yield data[j + z * tz];
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

	get order() {
		return strideOrder(this.stride);
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

	copy() {
		return new Tensor3<T>(
			this.type,
			this.storage,
			this.data,
			this.shape.slice(),
			this.stride.slice(),
			this.offset
		);
	}

	empty(storage = this.storage) {
		return new Tensor3<T>(
			this.type,
			storage,
			storage.alloc(this.length),
			this.shape.slice(),
			shapeToStride(this.shape)
		);
	}

	hi(select: NumericArray) {
		return new Tensor3<T>(
			this.type,
			this.storage,
			this.data,
			__hi(select, this),
			this.stride,
			this.offset
		);
	}

	lo(select: NumericArray) {
		const { shape, offset } = __lo(select, this);
		return new Tensor3(
			this.type,
			this.storage,
			this.data,
			shape,
			this.stride,
			offset
		);
	}

	step(select: NumericArray) {
		const { shape, stride, offset } = __step(select, this);
		return new Tensor3(
			this.type,
			this.storage,
			this.data,
			shape,
			stride,
			offset
		);
	}

	pick(select: NumericArray) {
		const { shape, stride, offset } = __pick(select, this);
		return tensor(this.type, shape, {
			data: this.data,
			storage: this.storage,
			copy: false,
			stride,
			offset,
		});
	}

	pack(storage = this.storage) {
		return new Tensor3(
			this.type,
			storage,
			storage.from(this),
			this.shape.slice(),
			shapeToStride(this.shape)
		);
	}

	resize(newShape: number[], fill?: T, storage = this.storage) {
		const newLength = product(newShape);
		const newData = storage.alloc(newLength);
		if (fill !== undefined) (<any>newData).fill(fill); // FIXME type cast
		const {
			data,
			shape: [sx, sy, sz],
			stride: [tx, ty, tz],
		} = this;
		for (
			let i = this.offset, n = min(this.length, newLength), k = 0, x = 0;
			x < sx;
			x++, i += tx
		) {
			for (let j = i, y = 0; y < sy; y++, j += ty) {
				for (let z = 0; z < sz && k < n; z++, k++) {
					newData[k] = data[j + z * tz];
				}
			}
		}
		return tensor(this.type, newShape, {
			storage,
			data: newData,
			copy: false,
		});
	}

	transpose([x, y, z]: NumericArray) {
		const s = this.shape;
		const t = this.stride;
		return new Tensor3(
			this.type,
			this.storage,
			this.data,
			[s[x], s[y], s[z]],
			[t[x], t[y], t[z]],
			this.offset
		);
	}

	toString() {
		const res = [];
		for (let i = 0; i < this.shape[0]; i++) {
			res.push(`--- ${i}: ---`, this.pick([i]).toString());
		}
		return res.join("\n");
	}
}

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

/**
 * Creates a new {@link ITensor} instance for given data type, shape and
 * options.
 *
 * @remarks
 * Currently only 1D - 3D tensors are supported.
 *
 * @param type
 * @param shape
 * @param opts
 */
export const tensor = <T = number>(
	type: Type,
	shape: number[],
	opts?: TensorOpts<T>
): ITensor<T> => {
	const storage = opts?.storage ?? STORAGE[type];
	const stride = opts?.stride ?? shapeToStride(shape);
	let data: TensorData<T>;
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
	switch (shape.length) {
		case 0:
			return new Tensor1(type, storage, data, [1], [1], offset);
		case 1:
			return new Tensor1(type, storage, data, shape, stride, offset);
		case 2:
			return new Tensor2(type, storage, data, shape, stride, offset);
		case 3:
			return new Tensor3(type, storage, data, shape, stride, offset);
		default:
			unsupported(`unsupported dimension: ${shape.length}`);
	}
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
