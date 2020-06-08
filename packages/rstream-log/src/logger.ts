import { LogLevel } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors";
import { CloseMode, ISubscribable, nextID, StreamMerge } from "@thi.ng/rstream";
import type { ILogger, LogEntry } from "./api";

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
        super({ src, id, closeIn: CloseMode.NEVER, closeOut: CloseMode.NEVER });
        this.level = level;
    }

    next(x: LogEntry) {
        x[0] >= this.level && super.next(x);
    }

    fine(...args: any[]) {
        this.log(LogLevel.FINE, args);
    }

    debug(...args: any[]) {
        this.log(LogLevel.DEBUG, args);
    }

    info(...args: any[]) {
        this.log(LogLevel.INFO, args);
    }

    warn(...args: any[]) {
        this.log(LogLevel.WARN, args);
    }

    severe(...args: any[]) {
        this.log(LogLevel.SEVERE, args);
    }

    protected log(level: LogLevel, args: any[]) {
        this.level <= level &&
            super.next(<LogEntry>[level, this.id, Date.now(), ...args]);
    }
}
