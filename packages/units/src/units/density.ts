// SPDX-License-Identifier: Apache-2.0
import { defUnit, div, reciprocal } from "../unit.js";
import { m2 } from "./area.js";
import { inch } from "./length.js";
import { g, kg } from "./mass.js";
import { m3 } from "./volume.js";

export const g_m2 = defUnit("g/m2", "gram per square meter", div(g, m2));

/**
 * Alias for {@link g_m2}
 */
export const gsm = defUnit("gsm", "gram per square meter", div(g, m2));

export const kg_m3 = defUnit("kg/m3", "kilogram per cubic meter", div(kg, m3));

export const dpi = defUnit("dpi", "dots per inch", reciprocal(inch));
