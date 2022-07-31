import type { LocaleSpec } from "../api.js";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_the_United_Kingdom
 */
export const EN_SHORT: LocaleSpec = {
	months: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
	days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	sepHM: ".",
	date: ["dd", "/DM", "MM", "/MY", "yyyy"],
	time: ["h", "/HM", "mm", " ", "a"],
	units: {
		y: { s: "y", p: "y" },
		M: { s: "m", p: "m" },
		d: { s: "d", p: "d" },
		h: { s: "h", p: "h" },
		m: { s: "min", p: "min" },
		s: { s: "s", p: "s" },
		t: { s: "ms", p: "ms" },
	},
	less: "< %s",
	past: "%s ago",
	now: "just now",
	future: "in %s",
};

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_the_United_Kingdom
 */
export const EN_LONG: LocaleSpec = {
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	],
	sepDM: " ",
	sepMY: " ",
	sepHM: ".",
	time: ["h", "/HM", "mm", " ", "a"],
	units: {
		y: { s: "year", p: "years" },
		M: { s: "month", p: "months" },
		d: { s: "day", p: "days" },
		h: { s: "hour", p: "hours" },
		m: { s: "minute", p: "minutes" },
		s: { s: "second", p: "seconds" },
		t: { s: "millisecond", p: "milliseconds" },
	},
	less: "less than %s",
	past: "%s ago",
	now: "just now",
	future: "in %s",
};
