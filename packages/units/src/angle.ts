import { defUnit, dimensionless, mul } from "./unit.js";

const PI = Math.PI;

export const rad = defUnit("rad", "radian", dimensionless(1, 0, true));
export const deg = defUnit("deg", "degree", mul(rad, PI / 180));
export const gon = defUnit("gon", "gradian", mul(rad, PI / 200));
export const turn = defUnit("turn", "turn", mul(rad, 2 * PI));
export const arcmin = defUnit("arcmin", "arc minute", mul(rad, PI / 10800));
export const arcsec = defUnit("arcsec", "arc second", mul(rad, PI / 648000));

export const sr = defUnit("sr", "steradian", dimensionless(1, 0, true));
