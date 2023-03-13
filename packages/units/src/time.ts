import { defUnit, mul, prefix, unit } from "./unit.js";

export const S = defUnit("s", "second", unit(2, 1, 0, true));
export const MS = defUnit("ms", "millisecond", prefix("m", S));
export const µS = defUnit("µs", "microsecond", prefix("µ", S));
export const NS = defUnit("ns", "nanosecond", prefix("n", S));
export const MIN = defUnit("min", "minute", mul(S, 60));
export const H = defUnit("h", "hour", mul(MIN, 60));
export const DAY = defUnit("day", "day", mul(H, 24));
export const WEEK = defUnit("week", "week", mul(DAY, 7));
export const MONTH = defUnit("month", "month", mul(DAY, 30));
export const YEAR = defUnit("year", "year", mul(DAY, 365.25));
