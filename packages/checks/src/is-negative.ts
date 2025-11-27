// SPDX-License-Identifier: Apache-2.0
export const isNegative = (x: any): x is number =>
	typeof x === "number" && x < 0;

export const isNegativeInt = (x: any): x is number =>
	Number.isInteger(x) && x < 0;

export const isNonPositiveInt = (x: any): x is number =>
	Number.isInteger(x) && x <= 0;
