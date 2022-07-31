import type { Fn, Fn2 } from "@thi.ng/api";
import type { DateTime } from "./datetime.js";

/**
 * Days per month LUT (non-leap year)
 */
export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * LUT of day-in-year values for 1st of each month (non-leap year)
 */
export const DAYS_IN_MONTH_OFFSET = [
	0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
];

/**
 * There're 97 leap years and 303 normal years per 400 years
 */
export const DAYS_IN_400YEARS = 97 * 366 + 303 * 365;

/**
 * Second duration in milliseconds
 */
export const SECOND = 1000;
/**
 * Minute duration in milliseconds
 */
export const MINUTE = 60 * SECOND;
/**
 * Hour duration in milliseconds
 */
export const HOUR = 60 * MINUTE;
/**
 * Day duration in milliseconds
 */
export const DAY = 24 * HOUR;
/**
 * Week duration in milliseconds
 */
export const WEEK = 7 * DAY;
/**
 * Mean year duration (365.2425 days) in milliseconds
 */
export const YEAR = (DAYS_IN_400YEARS / 400) * DAY;
/**
 * Mean month duration (30.436875 days) in milliseconds
 */
export const MONTH = YEAR / 12;

export interface Locale {
	/**
	 * Names of months
	 */
	months: string[];
	/**
	 * Names of weekdays (starting w/ Sunday)
	 */
	days: string[];
	/**
	 * Default date format spec for use with {@link defFormat}
	 *
	 * @defaultValue ["E", "/ED", "d", "/DM", "MMM", "/MY", "yyyy"]
	 */
	date: string[];
	/**
	 * Default time format spec for use with {@link defFormat}
	 *
	 * @defaultValue ["H", "/HM", "mm"]
	 */
	time: string[];
	/**
	 * Default combined date & time format spec for use with {@link defFormat}
	 * and {@link DateTime.toLocaleString}.
	 *
	 * @defaultValue concatenation of `date` and `time` options
	 */
	dateTime: string[];
	/**
	 * Separator between day & month.
	 *
	 * @defaultValue "/"
	 */
	sepDM: string;
	/**
	 * Separator between month & year
	 *
	 * @defaultValue " "
	 */
	sepMY: string;
	/**
	 * Separator between weekday & day
	 *
	 * @defaultValue " "
	 */
	sepED: string;
	/**
	 * Separator between hour & minute
	 *
	 * @defaultValue ":"
	 */
	sepHM: string;
	/**
	 * Singular & plural versions of various date/time units.
	 */
	units: Record<Precision, LocaleUnit>;
	/**
	 * Translated version of "less than" for use with {@link unitsLessThan}.
	 * (`%s` will be replaced with the provided numeric value).
	 */
	less: string;
	/**
	 * Template for past tense (`%s` will be replaced with result).
	 */
	past: string;
	/**
	 * Translated version of "now".
	 */
	now: string;
	/**
	 * Template for future tense (`%s` will be replaced with result).
	 */
	future: string;
}

export interface LocaleUnit {
	/**
	 * Singular
	 */
	s: string;
	/**
	 * Plural
	 */
	p: string;
	/**
	 * Singular dativ. If omitted, the same as singular.
	 */
	sd?: string;
	/**
	 * Plural dativ. If omitted, the same as plural.
	 */
	pd?: string;
}

/**
 * A partially optional version of {@link Locale}, for use with
 * {@link setLocale}.
 */
export type LocaleSpec = Pick<Locale, "months" | "days"> &
	Partial<Omit<Locale, "months" | "days">>;

export interface IEpoch {
	getTime(): number;
}

export interface EpochIteratorConstructor {
	([from, to]: MaybeDate[]): EpochIterator;
	(from: MaybeDate, to: MaybeDate): EpochIterator;
}

export type EpochIterator = IterableIterator<number>;

/**
 * DateTime precision/resolution IDs:
 *
 * - y : year
 * - M : month
 * - d : day
 * - h : hour
 * - m : minute
 * - s : second
 * - t : millisecond
 */
export type Precision = "y" | "M" | "d" | "h" | "m" | "s" | "t";

export type Period = Precision | "w" | "q";

export type FormatFn = Fn2<Date, boolean, string>;

export type MaybeDate = DateTime | Date | number | string;

/**
 * Date rounding function for {@link MaybeDate} inputs.
 */
export type RoundingFn = Fn<MaybeDate, number>;
