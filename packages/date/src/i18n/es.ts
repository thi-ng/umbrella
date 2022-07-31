import type { LocaleSpec } from "../api.js";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_Spain
 */
export const ES_LONG: LocaleSpec = {
	months: [
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre",
	],
	days: [
		"domingo",
		"lunes",
		"martes",
		"miércoles",
		"jueves",
		"viernes",
		"sábado",
	],
	sepDM: " ",
	sepMY: " ",
	units: {
		y: { s: "año", p: "años" },
		M: { s: "mes", p: "meses" },
		d: { s: "día", p: "días" },
		h: { s: "hora", p: "horas" },
		m: { s: "minuto", p: "minutos" },
		s: { s: "segundo", p: "segundos" },
		t: { s: "millisegundo", p: "millisegundos" },
	},
	less: "menos de %s",
	past: "hace %s",
	now: "ahora",
	future: "en %s",
};
