import { implementsFunction } from "@thi.ng/checks/implements-function";
import { EPS } from "@thi.ng/math/api";
import { eqDeltaS } from "@thi.ng/vec-api/eqdelta";
import type { VecOpRoVVO } from "@thi.ng/vec-api";

/**
 * Returns true if if given nD vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance.
 */
export const eqDelta: VecOpRoVVO<boolean, number> = (v1, v2, eps = EPS) => {
  if (implementsFunction(v1, "eqDelta"))
    return v1.eqDelta(v2, eps);
  if (implementsFunction(v2, "eqDelta"))
    return v2.eqDelta(v1, eps);
  return eqDeltaS(v1, v2, v1.length, eps);
};