import { defUnit, mul, prefix, unit } from "../unit.js";

export const g = defUnit("g", "gram", unit(0, 1e-3, 0, true));
export const kg = defUnit("kg", "kilogram", prefix("k", g));
export const mg = defUnit("mg", "milligram", prefix("m", g));
export const µg = defUnit("µg", "microgram", prefix("µ", g));

export const t = defUnit("t", "tonne", prefix("M", g, true));
export const kt = defUnit("kt", "kilotonne", prefix("k", t));
export const Mt = defUnit("Mt", "megatonne", prefix("M", t));
export const Gt = defUnit("Gt", "gigatonne", prefix("G", t));

export const lb = defUnit("lb", "imperial pound", mul(kg, 0.45359237));
export const st = defUnit("st", "stone", mul(lb, 14));
