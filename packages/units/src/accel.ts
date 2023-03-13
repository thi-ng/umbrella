import { rad } from "./angle.js";
import { ft, m } from "./length.js";
import { s } from "./time.js";
import { defUnit, div, mul, pow } from "./unit.js";

export const m_s2 = defUnit(
	"m/s2",
	"meter per second squared",
	div(m, pow(s, 2))
);

export const ft_s2 = defUnit(
	"ft/s2",
	"foot per second squared",
	div(ft, pow(s, 2))
);

export const rad_s2 = defUnit(
	"rad/s2",
	"radian per second squared",
	div(rad, pow(s, 2))
);

export const g0 = defUnit("g0", "standard gravity", mul(m_s2, 9.80665));
