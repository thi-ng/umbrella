import { min4id } from "@thi.ng/math/interval";
import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of minor component/axis in given 4D vector, i.e. where
 * `|v[i]|` is the smallest.
 */
export const minor4: VecOpRoV<number> = (a) => min4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3]));