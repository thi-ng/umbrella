import {
	DAY,
	HOUR,
	MINUTE,
	MONTH,
	PERIODS,
	SECOND,
	WEEK,
	YEAR,
	type Precision,
} from "./api.js";

/**
 * Decomposes given duration (in milliseconds) into a tuple of: `[year, month,
 * day, hour, minute, second, millis]`.
 *
 * @param dur -
 */
export const decomposeDuration = (dur: number) => {
	const year = (dur / YEAR) | 0;
	dur -= year * YEAR;
	const month = (dur / MONTH) | 0;
	dur -= month * MONTH;
	const day = (dur / DAY) | 0;
	dur -= day * DAY;
	const hour = (dur / HOUR) | 0;
	dur -= hour * HOUR;
	const min = (dur / MINUTE) | 0;
	dur -= min * MINUTE;
	const sec = (dur / SECOND) | 0;
	dur -= sec * SECOND;
	return [year, month, day, hour, min, sec, dur];
};

/**
 * Computes a duration (in milliseconds) from given parts. Also see
 * {@link decomposeDuration}.
 *
 * @example
 * ```ts
 * import { composeDuration } from "@thi.ng/date";
 *
 * composeDuration({ h: 12, m: 34, s: 56 })
 * // 45296000
 * ```
 *
 * @param parts
 */
export const composeDuration = (parts: Partial<Record<Precision, number>>) => {
	let dur = (parts.y || 0) * YEAR;
	dur += (parts.M || 0) * MONTH;
	dur += (parts.d || 0) * DAY;
	dur += (parts.h || 0) * HOUR;
	dur += (parts.m || 0) * MINUTE;
	dur += (parts.s || 0) * SECOND;
	dur += parts.t || 0;
	return dur;
};

/**
 * Calculates the given duration in units of given `prec`ision.
 *
 * @example
 * ```ts
 * import { durationAs } from "@thi.ng/date";
 * durationAs("d", difference("2023-02-01T12:00:00Z", "2023-01-01"))
 * // 31.5
 * ```
 *
 * @param prec
 * @param dur
 */
export const durationAs = (prec: Precision, dur: number) => dur / PERIODS[prec];

/**
 * Returns duration in seconds.
 *
 * @param dur
 */
export const asSeconds = (dur: number) => dur / SECOND;

/**
 * Returns duration in minutes.
 *
 * @param dur
 */
export const asMinutes = (dur: number) => dur / MINUTE;

/**
 * Returns duration in hours.
 *
 * @param dur
 */
export const asHours = (dur: number) => dur / HOUR;

/**
 * Returns duration in days.
 *
 * @param dur
 */
export const asDays = (dur: number) => dur / DAY;

/**
 * Returns duration in weeks.
 *
 * @param dur
 */
export const asWeeks = (dur: number) => dur / WEEK;

/**
 * Returns duration in months (as defined by {@link MONTH})..
 *
 * @param dur
 */
export const asMonths = (dur: number) => dur / MONTH;

/**
 * Returns duration in years (as defined by {@link YEAR}).
 *
 * @param dur
 */
export const asYears = (dur: number) => dur / YEAR;
