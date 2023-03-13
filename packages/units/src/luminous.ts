import { sr } from "./angle.js";
import { m2 } from "./area.js";
import { defUnit, div, mul, unit } from "./unit.js";

export const cd = defUnit("cd", "candela", unit(6, 1, 0, true));

export const lm = defUnit("lm", "lumen", mul(cd, sr));
export const lx = defUnit("lx", "lux", div(lm, m2));
