import type { INorm } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { blue } from "./blue";
import { interleave } from "./utils";

/**
 * Band-pass filtered noise (interleaved blue noise). Opposite of
 * {@link violet}.
 *
 * @param n
 * @param scale
 * @param rnd
 */
export const green = (n = 2, scale = 1, rnd: INorm = SYSTEM) =>
    interleave(blue(n, scale, rnd), blue(n, scale, rnd));
