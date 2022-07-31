import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { setC4 } from "@thi.ng/vectors/setc";

export const conjugateQ = (out: Vec | null, a: ReadonlyVec) =>
	setC4(out || a, -a[0], -a[1], -a[2], a[3]);
