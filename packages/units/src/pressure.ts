import { M2 } from "./area.js";
import { N } from "./force.js";
import { defUnit, div, mul, prefix } from "./unit.js";

export const PA = defUnit("Pa", "pascal", div(N, M2, true));
export const KPA = defUnit("kPa", "kilopascal", prefix("k", PA));
export const MPA = defUnit("MPa", "megapascal", prefix("M", PA));
export const GPA = defUnit("GPa", "gigapascal", prefix("G", PA));

export const AT = defUnit("at", "technical atmosphere", mul(PA, 98066.5));
export const ATM = defUnit("atm", "atmosphere", mul(PA, 101325));
export const BAR = defUnit("bar", "bar", mul(PA, 1e5, true));
export const PSI = defUnit("psi", "pound per square inch", mul(PA, 6894.757));
