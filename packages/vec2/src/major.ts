import { max2id } from "@thi.ng/math/interval";
import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of major component/axis in `v`, i.e. where `|v[i]|` is the
 * largest.
 */
export const major2: VecOpRoV<number> = (a) => max2id(abs(a[0]), abs(a[1]));