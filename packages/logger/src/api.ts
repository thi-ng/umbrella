export enum LogLevel {
    FINE,
    DEBUG,
    INFO,
    WARN,
    SEVERE,
    NONE,
}

export type LogLevelName =
    | "FINE"
    | "DEBUG"
    | "INFO"
    | "WARN"
    | "SEVERE"
    | "NONE";

export interface ILogger {
    /**
     * This logger's configured minimum log level
     */
    level: LogLevel;

    fine(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    severe(...args: any[]): void;
}
