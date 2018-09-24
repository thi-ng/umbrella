import { IID } from "@thi.ng/api/api";
import { ISubscribable } from "@thi.ng/rstream/api";

export const enum Level {
    FINE,
    DEBUG,
    INFO,
    WARN,
    SEVERE,
    NONE,
}

/**
 * Reverse lookup for `Level` enums
 */
export const __Level = (<any>exports).Level;

export interface LogEntry extends Array<any> {
    [0]: Level;
    [1]: string;
    [2]: number;
    [id: number]: any;
}

export interface LogEntryObj extends IID<string> {
    level: Level;
    time: number;
    body: any[];
}

export interface ILogger extends ISubscribable<LogEntry> {
    fine(...args: any[]);
    debug(...args: any[]);
    info(...args: any[]);
    warn(...args: any[]);
    severe(...args: any[]);
}

export type DateFormat = (epoch: number) => string;
export type BodyFormat = (body: any[]) => string;
