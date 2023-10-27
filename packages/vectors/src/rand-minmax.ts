import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { MultiVecOpOOO, ReadonlyVec, VecOpOOO } from "./api.js";
import { defHofOp } from "./compile/emit.js";

/**
 * Sets `out` to random vector with each component in the semi-open
 * interval defined by [min,max).
 *
 * @param out -
 * @param min -
 * @param max -
 * @param rnd -
 */
export const [randMinMax, randMinMax2, randMinMax3, randMinMax4] = defHofOp<
	MultiVecOpOOO<ReadonlyVec, ReadonlyVec, IRandom>,
	VecOpOOO<ReadonlyVec, ReadonlyVec, IRandom>
>(
	SYSTEM,
	([o, a, b]) => `${o}=rnd.minmax(${a},${b});`,
	"o,a,b,rnd=op",
	"o,a,b"
);
