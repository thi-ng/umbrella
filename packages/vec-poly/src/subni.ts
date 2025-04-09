import type { MultiVecOpVN } from "./api.js";
import { subNI as $subNI } from "@thi.ng/vec-nd/subni";
import { subNI2 } from "@thi.ng/vec2/subni";
import { subNI3 } from "@thi.ng/vec3/subni";
import { subNI4 } from "@thi.ng/vec4/subni";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector subtraction with uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNI: MultiVecOpVN = vop(1);
subNI.default($subNI)
subNI.add(2, subNI2);
subNI.add(3, subNI3);
subNI.add(4, subNI4);