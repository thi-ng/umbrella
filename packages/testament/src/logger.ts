import type { ILogger } from "./api";

export class Logger implements ILogger {
    id: string;
    level: number;

    constructor(id = "testament", level = 0) {
        this.id = id;
        this.level = level;
    }

    fine(...args: any[]): void {
        this.level <= 0 && this.log("FINE  ", args);
    }

    debug(...args: any[]): void {
        this.level <= 1 && this.log("DEBUG ", args);
    }

    info(...args: any[]): void {
        this.level <= 2 && this.log("INFO  ", args);
    }

    warn(...args: any[]): void {
        this.level <= 3 && this.log("WARN  ", args);
    }

    severe(...args: any[]): void {
        this.level <= 4 && this.log("SEVERE", args);
    }

    protected log(level: string, args: any[]) {
        console.log(`[${level}]`, ...args);
    }
}

/**
 * Utility logger with no output
 */
export const NULL_LOGGER = new Logger("", 1000);
