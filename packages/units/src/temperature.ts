import { defUnit, unit } from "./unit.js";

export const K = defUnit("K", "kelvin", unit(4, 1));
export const celsius = defUnit("℃", "degree celsius", unit(4, 1, 273.15));
export const fahrenheit = defUnit(
	"℉",
	"degree fahrenheit",
	unit(4, 1 / 1.8, 459.67 / 1.8)
);
