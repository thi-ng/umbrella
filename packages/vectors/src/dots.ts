// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, VecOpSRoVV } from "./api.js";

export const dotS = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	n: number,
	ia = 0,
	ib = 0,
	sa = 1,
	sb = 1
) => {
	let sum = 0;
	while (n-- > 0) sum += a[ia + n * sa] * b[ib + n * sb];
	return sum;
};

export const dotS2: VecOpSRoVV<number> = (
	a,
	b,
	io = 0,
	ib = 0,
	sa = 1,
	sb = 1
) => a[io] * b[ib] + a[io + sa] * b[ib + sb];

export const dotS3: VecOpSRoVV<number> = (
	a,
	b,
	ia = 0,
	ib = 0,
	sa = 1,
	sb = 1
) => a[ia] * b[ib] + a[ia + sa] * b[ib + sb] + a[ia + 2 * sa] * b[ib + 2 * sb];

export const dotS4: VecOpSRoVV<number> = (
	a,
	b,
	ia = 0,
	ib = 0,
	sa = 1,
	sb = 1
) =>
	a[ia] * b[ib] +
	a[ia + sa] * b[ib + sb] +
	a[ia + 2 * sa] * b[ib + 2 * sb] +
	a[ia + 3 * sa] * b[ib + 3 * sb];
