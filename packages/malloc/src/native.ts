// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import {
	typedArray,
	type Type,
	type TypedArray,
	type TypedArrayTypeMap,
} from "@thi.ng/api/typedarray";
import type { IMemPoolArray } from "./api.js";

/**
 * Stub/polyfill implementation of {@link IMemPoolArray}, merely delegating to
 * JS typed array ctors with no further management of returned arrays.
 */
export class NativePool implements IMemPoolArray {
	mallocAs<T extends Type>(
		type: T,
		num: number
	): Maybe<TypedArrayTypeMap[T]> {
		return typedArray(type, num);
	}

	callocAs<T extends Type>(
		type: T,
		num: number,
		fill = 0
	): Maybe<TypedArrayTypeMap[T]> {
		return <any>typedArray(type, num).fill(fill);
	}

	reallocArray<T extends TypedArray>(src: T, num: number): Maybe<T> {
		if (num === src.length) return src;
		const dest = new (<any>src.constructor)(num);
		dest.set(src.subarray(0, Math.min(src.length, num)));
		return dest;
	}

	free(_: number | TypedArray) {
		return true;
	}

	freeAll() {}

	release() {
		return true;
	}
}
