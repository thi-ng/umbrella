import { RAD } from "./angle.js";
import { FT, M } from "./length.js";
import { S } from "./time.js";
import { defUnit, div, mul, pow } from "./unit.js";

export const M_S2 = defUnit(
	"m/s2",
	"meter per second squared",
	div(M, pow(S, 2))
);

export const FT_S2 = defUnit(
	"ft/s2",
	"foot per second squared",
	div(FT, pow(S, 2))
);

export const RAD_S2 = defUnit(
	"rad/s2",
	"radian per second squared",
	div(RAD, pow(S, 2))
);

export const G0 = defUnit("g0", "standard gravity", mul(M_S2, 9.80665));
