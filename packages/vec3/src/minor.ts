import { min3id } from "@thi.ng/math/interval";
import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of minor component/axis in given 3D vector, i.e. where
 * `|v[i]|` is the smallest.
 */
export const minor3: VecOpRoV<number> = (a) => min3id(abs(a[0]), abs(a[1]), abs(a[2]));