import { ALogger } from "./alogger.js";
import type { LogEntry, LogLevel, LogLevelName } from "./api.js";

export class MemoryLogger extends ALogger {
	journal: LogEntry[] = [];

	constructor(
		id: string,
		level?: LogLevel | LogLevelName,
		public limit = 1e3
	) {
		super(id, level);
	}

	protected log(level: LogLevel, args: any[]) {
		if (this.journal.length >= this.limit) this.journal.shift();
		this.journal.push([level, this.id, Date.now(), ...args]);
	}
}
