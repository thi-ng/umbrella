// SPDX-License-Identifier: Apache-2.0
import { defUnit, div, pow } from "../unit.js";
import { rad } from "./angle.js";
import { ft, m } from "./length.js";
import { s } from "./time.js";

const s2 = pow(s, 2);

export const m_s2 = defUnit("m/s2", "meter per second squared", div(m, s2));

export const ft_s2 = defUnit("ft/s2", "foot per second squared", div(ft, s2));

export const rad_s2 = defUnit(
	"rad/s2",
	"radian per second squared",
	div(rad, s2)
);
