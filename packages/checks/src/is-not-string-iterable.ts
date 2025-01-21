// SPDX-License-Identifier: Apache-2.0
export const isNotStringAndIterable = <T = any>(x: any): x is Iterable<T> =>
	x != null &&
	typeof x !== "string" &&
	typeof x[Symbol.iterator] === "function";
