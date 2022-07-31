import type { ReadonlyVec, Vec } from "./api.js";
import { setCS3 } from "./setcs.js";

export const crossS2 = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	ia = 0,
	ib = 0,
	sa = 1,
	sb = 1
) => a[ia] * b[ib + sb] - a[ia + sa] * b[ib];

export const crossS3 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	io = 0,
	ia = 0,
	ib = 0,
	so = 1,
	sa = 1,
	sb = 1
) =>
	setCS3(
		out || a,
		a[ia + sa] * b[ib + 2 * sb] - a[ia + 2 * sa] * b[ib + sb],
		a[ia + 2 * sa] * b[ib] - a[ia] * b[ib + 2 * sb],
		a[ia] * b[ib + sb] - a[ia + sa] * b[ib],
		io,
		so
	);
