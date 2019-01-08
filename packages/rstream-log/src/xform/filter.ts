import { isString } from "@thi.ng/checks";
import { Transducer } from "@thi.ng/transducers";
import { filter } from "@thi.ng/transducers";
import { Level, LogEntry } from "../api";

export const onlyLevel =
    (level: Level): Transducer<LogEntry, LogEntry> =>
        filter((l) => l[0] === level);

export const minLevel =
    (level: Level): Transducer<LogEntry, LogEntry> =>
        filter((l) => l[0] >= level);

export const maxLevel =
    (level: Level): Transducer<LogEntry, LogEntry> =>
        filter((l) => l[0] <= level);

export const matchID =
    (id: string | RegExp): Transducer<LogEntry, LogEntry> =>
        filter(
            isString(id) ?
                (l) => l[1] === id :
                (l) => id.test(l[1])
        );
