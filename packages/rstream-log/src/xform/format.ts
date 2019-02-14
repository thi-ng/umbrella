import { map, Transducer } from "@thi.ng/transducers";
import {
    Level,
    BodyFormat,
    DateFormat,
    LogEntry,
    LogEntryObj
} from "../api";

export const formatString = (
    dtFmt?: DateFormat,
    bodyFmt?: BodyFormat
): Transducer<LogEntry, string> => {
    dtFmt = dtFmt || ((dt) => new Date(dt).toISOString());
    bodyFmt = bodyFmt || ((x) => x.toString());
    return map(
        ([level, id, time, ...body]) =>
            `[${Level[level]}] [${id}] ${dtFmt(time)} ${bodyFmt(body)}`
    );
};

export const formatObject =
    (): Transducer<LogEntry, LogEntryObj> =>
        map(
            ([level, id, time, ...body]) => ({ level, id, time, body })
        );

export const formatJSON =
    (dtfmt?: DateFormat): Transducer<LogEntry, string> => {
        dtfmt = dtfmt || ((dt) => new Date(dt).toISOString());
        return map(
            ([level, id, time, ...body]) =>
                JSON.stringify({
                    level: Level[level],
                    id,
                    time: dtfmt(time),
                    body
                })
        );
    };
