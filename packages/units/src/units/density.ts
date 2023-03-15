import { inch } from "./length.js";
import { kg } from "./mass.js";
import { defUnit, div, reciprocal } from "../unit.js";
import { m3 } from "./volume.js";

export const kg_m3 = defUnit("kg/m3", "kilogram per cubic meter", div(kg, m3));

export const dpi = defUnit("dpi", "dots per inch", reciprocal(inch));
