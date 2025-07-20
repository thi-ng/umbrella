// SPDX-License-Identifier: Apache-2.0
import type { NumericArray, StringOrSym } from "@thi.ng/api";
import { EPS } from "@thi.ng/math/api";
import { memoizeO } from "@thi.ng/memoize/memoizeo";
import type { IVector } from "./api.js";
import { eqDeltaS } from "./eqdelta.js";
import { stridedValues } from "./iterator.js";
import { zeroes } from "./setn.js";
import { setS } from "./sets.js";
import { FORMATTER } from "./string.js";

const SYM_B = "buf";
const SYM_L = "length";
const SYM_O = "offset";
const SYM_S = "stride";
const SYM_C = "copy";
const SYM_CV = "copyView";
const SYM_EMPTY = "empty";
const SYM_EQD = "eqDelta";
const SYM_STR = "toString";

/** @internal */
const PROPS = new Set<StringOrSym>([
	SYM_B,
	SYM_C,
	SYM_CV,
	SYM_EMPTY,
	SYM_EQD,
	SYM_L,
	SYM_O,
	SYM_S,
	SYM_STR,
	Symbol.iterator,
]);

/** @internal */
const __keys = memoizeO<number, StringOrSym[]>((size: number) => {
	const keys: StringOrSym[] = [];
	for (let i = 0; i < size; i++) keys.push(String(i));
	keys.push(...PROPS);
	return keys;
});

/**
 * Wrapper for strided, arbitrary length vectors.
 *
 * @remarks
 * Wraps given buffer in ES6 `Proxy` with custom property getters/setters and
 * implements the following interfaces:
 *
 * - `Iterable` (ES6)
 * - [`ICopy`](https://docs.thi.ng/umbrella/api/interfaces/ICopy.html)
 * - [`IEmpty`](https://docs.thi.ng/umbrella/api/interfaces/IEmpty.html)
 * - [`IEqualsDelta`](https://docs.thi.ng/umbrella/api/interfaces/IEqualsDelta.html)
 * - {@link IVector}
 * - `Object.toString()`
 *
 * Read/write access for the following properties:
 *
 * - array indices in the `[0,size)` interval
 * - `offset` - start index
 * - `stride` - component stride
 * - `buf` - backing buffer (readonly)
 * - `length` - vector size
 *
 * Array index access uses bounds checking against the `[0,size)` interval, but,
 * for performance reasons, **not** against the actual wrapped buffer.
 *
 * Note: ES6 proxies are ~10x slower than standard array accesses. If several
 * computations are to be performed on such vectors it will be much more
 * efficient to first copy them to compact arrays and then copy result back if
 * needed.
 *
 * @example
 * ```ts tangle:../export/gvec.ts
 * import { gvec, add, copy, eqDelta } from "@thi.ng/vectors";
 *
 * // 3D vector w/ component stride length of 4
 * let a = gvec([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0], 3, 0, 4);
 *
 * console.log(a[0], a[1], a[2]);
 * // 1 2 3
 *
 * console.log(a.stride);
 * // 4
 *
 * console.log([...a]);
 * // [1, 2, 3]
 *
 * console.log(a.toString());
 * // "[1.000, 2.000, 3.000]"
 *
 * console.log(add([], a, a));
 * // [2, 4, 6]
 *
 * console.log(copy(a));
 * // [1, 2, 3]
 *
 * console.log(a.copyView().toString());
 * // [1.000, 2.000, 3.000]
 *
 * console.log(eqDelta(a, [1, 2, 3]));
 * // true
 * ```
 *
 * @param buf - backing buffer
 * @param size - vector size / num components
 * @param offset - start index
 * @param stride - component stride
 */
export const gvec = (
	buf: NumericArray,
	size: number,
	offset = 0,
	stride = 1
): IVector<any> => <any>new Proxy(buf, {
		get(obj, id) {
			switch (id) {
				case Symbol.iterator:
					return () => stridedValues(obj, size, offset, stride);
				case SYM_L:
					return size;
				case SYM_B:
					return buf;
				case SYM_O:
					return offset;
				case SYM_S:
					return stride;
				case SYM_C:
					return () => setS([], obj, size, 0, offset, 1, stride);
				case SYM_CV:
					return () => gvec(obj, size, offset, stride);
				case SYM_EMPTY:
					return () => zeroes(size);
				case SYM_EQD:
					return (o: any, eps: number = EPS) =>
						eqDeltaS(buf, o, size, eps, offset, 0, stride, 1);
				case SYM_STR:
					return () =>
						FORMATTER(stridedValues(obj, size, offset, stride));
				default:
					const j = parseInt(<string>id);
					return !isNaN(j) && j >= 0 && j < size
						? obj[offset + j * stride]
						: undefined;
			}
		},
		set(obj, id, value) {
			const j = parseInt(<string>id);
			if (!isNaN(j) && <any>j >= 0 && <any>j < size) {
				obj[offset + ((<any>id) | 0) * stride] = value;
			} else {
				switch (id) {
					case SYM_O:
						offset = value;
						break;
					case SYM_S:
						stride = value;
						break;
					case SYM_L:
						size = value;
						break;
					default:
						return false;
				}
			}
			return true;
		},
		has(_, id) {
			return (<any>id >= 0 && <any>id < size) || PROPS.has(id);
		},
		ownKeys() {
			return __keys(size);
		},
	});
