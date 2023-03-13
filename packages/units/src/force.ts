import { m_s2 } from "./accel.js";
import { kg } from "./mass.js";
import { defUnit, mul } from "./unit.js";

export const N = defUnit("N", "newton", mul(kg, m_s2, true));
