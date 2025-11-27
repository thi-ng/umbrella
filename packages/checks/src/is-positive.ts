// SPDX-License-Identifier: Apache-2.0
export const isPositive = (x: any): x is number =>
	typeof x === "number" && x > 0;

export const isPositiveInt = (x: any): x is number =>
	Number.isInteger(x) && x > 0;

export const isNonNegativeInt = (x: any): x is number =>
	Number.isInteger(x) && x >= 0;
