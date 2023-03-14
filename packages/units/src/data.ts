import { defUnit, dimensionless, mul, prefix } from "./unit.js";

export const bit = defUnit("bit", "bit", dimensionless(1, 0, true));
export const kbit = defUnit("kbit", "kilobit", prefix("k", bit));
export const Mbit = defUnit("Mbit", "megabit", prefix("M", bit));
export const Gbit = defUnit("Gbit", "gigabit", prefix("G", bit));
export const Tbit = defUnit("Tbit", "terabit", prefix("T", bit));

export const B = defUnit("B", "byte", mul(bit, 8, true));
export const kB = defUnit("kB", "kilobyte", prefix("k", B));
export const MB = defUnit("MB", "megabyte", prefix("M", B));
export const GB = defUnit("GB", "gigabyte", prefix("G", B));
export const TB = defUnit("TB", "terabyte", prefix("T", B));
export const PB = defUnit("PB", "petabyte", prefix("P", B));
export const EB = defUnit("EB", "exabyte", prefix("E", B));

// https://en.wikipedia.org/wiki/Byte#Multiple-byte_units

export const Kibit = defUnit("Kibit", "kibibit", mul(bit, 1024));
export const Mibit = defUnit("Mibit", "mebibit", mul(Kibit, 1024));
export const Gibit = defUnit("Gibit", "gibibit", mul(Mibit, 1024));
export const Tibit = defUnit("Tibit", "tebibit", mul(Gibit, 1024));
export const Pibit = defUnit("Pibit", "pebibit", mul(Tibit, 1024));
export const Eibit = defUnit("Eibit", "exbibit", mul(Pibit, 1024));

export const KiB = defUnit("KiB", "kibibyte", mul(B, 1024));
export const MiB = defUnit("MiB", "mebibyte", mul(KiB, 1024));
export const GiB = defUnit("GiB", "gibibyte", mul(MiB, 1024));
export const TiB = defUnit("TiB", "tebibyte", mul(GiB, 1024));
export const PiB = defUnit("PiB", "pebibyte", mul(TiB, 1024));
export const EiB = defUnit("EiB", "exbibyte", mul(PiB, 1024));
