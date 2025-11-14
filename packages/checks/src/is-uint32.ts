// SPDX-License-Identifier: Apache-2.0
export const isUint32 = (x: any): x is number =>
	typeof x === "number" && x >>> 0 === x;
