import type { ReadonlyVec, Vec } from "./api.js";
import { maddN } from "./maddn.js";
import { mulN } from "./muln.js";

export const addW2 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	wa: number,
	wb: number
) => (!out && (out = a), maddN(out, b, wb, mulN(out, a, wa)));

export const addW3 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	wa: number,
	wb: number,
	wc: number
) => (
	!out && (out = a), maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa)))
);

export const addW4 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	d: ReadonlyVec,
	wa: number,
	wb: number,
	wc: number,
	wd: number
) => (
	!out && (out = a),
	maddN(out, d, wd, maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa))))
);

export const addW5 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	d: ReadonlyVec,
	e: ReadonlyVec,
	wa: number,
	wb: number,
	wc: number,
	wd: number,
	we: number
) => (
	!out && (out = a),
	maddN(
		out,
		e,
		we,
		maddN(
			out,
			d,
			wd,
			maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa)))
		)
	)
);
