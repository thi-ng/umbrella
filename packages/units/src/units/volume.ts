// SPDX-License-Identifier: Apache-2.0
import { defUnit, mul, pow, prefix } from "../unit.js";
import { cm, ft, inch, km, m, mi, mm } from "./length.js";

export const m3 = defUnit("m3", "cubic meter", pow(m, 3));
export const mm3 = defUnit("mm3", "cubic millimeter", pow(mm, 3));
export const cm3 = defUnit("cm3", "cubic centimeter", pow(cm, 3));
export const km3 = defUnit("km3", "cubic kilometer", pow(km, 3));

export const cuin = defUnit("cuin", "cubic inch", pow(inch, 3));
export const cuft = defUnit("cuft", "cubic foot", pow(ft, 3));
export const cumi = defUnit("cumi", "cubic mile", pow(mi, 3));

export const l = defUnit("l", "liter", mul(m3, 1e-3, true));
export const cl = defUnit("cl", "centiliter", prefix("c", l));
export const ml = defUnit("ml", "milliliter", prefix("m", l));
/** 1 ml = 20 drops */
export const drop = defUnit("drop", "drop", mul(ml, 1 / 20));

export const gal = defUnit("gal", "imperial gallon", mul(l, 4.54609));
export const pt = defUnit("pt", "imperial pint", mul(gal, 1 / 8));
export const floz = defUnit("fl_oz", "imperial fluid ounce", mul(gal, 1 / 160));

export const us_gal = defUnit("us_gal", "US gallon", mul(l, 3.785411784));
export const us_pt = defUnit("us_pt", "US pint", mul(us_gal, 1 / 8));
export const us_cup = defUnit("us_cup", "US cup", mul(us_gal, 1 / 16));
export const us_floz = defUnit(
	"us_fl_oz",
	"US fluid ounce",
	mul(us_gal, 1 / 128)
);
