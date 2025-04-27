import type { Nullable, NumericArray } from "@thi.ng/api";
import { swizzle } from "@thi.ng/arrays/swizzle";
import { equiv, equivArrayLike } from "@thi.ng/equiv";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupported } from "@thi.ng/errors/unsupported";
import { dot, dot2, dot3 } from "@thi.ng/vectors/dot";
import { eqDeltaS as _eqDelta } from "@thi.ng/vectors/eqdelta";
import { product, product2, product3 } from "@thi.ng/vectors/product";
import type { ITensor, Tensor } from "./api.js";
import { format } from "./format.js";

const { abs, ceil, min } = Math;

export abstract class ATensor<T = number> implements ITensor<T> {
	constructor(
		public data: Tensor<T>,
		public shape: number[],
		public stride: number[],
		public offset = 0
	) {}

	abstract get dim(): number;

	abstract get order(): number[];

	abstract get length(): number;

	abstract [Symbol.iterator](): IterableIterator<T>;

	abstract index(pos: NumericArray): number;

	abstract copy(): ITensor<T>;

	abstract empty(): ITensor<T>;

	get orderedShape(): number[] {
		return swizzle(this.order)(this.shape);
	}

	get orderedStride(): number[] {
		return swizzle(this.order)(this.stride);
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

	get(pos: NumericArray) {
		return this.data[this.offset + dot(pos, this.stride)];
	}

	set(pos: NumericArray, v: T) {
		this.data[this.offset + dot(pos, this.stride)] = v;
		return this;
	}

	abstract lo(pos: NumericArray | Nullable<number>[]): ITensor<T>;

	abstract hi(pos: NumericArray | Nullable<number>[]): ITensor<T>;

	abstract step(pos: NumericArray): ITensor<T>;

	abstract pick(pos: NumericArray): ITensor<T>;

	abstract pack(): ITensor<T>;

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
			this.data,
			[this.shape[0]],
			[this.stride[0]],
			this.offset
		);
	}

	empty() {
		const n = this.shape[0];
		return new Tensor1<T>(new Array(n), [n], [1]);
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

	hi([x]: NumericArray) {
		return new Tensor1<T>(
			this.data,
			[x != null && x >= 0 ? x : this.shape[0]],
			this.stride,
			this.offset
		);
	}

	lo([x]: NumericArray) {
		let { shape: s, stride: t, offset: o } = this;
		return new Tensor1(
			this.data,
			[x != null && x >= 0 ? ((o += t[0] * x), s[0] - x) : s[0]],
			t,
			o
		);
	}

	step([x]: NumericArray) {
		const s = this.shape.slice();
		const t = this.stride.slice();
		return new Tensor1(this.data, s, t, step(x, 0, s, t, this.offset));
	}

	pick([x]: NumericArray) {
		assert(x >= 0 && x < this.length);
		return new Tensor1(
			this.data,
			[1],
			[1],
			this.offset + x * this.stride[0]
		);
	}

	pack() {
		return new Tensor1([...this], [this.shape[0]], [1]);
	}

	resize(newShape: number[], fill?: T) {
		const newLength = product(newShape);
		const newData = new Array<T>(newLength);
		if (fill !== undefined) newData.fill(fill);
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
		return tensor(newData, newShape);
	}

	transpose() {
		return this.copy();
	}

	toJSON() {
		return {
			buf: [...this],
			shape: this.shape,
			stride: [1],
		};
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
			this.data,
			this.shape.slice(),
			this.stride.slice(),
			this.offset
		);
	}

	empty() {
		return new Tensor2<T>(
			new Array(this.length),
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

	hi([x, y]: NumericArray | Nullable<number>[]) {
		const s = this.shape;
		return new Tensor2<T>(
			this.data,
			[x != null && x >= 0 ? x : s[0], y != null && y >= 0 ? y : s[1]],
			this.stride,
			this.offset
		);
	}

	lo([x, y]: NumericArray | Nullable<number>[]) {
		let { shape: s, stride: t, offset: o } = this;
		return new Tensor2(
			this.data,
			[
				x != null && x >= 0 ? ((o += t[0] * x), s[0] - x) : s[0],
				y != null && y >= 0 ? ((o += t[1] * y), s[1] - y) : s[1],
			],
			t,
			o
		);
	}

	step([x, y]: NumericArray | Nullable<number>[]) {
		const s = this.shape.slice();
		const t = this.stride.slice();
		return new Tensor2(
			this.data,
			s,
			t,
			step(y, 1, s, t, step(x, 0, s, t, this.offset))
		);
	}

	pick([x, y]: NumericArray | Nullable<number>[]) {
		const s: number[] = [];
		const t: number[] = [];
		return tensor(
			this.data,
			s,
			t,
			pick(
				y,
				1,
				s,
				t,
				this.shape,
				this.stride,
				pick(x, 0, s, t, this.shape, this.stride, this.offset)
			)
		);
	}

	pack() {
		return new Tensor2(
			[...this],
			this.shape.slice(),
			shapeToStride(this.shape)
		);
	}

	resize(newShape: number[], fill?: T) {
		const newLength = product(newShape);
		const newData = new Array<T>(newLength);
		if (fill !== undefined) newData.fill(fill);
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
		return tensor(newData, newShape);
	}

	transpose([x, y]: NumericArray) {
		const s = this.shape;
		const t = this.stride;
		return new Tensor2(this.data, [s[x], s[y]], [t[x], t[y]], this.offset);
	}

	toJSON() {
		return {
			buf: [...this],
			shape: this.shape,
			stride: shapeToStride(this.shape),
		};
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
			this.data,
			this.shape.slice(),
			this.stride.slice(),
			this.offset
		);
	}

	empty() {
		return new Tensor3<T>(
			new Array(this.length),
			this.shape.slice(),
			shapeToStride(this.shape)
		);
	}

	hi([x, y, z]: NumericArray | Nullable<number>[]) {
		const s = this.shape;
		return new Tensor3<T>(
			this.data,
			[
				x != null && x >= 0 ? x : s[0],
				y != null && y >= 0 ? y : s[1],
				z != null && z >= 0 ? z : s[2],
			],
			this.stride,
			this.offset
		);
	}

	lo([x, y, z]: NumericArray | Nullable<number>[]) {
		let { shape: s, stride: t, offset: o } = this;
		return new Tensor3(
			this.data,
			[
				x != null && x >= 0 ? ((o += t[0] * x), s[0] - x) : s[0],
				y != null && y >= 0 ? ((o += t[1] * y), s[1] - y) : s[1],
				z != null && z >= 0 ? ((o += t[2] * z), s[2] - z) : s[2],
			],
			t,
			o
		);
	}

	step([x, y, z]: NumericArray | Nullable<number>[]) {
		const s = this.shape.slice();
		const t = this.stride.slice();
		return new Tensor3(
			this.data,
			s,
			t,
			step(z, 2, s, t, step(y, 1, s, t, step(x, 0, s, t, this.offset)))
		);
	}

	pick([x, y, z]: NumericArray | Nullable<number>[]) {
		const s: number[] = [];
		const t: number[] = [];
		const ss = this.shape;
		const st = this.stride;
		return tensor(
			this.data,
			s,
			t,
			pick(
				z,
				2,
				s,
				t,
				ss,
				st,
				pick(y, 1, s, t, ss, st, pick(x, 0, s, t, ss, st, this.offset))
			)
		);
	}

	pack() {
		return new Tensor3(
			[...this],
			this.shape.slice(),
			shapeToStride(this.shape)
		);
	}

	resize(newShape: number[], fill?: T) {
		const newLength = product(newShape);
		const newData = new Array(newLength);
		if (fill !== undefined) newData.fill(fill);
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
		return tensor(newData, newShape);
	}

	transpose([x, y, z]: NumericArray) {
		const s = this.shape;
		const t = this.stride;
		return new Tensor3(
			this.data,
			[s[x], s[y], s[z]],
			[t[x], t[y], t[z]],
			this.offset
		);
	}

	toJSON() {
		return {
			buf: [...this],
			shape: this.shape,
			stride: shapeToStride(this.shape),
		};
	}

	toString() {
		const res = [];
		for (let i = 0; i < this.shape[0]; i++) {
			res.push(`--- ${i}: ---`, this.pick([i]).toString());
		}
		return res.join("\n");
	}
}

export const tensor = <T = number>(
	buf?: Tensor<T>,
	shape?: number[],
	strides?: number[],
	offset?: number
): ITensor<T> => {
	if (!(buf || shape)) {
		illegalArgs("data or shape must be provided");
	}
	buf = buf || new Array(product(shape!)).fill(0);
	!shape && (shape = [buf.length]);
	!strides && (strides = shapeToStride(shape));
	if (offset === undefined) {
		offset = 0;
		for (let i = 0; i < shape.length; i++) {
			if (strides[i] < 0) {
				offset -= (shape[i] - 1) * strides[i];
			}
		}
	}
	switch (shape.length) {
		case 0:
			return new Tensor1(buf, [1], [1], offset);
		case 1:
			return new Tensor1(buf, shape, strides, offset);
		case 2:
			return new Tensor2(buf, shape, strides, offset);
		case 3:
			return new Tensor3(buf, shape, strides, offset);
		default:
			unsupported(`unsupported dimension: ${shape.length}`);
	}
};

export function* iterator<T>(buf: Tensor<T>, n: number, i = 0, s = 1) {
	for (; n > 0; n--, i += s) {
		yield buf[i];
	}
}

export const shapeToStride = (shape: number[]) => {
	const n = shape.length;
	const stride = new Array(n);
	for (let i = n, s = 1; --i >= 0; s *= shape[i]) {
		stride[i] = s;
	}
	return stride;
};

export const strideOrder = (strides: number[]) =>
	strides
		.map((x, i) => [x, i])
		.sort((a, b) => abs(b[0]) - abs(a[0]))
		.map((x) => x[1]);

const step = (
	x: Nullable<number>,
	i: number,
	shape: number[],
	strides: number[],
	o: number
) => {
	if (x) {
		if (x < 0) {
			o += strides[i] * (shape[i] - 1);
			shape[i] = ceil(-shape[i] / x);
		} else {
			shape[i] = ceil(shape[i] / x);
		}
		strides[i] *= x;
	}
	return o;
};

const pick = (
	x: Nullable<number>,
	i: number,
	ds: number[],
	dt: number[],
	ss: number[],
	st: number[],
	o: number
) => {
	if (x != null && x >= 0) {
		o += st[i] * x;
	} else {
		ds.push(ss[i]);
		dt.push(st[i]);
	}
	return o;
};
