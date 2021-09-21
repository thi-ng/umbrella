import { add } from "@thi.ng/transducers/add";
import { reduce } from "@thi.ng/transducers/reduce";
import type { MultiVecOpRoV } from "./api";
import { vop } from "./vop";

/**
 * Returns component sum of vector `v`.
 *
 * @param v -
 */
export const sum: MultiVecOpRoV<number> = vop();

sum.default((v) => reduce(add(), v));

export const sum2 = sum.add(2, (a) => a[0] + a[1]);
export const sum3 = sum.add(3, (a) => a[0] + a[1] + a[2]);
export const sum4 = sum.add(4, (a) => a[0] + a[1] + a[2] + a[3]);
