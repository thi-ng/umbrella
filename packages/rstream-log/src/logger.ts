import { LogLevel } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors";
import { ISubscribable, nextID, StreamMerge } from "@thi.ng/rstream";
import { ILogger, LogEntry } from "./api";

export class Logger extends StreamMerge<LogEntry, LogEntry> implements ILogger {
    level: LogLevel;

    constructor();
    constructor(id: string);
    constructor(id: string, level: LogLevel);
    constructor(
        id: string,
        sources: Iterable<ISubscribable<LogEntry>>,
        level?: LogLevel
    );
    constructor(...args: any[]) {
        let id;
        let level = LogLevel.FINE;
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
        id = id || `logger-${nextID()}`;
        super({ src, id, close: false });
        this.level = level;
    }

    next(x: LogEntry) {
        x[0] >= this.level && super.next(x);
    }

    fine(...args: any[]) {
        this.level <= LogLevel.FINE &&
            super.next(<LogEntry>[LogLevel.FINE, this.id, Date.now(), ...args]);
    }

    debug(...args: any[]) {
        this.level <= LogLevel.DEBUG &&
            super.next(<LogEntry>[
                LogLevel.DEBUG,
                this.id,
                Date.now(),
                ...args
            ]);
    }

    info(...args: any[]) {
        this.level <= LogLevel.INFO &&
            super.next(<LogEntry>[LogLevel.INFO, this.id, Date.now(), ...args]);
    }

    warn(...args: any[]) {
        this.level <= LogLevel.WARN &&
            super.next(<LogEntry>[LogLevel.WARN, this.id, Date.now(), ...args]);
    }

    severe(...args: any[]) {
        this.level <= LogLevel.SEVERE &&
            super.next(<LogEntry>[
                LogLevel.SEVERE,
                this.id,
                Date.now(),
                ...args
            ]);
    }
}
