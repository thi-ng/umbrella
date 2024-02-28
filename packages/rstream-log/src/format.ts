import { LogLevel, type LogEntry } from "@thi.ng/logger/api";
import { stringify } from "@thi.ng/strings/stringify";
import type { Transducer } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import type { BodyFormat, DateFormat, LogEntryObj } from "./api.js";

export const isoDate = (dt: number) => new Date(dt).toISOString();

/**
 * Log entry formatter/transducer. Formats a {@link LogEntry} tuple as string
 * using optionally provided formatters.
 *
 * @remarks
 * If `wrap` is given, it will be called with both the already formatted message
 * string and the original log entry. The function can be used to post-process
 * the message (e.g. to wrap it in ANSI color escape sequences, based on logger
 * ID and/or level, also see [thi.ng/text-format](https://thi.ng/text-format))
 *
 * @param dateFmt
 * @param bodyFmt
 * @param wrap
 */
export const formatString = (
	dateFmt?: DateFormat,
	bodyFmt?: BodyFormat,
	wrap?: (msg: string, entry: LogEntry) => string
): Transducer<LogEntry, string> => {
	dateFmt = dateFmt || isoDate;
	bodyFmt = bodyFmt || ((x) => x.map(stringify()).join(" "));
	return map((entry) => {
		const [level, id, time, ...body] = entry;
		const date = dateFmt!(time);
		const res = `[${LogLevel[level]}] ${id}: ${
			date ? date + " " : ""
		}${bodyFmt!(body)}`;
		return wrap ? wrap(res, entry) : res;
	});
};

/**
 * Takes an array of regex patterns and optional `mask` string. Returns
 * transducer which replaces all found pattern occurrences with `mask`.
 * Intended to be used in combination / after {@link formatString} to avoid
 * leaking of sensitive information via logged messages.
 *
 *
 * @example
 * ```ts
 * import { Logger, formatString, maskSecrets, writeConsole } from "@thi.ng/rstream-log";
 *
 * const logger = new Logger();
 *
 * logger.transform(
 *   formatString(),
 *   maskSecrets([/(?<=[A-Z0-9_]\=)\w+/g])
 * ).subscribe(
 *   writeConsole()
 * );
 *
 * logger.info("logged in USER=toxi, using TOKEN=123456");
 * // [INFO] logger-0: logged in USER=****, using TOKEN=****
 * ```
 *
 * @param patterns -
 * @param mask -
 */
export const maskSecrets = (patterns: RegExp[], mask = "****") =>
	map((msg: string) =>
		patterns.reduce((acc, pat) => acc.replace(pat, mask), msg)
	);

/**
 * Log entry transducer which converts a {@link LogEntry} tuple to a
 * {@link LogEntryObj}.
 */
export const formatObject = (): Transducer<LogEntry, LogEntryObj> =>
	map(([level, id, time, ...body]) => ({ level, id, time, body }));

/**
 * Log entry formatter/transducer. Format a {@link LogEntry} tuple into a
 * serialized JSON string (object keys: `id`, `level`, `time`, `body`), with the
 * entry's timestamp formatted using given `dateFmt` (default: {@link isoDate}).
 *
 * @param dateFmt
 */
export const formatJSON = (
	dateFmt?: DateFormat
): Transducer<LogEntry, string> => {
	dateFmt = dateFmt || isoDate;
	return map(([level, id, time, ...body]) =>
		JSON.stringify({
			id,
			level: LogLevel[level],
			time: dateFmt!(time),
			body,
		})
	);
};
