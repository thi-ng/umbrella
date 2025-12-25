// SPDX-License-Identifier: Apache-2.0
import type { NumericArray, TypedArray } from "@thi.ng/api";
import { F32, F64, I16, I32, I64, I8, U16, U32, U64, U8 } from "./buffers.js";

/**
 * JS native DataView-like functionality, but tailored for using `Uint8Array` or
 * vanilla JS numeric arrays (assuming the array contains U8 values). Use
 * {@link DATAVIEW} for default implementation.
 *
 * @remarks
 * The default byte ordering used for all accessors is Little Endian, but can be
 * overriden via `isLE` args.
 *
 * **IMPORTANT:** None of the operations perform any bounds checking.
 */
export interface IDataView {
	getI8(data: ArrayLike<number>, addr: number, isLE?: boolean): number;
	getU8(data: ArrayLike<number>, addr: number, isLE?: boolean): number;

	getI16(data: ArrayLike<number>, addr: number, isLE?: boolean): number;
	getU16(data: ArrayLike<number>, addr: number, isLE?: boolean): number;

	getI32(data: ArrayLike<number>, addr: number, isLE?: boolean): number;
	getU32(data: ArrayLike<number>, addr: number, isLE?: boolean): number;

	getU64(data: ArrayLike<number>, addr: number, isLE?: boolean): bigint;
	getI64(data: ArrayLike<number>, addr: number, isLE?: boolean): bigint;

	getF32(data: ArrayLike<number>, addr: number, isLE?: boolean): number;
	getF64(data: ArrayLike<number>, addr: number, isLE?: boolean): number;

	setI8(data: NumericArray, addr: number, val: number, isLE?: boolean): void;
	setU8(data: NumericArray, addr: number, val: number, isLE?: boolean): void;

	setI16(data: NumericArray, addr: number, val: number, isLE?: boolean): void;
	setU16(data: NumericArray, addr: number, val: number, isLE?: boolean): void;

	setI32(data: NumericArray, addr: number, val: number, isLE?: boolean): void;
	setU32(data: NumericArray, addr: number, val: number, isLE?: boolean): void;

	setI64(data: NumericArray, addr: number, val: bigint, isLE?: boolean): void;
	setU64(data: NumericArray, addr: number, val: bigint, isLE?: boolean): void;

	setF32(data: NumericArray, addr: number, val: number, isLE?: boolean): void;
	setF64(data: NumericArray, addr: number, val: number, isLE?: boolean): void;
}

/**
 * Indicator flag if current runtime/platform uses Little Endian byte order.
 */
export const IS_LE = ((U32[0] = 1), U8[0] === 1);

/**
 * {@link IDataView} implementation for Big Endian access.
 *
 * @remarks
 * **IMPORTANT:** None of the operations perform any bounds checking.
 */
export const DATAVIEW: IDataView = {
	getI8: (src, i) => ((I8[0] = src[i]), I8[0]),
	getU8: (src, i) => src[i] & 0xff,

	getI16: (src, i, isLE) => __get2(src, i, I16, isLE),
	getU16: (src, i, isLE) => __get2(src, i, U16, isLE),

	getI32: (src, i, isLE) => __get4(src, i, I32, isLE),
	getU32: (src, i, isLE) => __get4(src, i, U32, isLE) >>> 0,

	getI64: (src, i, isLE) => __get8<bigint>(src, i, I64, isLE),
	getU64: (src, i, isLE) => __get8<bigint>(src, i, U64, isLE),

	getF32: (src, i, isLE) => __get4(src, i, F32, isLE),
	getF64: (src, i, isLE) => __get8(src, i, F64, isLE),

	setI8: (data, addr, x) => {
		I8[0] = x;
		data[addr] = U8[0];
	},
	setU8: (data, addr, x) => {
		data[addr] = x & 0xff;
	},

	setI16: (data, addr, x, isLE) => {
		I16[0] = x;
		__set2(data, addr, isLE);
	},
	setU16: (data, addr, x, isLE) => {
		U16[0] = x;
		__set2(data, addr, isLE);
	},

	setI32: (data, addr, x, isLE) => {
		I32[0] = x;
		__set4(data, addr, isLE);
	},
	setU32: (data, addr, x, isLE) => {
		U32[0] = x;
		__set4(data, addr, isLE);
	},

	setF32: (data, addr, x, isLE) => {
		F32[0] = x;
		__set4(data, addr, isLE);
	},
	setF64: (data, addr, x, isLE) => {
		F64[0] = x;
		__set8(data, addr, isLE);
	},

	setI64: (data, addr, x, isLE) => {
		I64[0] = x;
		__set8(data, addr, isLE);
	},
	setU64: (data, addr, x, isLE) => {
		U64[0] = x;
		__set8(data, addr, isLE);
	},
};

const __get2 = (
	src: ArrayLike<number>,
	i: number,
	view: TypedArray,
	isLE = true
) =>
	isLE !== IS_LE
		? ((U8[1] = src[i]), (U8[0] = src[i + 1]), view[0])
		: ((U8[0] = src[i]), (U8[1] = src[i + 1]), view[0]);

const __get4 = (
	src: ArrayLike<number>,
	i: number,
	view: TypedArray,
	isLE = true
) =>
	isLE !== IS_LE
		? ((U8[3] = src[i]),
		  (U8[2] = src[i + 1]),
		  (U8[1] = src[i + 2]),
		  (U8[0] = src[i + 3]),
		  view[0])
		: ((U8[0] = src[i]),
		  (U8[1] = src[i + 1]),
		  (U8[2] = src[i + 2]),
		  (U8[3] = src[i + 3]),
		  view[0]);

const __get8 = <T = number>(
	src: ArrayLike<number>,
	i: number,
	view: ArrayLike<T>,
	isLE = true
): T =>
	isLE !== IS_LE
		? ((U8[7] = src[i]),
		  (U8[6] = src[i + 1]),
		  (U8[5] = src[i + 2]),
		  (U8[4] = src[i + 3]),
		  (U8[3] = src[i + 4]),
		  (U8[2] = src[i + 5]),
		  (U8[1] = src[i + 6]),
		  (U8[0] = src[i + 7]),
		  view[0])
		: ((U8[0] = src[i]),
		  (U8[1] = src[i + 1]),
		  (U8[2] = src[i + 2]),
		  (U8[3] = src[i + 3]),
		  (U8[4] = src[i + 4]),
		  (U8[5] = src[i + 5]),
		  (U8[6] = src[i + 6]),
		  (U8[7] = src[i + 7]),
		  view[0]);

const __set2 = (data: NumericArray, addr: number, isLE = true) => {
	if (isLE !== IS_LE) {
		data[addr] = U8[1];
		data[addr + 1] = U8[0];
	} else {
		data[addr] = U8[0];
		data[addr + 1] = U8[1];
	}
};

const __set4 = (data: NumericArray, addr: number, isLE = true) => {
	if (isLE !== IS_LE) {
		data[addr] = U8[3];
		data[addr + 1] = U8[2];
		data[addr + 2] = U8[1];
		data[addr + 3] = U8[0];
	} else {
		data[addr] = U8[0];
		data[addr + 1] = U8[1];
		data[addr + 2] = U8[2];
		data[addr + 3] = U8[3];
	}
};

const __set8 = (data: NumericArray, addr: number, isLE = true) => {
	if (isLE !== IS_LE) {
		data[addr] = U8[7];
		data[addr + 1] = U8[6];
		data[addr + 2] = U8[5];
		data[addr + 3] = U8[4];
		data[addr + 4] = U8[3];
		data[addr + 5] = U8[2];
		data[addr + 6] = U8[1];
		data[addr + 7] = U8[0];
	} else {
		data[addr] = U8[0];
		data[addr + 1] = U8[1];
		data[addr + 2] = U8[2];
		data[addr + 3] = U8[3];
		data[addr + 4] = U8[4];
		data[addr + 5] = U8[5];
		data[addr + 6] = U8[6];
		data[addr + 7] = U8[7];
	}
};
