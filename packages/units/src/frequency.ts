import { s } from "./time.js";
import { defUnit, div, mul, prefix, reciprocal } from "./unit.js";

export const Hz = defUnit("Hz", "hertz", reciprocal(s, true));
export const kHz = defUnit("kHz", "kilohertz", prefix("k", Hz));
export const MHz = defUnit("MHz", "megahertz", prefix("M", Hz));
export const GHz = defUnit("GHz", "gigahertz", prefix("G", Hz));
export const THz = defUnit("THz", "terahertz", prefix("T", Hz));
export const rpm = defUnit("rpm", "rotation per minute", mul(Hz, 1 / 60));

export const ω = defUnit("ω", "radian per second", div(Hz, 2 * Math.PI));
