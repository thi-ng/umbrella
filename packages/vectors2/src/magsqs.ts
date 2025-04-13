// SPDX-License-Identifier: Apache-2.0
import type { VecOpSGRoV, VecOpSRoV } from "./api.js";
import { dotS, dotS2, dotS3, dotS4 } from "./dots.js";

export const magSqS: VecOpSGRoV<number> = (a, num, ia, sa) =>
	dotS(a, a, num, ia, ia, sa, sa);

export const magSqS2: VecOpSRoV<number> = (a, ia, sa) =>
	dotS2(a, a, ia, ia, sa, sa);

export const magSqS3: VecOpSRoV<number> = (a, ia, sa) =>
	dotS3(a, a, ia, ia, sa, sa);

export const magSqS4: VecOpSRoV<number> = (a, ia, sa) =>
	dotS4(a, a, ia, ia, sa, sa);
