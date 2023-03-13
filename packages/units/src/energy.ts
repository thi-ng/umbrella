import { N } from "./force.js";
import { M } from "./length.js";
import { defUnit, mul, prefix } from "./unit.js";

export const J = defUnit("J", "joule", mul(N, M, true));
export const KJ = defUnit("kJ", "kilojoule", prefix("k", J));
export const MJ = defUnit("MJ", "megajoule", prefix("M", J));
export const GJ = defUnit("GJ", "gigajoule", prefix("G", J));
export const CAL = defUnit("cal", "calorie", mul(J, 4.184, true));
export const KCAL = defUnit("kcal", "kilocalorie", prefix("k", CAL));
