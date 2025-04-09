import { max3id } from "@thi.ng/math/interval";
import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of major component/axis in `v`, i.e. where `|v[i]|` is the
 * largest.
 */
export const major3: VecOpRoV<number> = (a) => max3id(abs(a[0]), abs(a[1]), abs(a[2]));