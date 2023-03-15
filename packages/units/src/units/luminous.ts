import { sr } from "./angle.js";
import { m2 } from "./area.js";
import { coherent, defUnit, div, mul } from "../unit.js";

export const cd = defUnit("cd", "candela", coherent(6));

export const lm = defUnit("lm", "lumen", mul(cd, sr));
export const lx = defUnit("lx", "lux", div(lm, m2));
