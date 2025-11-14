// SPDX-License-Identifier: Apache-2.0
export const isPromise = <T = any>(x: any): x is Promise<T> =>
	x instanceof Promise;
