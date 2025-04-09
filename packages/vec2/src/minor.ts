import { min2id } from "@thi.ng/math/interval";
import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of minor component/axis in given 2D vector, i.e. where
 * `|v[i]|` is the smallest.
 */
export const minor2: VecOpRoV<number> = (a) => min2id(abs(a[0]), abs(a[1]));