import { IRandom } from "@thi.ng/random/api";
import { SYSTEM } from "@thi.ng/random/system";
import { MultiVecOpOOO, Vec, VecOpOOO } from "./api";
import { defHofOp } from "./internal/codegen";
import { normalize } from "./normalize";

/**
 * Sets `v` to random vector, with each component in interval `[n..m)`.
 * If no `rnd` instance is given, uses `SYSTEM`, i.e. `Math.random`.
 *
 * @param v
 * @param n default -1
 * @param m default 1
 * @param rnd
 */
export const [random, random2, random3, random4] =
    defHofOp<MultiVecOpOOO<number, number, IRandom>, VecOpOOO<number, number, IRandom>>(
        SYSTEM,
        ([a]) => `${a}=rnd.minmax(n,m);`,
        "a,n=-1,m=1,rnd=op",
        "a",
        "a",
        0,
        ""
    );

/**
 * Sets `v` to random vector, normalized to length `n` (default: 1). If no
 * `rnd` instance is given, uses `SYSTEM`, i.e. `Math.random`.
 *
 * @param v
 * @param n
 * @param rnd
 */
export const randNorm =
    (v: Vec, n = 1, rnd: IRandom = SYSTEM) => {
        v = random(v, -1, 1, rnd);
        return normalize(v, v, n);
    };
