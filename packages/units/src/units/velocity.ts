import { defUnit, div } from "../unit.js";
import { ft, km, m, mi, nmi } from "./length.js";
import { h, s } from "./time.js";

export const m_s = defUnit("m/s", "meter per second", div(m, s));
export const km_h = defUnit("km/h", "kilometer per hour", div(km, h));
export const ft_s = defUnit("ft/s", "foot per second", div(ft, s));
export const mph = defUnit("mph", "mile per hour", div(mi, h));
export const kn = defUnit("kn", "knot", div(nmi, h));
