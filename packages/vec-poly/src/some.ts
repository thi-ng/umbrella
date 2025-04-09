import type { MultiBVecOpRoV } from "./api.js";
import { some as $some } from "@thi.ng/vec-nd/some";
import { some2 } from "@thi.ng/vec2/some";
import { some3 } from "@thi.ng/vec3/some";
import { some4 } from "@thi.ng/vec4/some";
import { vop } from "./vop.js";

/**
 * Returns true if at least one vector component is truthy.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const some: MultiBVecOpRoV<boolean> = vop(1);
some.default($some)
some.add(2, some2);
some.add(3, some3);
some.add(4, some4);