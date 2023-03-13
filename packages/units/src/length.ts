import { defUnit, mul, prefix, unit } from "./unit.js";

export const M = defUnit("m", "meter", unit(1, 1, 0, true));
export const CM = defUnit("cm", "centimeter", prefix("c", M));
export const MM = defUnit("mm", "millimeter", prefix("m", M));
export const µM = defUnit("µm", "micrometer", prefix("µ", M));
export const NM = defUnit("nm", "nanometer", prefix("n", M));
export const KM = defUnit("km", "kilometer", prefix("k", M));
export const AU = defUnit("au", "astronomical unit", mul(M, 149597870700));

export const IN = defUnit("in", "inch", mul(M, 0.0254));
export const FT = defUnit("ft", "foot", mul(IN, 12));
export const YD = defUnit("yd", "yard", mul(FT, 3));
export const MI = defUnit("mi", "mile", mul(YD, 1760));
export const NMI = defUnit("nmi", "nautical mile", mul(M, 1852));

export const PICA = defUnit("pica", "pica", mul(IN, 1 / 6));
export const POINT = defUnit("point", "point", mul(IN, 1 / 72));
