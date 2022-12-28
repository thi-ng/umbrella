import { DAY, HOUR, MaybeDate, MINUTE, Period, SECOND } from "./api.js";
import { ensureEpoch } from "./checks.js";
import { DateTime, dateTime, ensureDateTime } from "./datetime.js";
import { EN_LONG, EN_SHORT } from "./i18n/en.js";

/**
 * Takes a relative time `offset` string in plain english and an optional `base`
 * date (default: now). Parses `offset` and returns new date with relative
 * offset applied. Returns `undefined` if parsing failed.
 *
 * @remarks
 * This function only handles the parsing and input normalization aspect for
 * {@link relative}. The latter function applies the actual offset.
 *
 * The following input formats are supported:
 *
 * - `"tomorrow"` / `"yesterday"` - ±1 day
 * - any weekday names in {@link EN_SHORT} and {@link EN_LONG} (always in future)
 * - `<"-"|"+">?<num><period><" ago">?"` - ±num periods (if prefixed with "-" or
 *   if the `" ago"` suffix is given, the offset will be applied towards the
 *   past)
 *
 * (Note: If both negative offset and "ago" is given, the suffix will, like a
 * double-negative, flip the direction back towards the future).
 *
 * If using the latter form:
 *
 * - `<num>` can be a positve integer or strings: `"next "`, `"a "` or `"an "`
 * - `<period>` can be:
 *   - `ms` / `millis` / `millisecond` / `milliseconds`
 *   - `s` / `sec` / `secs` / `second` / `seconds`
 *   - `min` / `mins` / `minute` / `minutes`
 *   - `h` / `hour` / `hours`
 *   - `d` / `day` / `days`
 *   - `w` / `week` / `weeks`
 *   - `mo` / `month` / `months`
 *   - `q` / `quarter` / `quarters`
 *   - `y` / `year` / `years`
 *
 * @param offset -
 * @param base -
 */
export const parseRelative = (offset: string, base?: MaybeDate) => {
	offset = offset.toLowerCase();
	const epoch = dateTime(base);
	switch (offset) {
		case "today":
			return epoch;
		case "tomorrow":
			epoch.incDay();
			return epoch;
		case "yesterday":
			epoch.decDay();
			return epoch;
		default: {
			let idx = findIndex(EN_SHORT.days, offset);
			if (idx < 0) {
				idx = findIndex(EN_LONG.days, offset);
			}
			if (idx >= 0) {
				do {
					epoch.incDay();
				} while (epoch.toDate().getDay() != idx);
				return epoch;
			}
			const match =
				/^(an? |next |[-+]?\d+\s?)((ms|milli(?:(s?|seconds?)))|s(?:(ecs?|econds?))?|min(?:(s|utes?))?|h(?:ours?)?|d(?:ays?)?|w(?:eeks?)?|mo(?:nths?)?|q(?:uarters?)?|y(?:ears?)?)(\s+ago)?$/.exec(
					offset
				);
			return match
				? relative(
						parseNum(match![1], !!match[7]),
						parsePeriod(match![2]),
						base
				  )
				: undefined;
		}
	}
};

const findIndex = (items: string[], x: string) =>
	items.findIndex((y) => y.toLowerCase() === x);

const parseNum = (x: string, past: boolean) =>
	(x === "next " || x === "a " || x === "an " ? 1 : Number(x)) *
	(past ? -1 : 1);

const parsePeriod = (x: string) => {
	x =
		x !== "s" && x !== "ms" && x.endsWith("s")
			? x.substring(0, x.length - 1)
			: x;
	return <Period>{
			ms: "t",
			milli: "t",
			millisecond: "t",
			sec: "s",
			second: "s",
			min: "m",
			minute: "m",
			hour: "h",
			day: "d",
			week: "w",
			mo: "M",
			month: "M",
			quarter: "q",
			year: "y",
		}[x] || <Period>x;
};

/**
 * Applies the given relative offset (defined by `num` and `period`) to the
 * optionally given `base` date (default: now). If `num < 0` the result date
 * will be in the past (relative to `base`).
 *
 * @param num -
 * @param period -
 * @param base -
 */
export const relative = (
	num: number,
	period: Period,
	base: MaybeDate = dateTime()
) => dateTime(base).add(num, period);

/**
 * Returns the signed difference in milliseconds between given two dates `a` and
 * `b`.
 *
 * @param a -
 * @param b -
 */
export const difference = (a: MaybeDate, b: MaybeDate) =>
	ensureEpoch(a) - ensureEpoch(b);

/**
 * Computes and decomposes difference between given dates. Returns tuple of:
 * `[sign, years, months, days, hours, mins, secs, millis]`. The `sign` is used
 * to indicate the relative order of `a` compared to `b`, i.e. same contract as
 * [`ICompare`](https://docs.thi.ng/umbrella/api/interfaces/ICompare.html).
 *
 * @param a -
 * @param b -
 */
export const decomposeDifference = (
	a: MaybeDate,
	b: MaybeDate = new Date()
) => {
	const dur = ensureEpoch(a) - ensureEpoch(b);
	let abs = Math.abs(dur);
	const milli = abs % SECOND;
	abs -= milli;
	const sec = abs % MINUTE;
	abs -= sec;
	const min = abs % HOUR;
	abs -= min;
	const hour = abs % DAY;
	abs -= hour;

	const parts = [
		Math.sign(dur),
		0, // year
		0, // month
		0, // day
		hour / HOUR,
		min / MINUTE,
		sec / SECOND,
		milli,
	];

	if (!abs) return parts;

	const diff = (a: DateTime, b: DateTime): number => {
		const months = (b.y - a.y) * 12 + (b.M - a.M);
		const bstart = +a.add(months, "M");
		let frac = +b - bstart;
		frac /=
			frac < 0
				? bstart - +a.add(months - 1, "M")
				: +a.add(months + 1, "M") - bstart;
		return -(months + frac) || 0;
	};

	const aa = ensureDateTime(a, "d");
	const bb = ensureDateTime(b, "d");
	const months = Math.abs(aa.d < bb.d ? -diff(bb, aa) : diff(aa, bb)) | 0;

	const days = (start: DateTime, end: DateTime) =>
		Math.abs(
			+start.withPrecision("d").add(months, "M") - +end.withPrecision("d")
		) / DAY;

	parts[1] = (months / 12) | 0;
	parts[2] = months % 12;
	parts[3] = dur < 0 ? days(aa, bb) : days(bb, aa);

	return parts;
};
