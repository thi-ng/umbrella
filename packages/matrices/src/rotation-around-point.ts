import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Mat } from "./api.js";
import { concat } from "./concat.js";
import { rotation23 } from "./rotation.js";
import { translation23 } from "./translation.js";

export const rotationAroundPoint23 = (
	out: Mat | null,
	pos: ReadonlyVec,
	theta: number
): Mat =>
	concat(
		out,
		translation23([], pos),
		rotation23([], theta),
		translation23([], [-pos[0], -pos[1]])
	);
