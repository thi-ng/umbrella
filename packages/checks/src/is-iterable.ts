// SPDX-License-Identifier: Apache-2.0
export const isIterable = <T = any>(x: any): x is Iterable<T> =>
	typeof x?.[Symbol.iterator] === "function";
