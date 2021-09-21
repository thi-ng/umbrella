import { LogLevel } from "@thi.ng/logger/api";
import { stringify } from "@thi.ng/strings/stringify";
import type { Transducer } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import type { BodyFormat, DateFormat, LogEntry, LogEntryObj } from "../api";

export const isoDate = (dt: number) => new Date(dt).toISOString();

export const formatString = (
    dtFmt?: DateFormat,
    bodyFmt?: BodyFormat
): Transducer<LogEntry, string> => {
    dtFmt = dtFmt || isoDate;
    bodyFmt = bodyFmt || ((x) => x.map(stringify()).join(" "));
    return map(
        ([level, id, time, ...body]) =>
            `[${LogLevel[level]}] ${id}: ${dtFmt!(time)} ${bodyFmt!(body)}`
    );
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

export const formatObject = (): Transducer<LogEntry, LogEntryObj> =>
    map(([level, id, time, ...body]) => ({ level, id, time, body }));

export const formatJSON = (
    dtfmt?: DateFormat
): Transducer<LogEntry, string> => {
    dtfmt = dtfmt || isoDate;
    return map(([level, id, time, ...body]) =>
        JSON.stringify({
            id,
            level: LogLevel[level],
            time: dtfmt!(time),
            body,
        })
    );
};
