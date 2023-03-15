import { m2 } from "./area.js";
import { N } from "./force.js";
import { defUnit, div, mul, prefix } from "../unit.js";

export const Pa = defUnit("Pa", "pascal", div(N, m2, true));
export const kPa = defUnit("kPa", "kilopascal", prefix("k", Pa));
export const MPa = defUnit("MPa", "megapascal", prefix("M", Pa));
export const GPa = defUnit("GPa", "gigapascal", prefix("G", Pa));

export const at = defUnit("at", "technical atmosphere", mul(Pa, 98066.5));
export const atm = defUnit("atm", "atmosphere", mul(Pa, 101325));
export const bar = defUnit("bar", "bar", mul(Pa, 1e5, true));
export const psi = defUnit("psi", "pound per square inch", mul(Pa, 6894.757));
