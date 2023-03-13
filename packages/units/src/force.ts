import { M_S2 } from "./accel.js";
import { KG } from "./mass.js";
import { defUnit, mul } from "./unit.js";

export const N = defUnit("N", "newton", mul(KG, M_S2, true));
