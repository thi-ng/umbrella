import type { VecOpSRoV } from "./api";
import { dotS2, dotS3, dotS4 } from "./dots";

export const magS2: VecOpSRoV<number> = (a, ia, sa) =>
    Math.sqrt(dotS2(a, a, ia, ia, sa, sa));

export const magS3: VecOpSRoV<number> = (a, ia, sa) =>
    Math.sqrt(dotS3(a, a, ia, ia, sa, sa));

export const magS4: VecOpSRoV<number> = (a, ia, sa) =>
    Math.sqrt(dotS4(a, a, ia, ia, sa, sa));
