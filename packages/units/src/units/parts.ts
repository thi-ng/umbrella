import { defUnit, dimensionless } from "../unit.js";

export const percent = defUnit("%", "percent", dimensionless(1e-2));
export const permille = defUnit("‰", "permille", dimensionless(1e-3));
export const permyriad = defUnit("‱", "permyriad", dimensionless(1e-4));
export const pcm = defUnit("pcm", "part per cent mille", dimensionless(1e-5));
export const ppm = defUnit("ppm", "part per million", dimensionless(1e-6));
export const ppb = defUnit("ppb", "part per billion", dimensionless(1e-9));
export const ppt = defUnit("ppt", "part per trillion", dimensionless(1e-12));
