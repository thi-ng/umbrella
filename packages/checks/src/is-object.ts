// SPDX-License-Identifier: Apache-2.0
export const isObject = (x: any): x is Object =>
	x != null && typeof x === "object";
