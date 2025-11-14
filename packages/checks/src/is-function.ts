// SPDX-License-Identifier: Apache-2.0
export const isFunction = <T extends Function>(x: any): x is T =>
	typeof x === "function";
