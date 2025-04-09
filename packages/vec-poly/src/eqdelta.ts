import type { MultiVecOpRoVVO } from "./api.js";
import { eqDelta as $eqDelta } from "@thi.ng/vec-nd/eqdelta";
import { eqDelta2 } from "@thi.ng/vec2/eqdelta";
import { eqDelta3 } from "@thi.ng/vec3/eqdelta";
import { eqDelta4 } from "@thi.ng/vec4/eqdelta";
import { vop } from "./vop.js";

/**
 * Returns true if if given nD vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const eqDelta: MultiVecOpRoVVO<boolean, number> = vop(0);
eqDelta.default($eqDelta)
eqDelta.add(2, eqDelta2);
eqDelta.add(3, eqDelta3);
eqDelta.add(4, eqDelta4);