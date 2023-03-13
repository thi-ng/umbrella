import { S } from "./time.js";
import { defUnit, div, mul, prefix, reciprocal } from "./unit.js";

export const HZ = defUnit("Hz", "hertz", reciprocal(S, true));
export const KHZ = defUnit("kHz", "kilohertz", prefix("k", HZ));
export const MHZ = defUnit("MHz", "megahertz", prefix("M", HZ));
export const GHZ = defUnit("GHz", "gigahertz", prefix("G", HZ));
export const THZ = defUnit("THz", "terahertz", prefix("T", HZ));
export const RPM = defUnit("rpm", "rotation per minute", mul(HZ, 1 / 60));

export const OMEGA = defUnit("ω", "radian per second", div(HZ, 2 * Math.PI));
