// SPDX-License-Identifier: Apache-2.0
import { cm, ft, inch, km, m, mi, mm } from "./length.js";
import { defUnit, mul, pow } from "../unit.js";

export const m2 = defUnit(["m2", "sqm"], "square meter", pow(m, 2));
export const mm2 = defUnit(["mm2", "sqmm"], "square millimeter", pow(mm, 2));
export const cm2 = defUnit(["cm2", "sqcm"], "square centimeter", pow(cm, 2));
export const km2 = defUnit(["km2", "sqkm"], "square kilometer", pow(km, 2));
export const ha = defUnit("ha", "hectar", mul(m2, 1e4));

export const ac = defUnit("ac", "acre", mul(m2, 4046.86));
export const sqin = defUnit("sqin", "square inch", pow(inch, 2));
export const sqft = defUnit("sqft", "square foot", pow(ft, 2));
export const sqmi = defUnit("sqmi", "square mile", pow(mi, 2));
