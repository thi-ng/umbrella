import type { MultiVecOpV } from "./api.js";
import { asin as $asin } from "@thi.ng/vec-nd/asin";
import { asin2 } from "@thi.ng/vec2/asin";
import { asin3 } from "@thi.ng/vec3/asin";
import { asin4 } from "@thi.ng/vec4/asin";
import { vop } from "./vop.js";

/**
 * Componentwise computes `Math.asin` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin: MultiVecOpV = vop(1);
asin.default($asin)
asin.add(2, asin2);
asin.add(3, asin3);
asin.add(4, asin4);