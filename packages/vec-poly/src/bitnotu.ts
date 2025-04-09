import type { MultiVecOpV } from "./api.js";
import { bitNotU as $bitNotU } from "@thi.ng/vec-nd/bitnotu";
import { bitNotU2 } from "@thi.ng/vec2/bitnotu";
import { bitNotU3 } from "@thi.ng/vec3/bitnotu";
import { bitNotU4 } from "@thi.ng/vec4/bitnotu";
import { vop } from "./vop.js";

/**
 * Componentwise binary NOT of given nD unsigned integer vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const bitNotU: MultiVecOpV = vop(1);
bitNotU.default($bitNotU)
bitNotU.add(2, bitNotU2);
bitNotU.add(3, bitNotU3);
bitNotU.add(4, bitNotU4);