import type { Mat } from "./api";
import { scale22, scale23, scale33, scale44 } from "./scale";

export const mat22n = (out: Mat | null, n: number) => scale22(out, n);

export const mat23n = (out: Mat | null, n: number) => scale23(out, n);

export const mat33n = (out: Mat | null, n: number) => scale33(out, n);

export const mat44n = (out: Mat | null, n: number) => (
    (out = scale44(out, n)), (out[15] = n), out
);
