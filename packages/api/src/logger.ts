import { LogLevel } from "./api/logger";
import type { ILogger } from "./api/logger";

export const NULL_LOGGER: ILogger = Object.freeze({
    level: LogLevel.NONE,
    fine() {},
    debug() {},
    info() {},
    warn() {},
    severe() {},
});

export class ConsoleLogger implements ILogger {
    id: string;
    level: LogLevel;

    constructor(id: string, level = LogLevel.FINE) {
        this.id = id;
        this.level = level;
    }

    fine(...args: any[]): void {
        this.level <= LogLevel.FINE && this.log("FINE", args);
    }

    debug(...args: any[]): void {
        this.level <= LogLevel.DEBUG && this.log("DEBUG", args);
    }

    info(...args: any[]): void {
        this.level <= LogLevel.INFO && this.log("INFO", args);
    }

    warn(...args: any[]): void {
        this.level <= LogLevel.WARN && this.log("WARN", args);
    }

    severe(...args: any[]): void {
        this.level <= LogLevel.SEVERE && this.log("SEVERE", args);
    }

    protected log(level: string, args: any[]) {
        console.log(`[${level}] ${this.id}:`, ...args);
    }
}
