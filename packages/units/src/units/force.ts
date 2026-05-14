// SPDX-License-Identifier: Apache-2.0
import { defUnit, mul, prefix } from "../unit.js";
import { m_s2 } from "./accel.js";
import { kg } from "./mass.js";

export const N = defUnit("N", "newton", mul(kg, m_s2, true));
export const kN = defUnit("kN", "kilonewton", prefix("k", N));
