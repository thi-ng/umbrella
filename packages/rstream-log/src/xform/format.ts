import { Transducer } from "@thi.ng/transducers/api";
import { map } from "@thi.ng/transducers/xform/map";

import {
    BodyFormat,
    DateFormat,
    Level,
    LogEntry,
    LogEntryObj
} from "../api";

export function formatString(dtFmt?: DateFormat, bodyFmt?: BodyFormat): Transducer<LogEntry, string> {
    dtFmt = dtFmt || ((dt) => new Date(dt).toISOString());
    bodyFmt = bodyFmt || ((x) => x.toString());
    return map(
        ([level, id, time, ...body]) =>
            `[${Level[level]}] [${id}] ${dtFmt(time)} ${bodyFmt(body)}`
    );
}

export function formatObject(): Transducer<LogEntry, LogEntryObj> {
    return map(
        ([level, id, time, ...body]) => ({ level, id, time, body })
    );
}

export function formatJSON(dtfmt?: (dt: number) => string): Transducer<LogEntry, string> {
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
}
