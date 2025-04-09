import type { MultiVecOpVVV } from "./api.js";
import { madd as $madd } from "@thi.ng/vec-nd/madd";
import { madd2 } from "@thi.ng/vec2/madd";
import { madd3 } from "@thi.ng/vec3/madd";
import { madd4 } from "@thi.ng/vec4/madd";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector multiply-add.
 * `o = a * b + c`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd: MultiVecOpVVV = vop(1);
madd.default($madd)
madd.add(2, madd2);
madd.add(3, madd3);
madd.add(4, madd4);