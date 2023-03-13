import { CM, KM, M, MM } from "./length.js";
import { defUnit, mul, pow, prefix } from "./unit.js";

export const M3 = defUnit("m3", "cubic meter", pow(M, 3));
export const MM3 = defUnit("mm3", "cubic millimeter", pow(MM, 3));
export const CM3 = defUnit("cm3", "cubic centimeter", pow(CM, 3));
export const KM3 = defUnit("km3", "cubic kilometer", pow(KM, 3));
export const L = defUnit("l", "liter", mul(M3, 1e-3, true));
export const CL = defUnit("cl", "centiliter", prefix("c", L));
export const ML = defUnit("ml", "milliliter", prefix("m", L));

export const GAL = defUnit("imp gal", "imperial gallon", mul(L, 4.54609));
export const PT = defUnit("imp pt", "imperial pint", mul(GAL, 1 / 8));
export const FLOZ = defUnit(
	"imp fl oz",
	"imperial fluid ounce",
	mul(GAL, 1 / 160)
);

export const US_GAL = defUnit("us gal", "us gallon", mul(L, 3.785411784));
export const US_PT = defUnit("us pt", "us pint", mul(US_GAL, 1 / 8));
export const US_CUP = defUnit("us cup", "us cup", mul(US_GAL, 1 / 16));
export const US_FLOZ = defUnit(
	"us fl oz",
	"us fluid ounce",
	mul(US_GAL, 1 / 128)
);
