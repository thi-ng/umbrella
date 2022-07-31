import type { VecOpSGRoV, VecOpSRoV } from "./api.js";
import { dotS, dotS2, dotS3, dotS4 } from "./dots.js";

export const magS: VecOpSGRoV<number> = (a, num, ia, sa) =>
	Math.sqrt(dotS(a, a, num, ia, ia, sa, sa));

export const magS2: VecOpSRoV<number> = (a, ia, sa) =>
	Math.sqrt(dotS2(a, a, ia, ia, sa, sa));

export const magS3: VecOpSRoV<number> = (a, ia, sa) =>
	Math.sqrt(dotS3(a, a, ia, ia, sa, sa));

export const magS4: VecOpSRoV<number> = (a, ia, sa) =>
	Math.sqrt(dotS4(a, a, ia, ia, sa, sa));
