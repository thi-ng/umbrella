import { coherent, defUnit, mul, prefix } from "./unit.js";

export const m = defUnit("m", "meter", coherent(1));
export const km = defUnit("km", "kilometer", prefix("k", m));
export const cm = defUnit("cm", "centimeter", prefix("c", m));
export const mm = defUnit("mm", "millimeter", prefix("m", m));
export const µm = defUnit("µm", "micrometer", prefix("µ", m));
export const nm = defUnit("nm", "nanometer", prefix("n", m));
export const angstrom = defUnit("Å", "angstrom", mul(m, 1e-10));

export const au = defUnit("au", "astronomical unit", mul(m, 149597870700));
export const ly = defUnit("ly", "light year", mul(m, 9.4607304725808e15));
export const pc = defUnit("pc", "parsec", mul(au, (180 * 60 * 60) / Math.PI));

export const inch = defUnit("in", "inch", mul(m, 0.0254));
export const mil = defUnit("mil", "mil", mul(inch, 1e-3));
export const thou = mil;

export const ft = defUnit("ft", "foot", mul(inch, 12));
export const yd = defUnit("yd", "yard", mul(ft, 3));
export const mi = defUnit("mi", "mile", mul(yd, 1760));
export const nmi = defUnit("nmi", "nautical mile", mul(m, 1852));

export const pica = defUnit("pica", "pica", mul(inch, 1 / 6));
export const point = defUnit("point", "point", mul(inch, 1 / 72));
