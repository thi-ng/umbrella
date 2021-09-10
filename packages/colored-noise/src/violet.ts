import type { INorm } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { red } from "./red";
import { interleave } from "./utils";

/**
 * Band-stop filtered noise (interleaved red noise). Opposite of {@link green}.
 *
 * @param n
 * @param scale
 * @param rnd
 */
export const violet = (n = 2, scale = 1, rnd: INorm = SYSTEM) =>
    interleave(red(n, scale, rnd), red(n, scale, rnd));
