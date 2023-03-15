import { J } from "./energy.js";
import { h, s } from "./time.js";
import { defUnit, div, mul, prefix } from "../unit.js";

export const W = defUnit("W", "watt", div(J, s, true));
export const mW = defUnit("mW", "milliwatt", prefix("m", W));
export const kW = defUnit("kW", "kilowatt", prefix("k", W));
export const MW = defUnit("MW", "megawatt", prefix("M", W));
export const GW = defUnit("GW", "gigawatt", prefix("G", W));
export const TW = defUnit("TW", "terawatt", prefix("T", W));

export const Wh = defUnit("Wh", "watt-hour", mul(W, h, true));
export const kWh = defUnit("kWh", "kilowatt-hour", prefix("k", Wh));
