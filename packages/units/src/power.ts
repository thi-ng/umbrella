import { J } from "./energy.js";
import { H, S } from "./time.js";
import { defUnit, div, mul, prefix } from "./unit.js";

export const W = defUnit("W", "watt", div(J, S, true));
export const MILLI_W = defUnit("mW", "milliwatt", prefix("m", W));
export const KW = defUnit("kW", "kilowatt", prefix("k", W));
export const MW = defUnit("MW", "megawatt", prefix("M", W));
export const GW = defUnit("GW", "gigawatt", prefix("G", W));
export const TW = defUnit("TW", "terawatt", prefix("T", W));

export const W_H = defUnit("Wh", "watt-hour", mul(W, H, true));
export const KW_H = defUnit("kWh", "kilowatt-hour", prefix("k", W_H));
