import type { MultiVecOpVVVVNN } from "./api.js";
import { mixBilinear as $mixBilinear } from "@thi.ng/vec-nd/mix-bilinear";
import { mixBilinear2 } from "@thi.ng/vec2/mix-bilinear";
import { mixBilinear3 } from "@thi.ng/vec3/mix-bilinear";
import { mixBilinear4 } from "@thi.ng/vec4/mix-bilinear";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector bilinear interpolation.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - lower-left boundary
 * @param c - lower-right boundary
 * @param d - upper-left boundary
 * @param e - upper-right boundary
 * @param u - 1st interpolation factor in U direction (along `[b,c]` and `[d,e]`)
 * @param v - 2nd interpolation factor in V direction
 */
export const mixBilinear: MultiVecOpVVVVNN = vop(1);
mixBilinear.default($mixBilinear)
mixBilinear.add(2, mixBilinear2);
mixBilinear.add(3, mixBilinear3);
mixBilinear.add(4, mixBilinear4);