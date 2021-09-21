import type { IID } from "@thi.ng/api";
import type { ILogger as APILogger, LogLevel } from "@thi.ng/logger";
import type { ISubscribable } from "@thi.ng/rstream";

export interface LogEntry extends Array<any> {
    [0]: LogLevel;
    [1]: string;
    [2]: number;
    [id: number]: any;
}

export interface LogEntryObj extends IID<string> {
    level: LogLevel;
    time: number;
    body: any[];
}

export interface ILogger extends APILogger, ISubscribable<LogEntry> {}

export type DateFormat = (epoch: number) => string;
export type BodyFormat = (body: any[]) => string;
