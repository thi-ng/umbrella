import { max4id } from "@thi.ng/math/interval";
import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of major component/axis in `v`, i.e. where `|v[i]|` is the
 * largest.
 */
export const major4: VecOpRoV<number> = (a) => max4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3]));