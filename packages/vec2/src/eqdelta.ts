import { EPS as _eps } from "@thi.ng/math/api";
import { eqDelta as eq } from "@thi.ng/math/eqdelta";
import type { VecOpRoVVO } from "@thi.ng/vec-api";

/**
 * Returns true if if given 2D vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance.
 */
export const eqDelta2: VecOpRoVVO<boolean, number> = (a,b,eps=_eps)=>{return a.length === b.length && eq(a[0],b[0],eps)&&eq(a[1],b[1],eps);};