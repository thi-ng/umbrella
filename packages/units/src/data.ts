import { defUnit, dimensionless, mul, prefix } from "./unit.js";

export const BIT = defUnit("bit", "bit", dimensionless(1, 0, true));
export const KBIT = defUnit("kbit", "kilobit", prefix("k", BIT));
export const MBIT = defUnit("Mbit", "megabit", prefix("M", BIT));
export const GBIT = defUnit("Gbit", "gigabit", prefix("G", BIT));
export const TBIT = defUnit("Tbit", "terabit", prefix("T", BIT));

export const BYTE = defUnit("B", "byte", mul(BIT, 8, true));
export const KBYTE = defUnit("KB", "kilobyte", mul(BYTE, 1024));
export const MBYTE = defUnit("MB", "megabyte", mul(KBYTE, 1024));
export const GBYTE = defUnit("GB", "gigabyte", mul(MBYTE, 1024));
export const TBYTE = defUnit("TB", "terabyte", mul(GBYTE, 1024));
export const PBYTE = defUnit("PB", "petabyte", mul(TBYTE, 1024));
export const EBYTE = defUnit("EB", "exabyte", mul(PBYTE, 1024));
