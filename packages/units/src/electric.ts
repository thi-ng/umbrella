import { M2 } from "./area.js";
import { J } from "./energy.js";
import { H, S } from "./time.js";
import { defUnit, div, mul, prefix, unit } from "./unit.js";

export const A = defUnit("A", "ampere", unit(3, 1, 0, true));
export const MA = defUnit("mA", "milliampere", prefix("m", A));
export const MA_H = defUnit("mAh", "milliampere-hour", mul(MA, H));

export const C = defUnit("C", "coulomb", mul(A, S, true));

export const V = defUnit("V", "volt", div(J, C, true));
export const MV = defUnit("mV", "millivolt", prefix("m", V));
export const KV = defUnit("kV", "kilovolt", prefix("k", V));

export const F = defUnit("F", "farad", div(C, V, true));
export const PF = defUnit("pF", "picofarad", prefix("p", F));
export const µF = defUnit("µF", "microfarad", prefix("µ", F));

export const OHM = defUnit("Ω", "ohm", div(V, A, true));
export const KOHM = defUnit("kΩ", "kiloohm", prefix("k", OHM));
export const MOHM = defUnit("MΩ", "megaohm", prefix("M", OHM));
export const GOHM = defUnit("GΩ", "gigaohm", prefix("G", OHM));

export const SIEMENS = defUnit("S", "siemens", div(A, V, true));
export const WB = defUnit("Wb", "weber", mul(V, S, true));
export const TESLA = defUnit("T", "tesla", div(WB, M2, true));
export const HENRY = defUnit("H", "henry", div(WB, A, true));
