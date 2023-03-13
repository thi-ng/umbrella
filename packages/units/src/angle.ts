import { defUnit, dimensionless, mul } from "./unit.js";

const PI = Math.PI;

export const RAD = defUnit("rad", "radian", dimensionless(1, 0, true));
export const DEG = defUnit("deg", "degree", mul(RAD, PI / 180));
export const GON = defUnit("gon", "gradian", mul(RAD, PI / 200));
export const TURN = defUnit("turn", "turn", mul(RAD, 2 * PI));
export const ARCMIN = defUnit("arcmin", "arc minute", mul(RAD, PI / 10800));
export const ARCSEC = defUnit("arcsec", "arc second", mul(RAD, PI / 648000));

export const SR = defUnit("sr", "steradian", dimensionless(1, 0, true));
