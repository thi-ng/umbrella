import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { MultiVecOpOOO, VecOpOOO } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { NEW_OUT_A } from "./compile/templates.js";

/**
 * Sets `v` to random vector, with each component in interval `[n..m)`. If no
 * `rnd` instance is given, uses [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html), i.e.
 * `Math.random`. Creates new vector if `v` is null.
 *
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is given
 * and initialized to the desired size/length.
 *
 * @param v -
 * @param n - default -1
 * @param m - default 1
 * @param rnd -
 */
export const [random, random2, random3, random4] = defHofOp<
	MultiVecOpOOO<number, number, IRandom>,
	VecOpOOO<number, number, IRandom>
>(
	SYSTEM,
	([a]) => `${a}=rnd.minmax(n,m);`,
	"a,n=-1,m=1,rnd=op",
	"a",
	"a",
	0,
	NEW_OUT_A
);
