import { CM, FT, IN, KM, M, MI, MM } from "./length.js";
import { defUnit, mul, pow } from "./unit.js";

export const M2 = defUnit("m2", "square meter", pow(M, 2));
export const MM2 = defUnit("mm2", "square millimeter", pow(MM, 2));
export const CM2 = defUnit("cm2", "square centimeter", pow(CM, 2));
export const KM2 = defUnit("km2", "square kilometer", pow(KM, 2));
export const HA = defUnit("ha", "hectar", mul(M2, 1e4));

export const AC = defUnit("ac", "acre", mul(M2, 4046.86));
export const SQIN = defUnit("sqin", "square inch", pow(IN, 2));
export const SQFT = defUnit("sqft", "square foot", pow(FT, 2));
export const SQMI = defUnit("sqmi", "square mile", pow(MI, 2));
