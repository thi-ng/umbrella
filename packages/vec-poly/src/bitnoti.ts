import type { MultiVecOpV } from "./api.js";
import { bitNotI as $bitNotI } from "@thi.ng/vec-nd/bitnoti";
import { bitNotI2 } from "@thi.ng/vec2/bitnoti";
import { bitNotI3 } from "@thi.ng/vec3/bitnoti";
import { bitNotI4 } from "@thi.ng/vec4/bitnoti";
import { vop } from "./vop.js";

/**
 * Componentwise binary NOT of given nD signed integer vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const bitNotI: MultiVecOpV = vop(1);
bitNotI.default($bitNotI)
bitNotI.add(2, bitNotI2);
bitNotI.add(3, bitNotI3);
bitNotI.add(4, bitNotI4);