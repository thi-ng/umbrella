import {
	YEAR,
	MONTH,
	DAY,
	HOUR,
	MINUTE,
	SECOND,
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
