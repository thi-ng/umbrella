import { IRandom } from "@thi.ng/random/api";
import { SYSTEM } from "@thi.ng/random/system";
import { MultiVecOpOOO, Vec, VecOpOOO } from "./api";
import { defHofOp } from "./codegen";
import { normalize } from "./normalize";

export const [random, random2, random3, random4] =
    defHofOp<MultiVecOpOOO<number, number, IRandom>, VecOpOOO<number, number, IRandom>>(
        SYSTEM,
        ([a]) => `${a}=rnd.minmax(n,m);`,
        "a,n=-1,m=1,rnd=op",
        "a",
        "a",
        0
    );

export const randNorm = (v: Vec, n = 1, rnd: IRandom = SYSTEM) => {
    v = random(v, -1, 1, rnd);
    return normalize(v, v, n);
};
