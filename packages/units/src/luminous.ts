import { SR } from "./angle.js";
import { M2 } from "./area.js";
import { defUnit, div, mul, unit } from "./unit.js";

export const CD = defUnit("cd", "candela", unit(6, 1, 0, true));

export const LM = defUnit("lm", "lumen", mul(CD, SR));
export const LX = defUnit("lx", "lux", div(LM, M2));
