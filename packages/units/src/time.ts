import { coherent, defUnit, mul, prefix } from "./unit.js";

export const s = defUnit("s", "second", coherent(2));
export const ms = defUnit("ms", "millisecond", prefix("m", s));
export const µs = defUnit("µs", "microsecond", prefix("µ", s));
export const ns = defUnit("ns", "nanosecond", prefix("n", s));
export const min = defUnit("min", "minute", mul(s, 60));
export const h = defUnit("h", "hour", mul(min, 60));
export const d = defUnit("day", "day", mul(h, 24));
export const week = defUnit("week", "week", mul(d, 7));
export const month = defUnit("month", "month", mul(d, 30));
export const year = defUnit("year", "year", mul(d, 365.25));
