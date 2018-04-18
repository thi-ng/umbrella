import { illegalArity } from "@thi.ng/api/error";
import { ISubscribable } from "@thi.ng/rstream/api";
import { StreamMerge } from "@thi.ng/rstream/stream-merge";
import { Subscription } from "@thi.ng/rstream/subscription";

import { ILogger, Level, LogEntry } from "./api";

export class Logger extends StreamMerge<LogEntry, LogEntry> implements
    ILogger {

    level: Level;

    constructor();
    constructor(id: string);
    constructor(id: string, level: Level);
    constructor(id: string, sources: Iterable<ISubscribable<LogEntry>>, level?: Level);
    constructor(...args: any[]) {
        let id;
        let level = Level.FINE;
        let src;
        switch (args.length) {
            case 0:
                break;
            case 1:
                id = args[0];
                break;
            case 2:
                [id, level] = args;
                break;
            case 3:
                [id, src, level] = args;
                src = [...src];
                break;
            default:
                illegalArity(args.length);
        }
        id = id || `logger-${Subscription.NEXT_ID++}`;
        super({ src, id, close: false });
        this.level = level;
    }

    next(x: LogEntry) {
        if (x[0] >= this.level) {
            super.next(x);
        }
    }

    fine(...args: any[]) {
        if (this.level <= Level.FINE) {
            this.next(<LogEntry>[Level.FINE, this.id, Date.now(), ...args]);
        }
    }

    debug(...args: any[]) {
        if (this.level <= Level.DEBUG) {
            this.next(<LogEntry>[Level.DEBUG, this.id, Date.now(), ...args]);
        }
    }

    info(...args: any[]) {
        if (this.level <= Level.INFO) {
            this.next(<LogEntry>[Level.INFO, this.id, Date.now(), ...args]);
        }
    }

    warn(...args: any[]) {
        if (this.level <= Level.WARN) {
            this.next(<LogEntry>[Level.WARN, this.id, Date.now(), ...args]);
        }
    }

    severe(...args: any[]) {
        if (this.level <= Level.SEVERE) {
            this.next(<LogEntry>[Level.SEVERE, this.id, Date.now(), ...args]);
        }
    }
}
