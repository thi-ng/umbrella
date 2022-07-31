import { cossin } from "@thi.ng/math/angle";
import { fit01 } from "@thi.ng/math/fit";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { mul2 } from "@thi.ng/vectors/mul";
import { rotateZ } from "@thi.ng/vectors/rotate";

export const pointAt = (
	pos: ReadonlyVec,
	r: ReadonlyVec,
	axis: number,
	start: number,
	end: number,
	t: number,
	out: Vec = []
) => pointAtTheta(pos, r, axis, fit01(t, start, end), out);

export const pointAtTheta = (
	pos: ReadonlyVec,
	r: ReadonlyVec,
	axis: number,
	theta: number,
	out: Vec = []
) => add2(null, rotateZ(null, mul2(out, cossin(theta), r), axis), pos);
