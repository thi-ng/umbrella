import { EPS as _eps } from "@thi.ng/math/api";
import { eqDelta as eq } from "@thi.ng/math/eqdelta";
import type { VecOpRoVVO } from "@thi.ng/vec-api";

/**
 * Returns true if if given 4D vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance.
 */
export const eqDelta4: VecOpRoVVO<boolean, number> = (a,b,eps=_eps)=>{return a.length === b.length && eq(a[0],b[0],eps)&&eq(a[1],b[1],eps)&&eq(a[2],b[2],eps)&&eq(a[3],b[3],eps);};