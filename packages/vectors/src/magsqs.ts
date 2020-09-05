import type { VecOpSRoV } from "./api";
import { dotS2, dotS3, dotS4 } from "./dots";

export const magSqS2: VecOpSRoV<number> = (a, ia, sa) =>
    dotS2(a, a, ia, ia, sa, sa);

export const magSqS3: VecOpSRoV<number> = (a, ia, sa) =>
    dotS3(a, a, ia, ia, sa, sa);

export const magSqS4: VecOpSRoV<number> = (a, ia, sa) =>
    dotS4(a, a, ia, ia, sa, sa);
