import { defUnit, mul, prefix, unit } from "./unit.js";

export const G = defUnit("g", "gram", unit(0, 1e-3, 0, true));
export const KG = defUnit("kg", "kilogram", prefix("k", G));
export const MG = defUnit("mg", "milligram", prefix("m", G));
export const µG = defUnit("µg", "microgram", prefix("µ", G));

export const T = defUnit("t", "tonne", prefix("M", G, true));
export const KT = defUnit("kt", "kilotonne", prefix("k", T));
export const MT = defUnit("Mt", "megatonne", prefix("M", T));
export const GT = defUnit("Gt", "gigatonne", prefix("G", T));

export const LB = defUnit("lb", "imperial pound", mul(KG, 0.45359237));
export const ST = defUnit("st", "stone", mul(LB, 14));
