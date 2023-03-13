import { N } from "./force.js";
import { m } from "./length.js";
import { defUnit, mul, prefix } from "./unit.js";

export const J = defUnit("J", "joule", mul(N, m, true));
export const kJ = defUnit("kJ", "kilojoule", prefix("k", J));
export const MJ = defUnit("MJ", "megajoule", prefix("M", J));
export const GJ = defUnit("GJ", "gigajoule", prefix("G", J));
export const cal = defUnit("cal", "calorie", mul(J, 4.184, true));
export const kcal = defUnit("kcal", "kilocalorie", prefix("k", cal));
