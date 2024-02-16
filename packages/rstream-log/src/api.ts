import type { IID } from "@thi.ng/api";
import type { ILogger as APILogger, LogEntry, LogLevel } from "@thi.ng/logger";
import type { ISubscribable } from "@thi.ng/rstream";

export interface LogEntryObj extends IID<string> {
	level: LogLevel;
	time: number;
	body: any[];
}

export interface ILogger extends APILogger, ISubscribable<LogEntry> {}

export type DateFormat = (epoch: number) => string;
export type BodyFormat = (body: any[]) => string;
