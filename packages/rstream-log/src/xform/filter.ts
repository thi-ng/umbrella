import { isString } from "@thi.ng/checks/is-string";
import { Transducer } from "@thi.ng/transducers/api";
import { filter } from "@thi.ng/transducers/xform/filter";

import { Level, LogEntry } from "../api";

export function onlyLevel(level: Level): Transducer<LogEntry, LogEntry> {
    return filter((l) => l[0] === level);
}

export function minLevel(level: Level): Transducer<LogEntry, LogEntry> {
    return filter((l) => l[0] >= level);
}

export function maxLevel(level: Level): Transducer<LogEntry, LogEntry> {
    return filter((l) => l[0] <= level);
}

export function matchID(id: string | RegExp): Transducer<LogEntry, LogEntry> {
    return filter(
        isString(id) ?
            (l) => l[1] === id :
            (l) => id.test(l[1])
    );
}
