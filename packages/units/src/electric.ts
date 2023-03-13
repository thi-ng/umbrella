import { m2 } from "./area.js";
import { J } from "./energy.js";
import { h, s } from "./time.js";
import { defUnit, div, mul, prefix, unit } from "./unit.js";

export const A = defUnit("A", "ampere", unit(3, 1, 0, true));
export const mA = defUnit("mA", "milliampere", prefix("m", A));
export const mAh = defUnit("mAh", "milliampere-hour", mul(mA, h));

export const C = defUnit("C", "coulomb", mul(A, s, true));

export const V = defUnit("V", "volt", div(J, C, true));
export const mV = defUnit("mV", "millivolt", prefix("m", V));
export const kV = defUnit("kV", "kilovolt", prefix("k", V));
export const MV = defUnit("MV", "megavolt", prefix("M", V));

export const F = defUnit("F", "farad", div(C, V, true));
export const pF = defUnit("pF", "picofarad", prefix("p", F));
export const µF = defUnit("µF", "microfarad", prefix("µ", F));

export const Ω = defUnit("Ω", "ohm", div(V, A, true));
export const kΩ = defUnit("kΩ", "kiloohm", prefix("k", Ω));
export const MΩ = defUnit("MΩ", "megaohm", prefix("M", Ω));
export const GΩ = defUnit("GΩ", "gigaohm", prefix("G", Ω));

export const S = defUnit("S", "siemens", div(A, V, true));
export const Wb = defUnit("Wb", "weber", mul(V, s, true));
export const T = defUnit("T", "tesla", div(Wb, m2, true));
export const H = defUnit("H", "henry", div(Wb, A, true));
