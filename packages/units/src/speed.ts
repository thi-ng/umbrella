import { defUnit, div } from "./unit.js";
import { FT, KM, M, MI, NMI } from "./length.js";
import { H, S } from "./time.js";

export const M_S = defUnit("m/s", "meter per second", div(M, S));
export const KM_H = defUnit("km/h", "kilometer per hour", div(KM, H));
export const FT_S = defUnit("ft/s", "foot per second", div(FT, S));
export const MPH = defUnit("mph", "mile per hour", div(MI, H));
export const KNOT = defUnit("kn", "knot", div(NMI, H));
