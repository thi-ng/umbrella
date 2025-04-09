import type { MultiVecOpVVN } from "./api.js";
import { mixN as $mixN } from "@thi.ng/vec-nd/mixn";
import { mixN2 } from "@thi.ng/vec2/mixn";
import { mixN3 } from "@thi.ng/vec3/mixn";
import { mixN4 } from "@thi.ng/vec4/mixn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector linear interpolation with a uniform scalar factor.
 * `o = a + (b - a) * n`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const mixN: MultiVecOpVVN = vop(1);
mixN.default($mixN)
mixN.add(2, mixN2);
mixN.add(3, mixN3);
mixN.add(4, mixN4);