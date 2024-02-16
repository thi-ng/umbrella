import { ALogger } from "./alogger.js";
import type { ILogger, LogEntry, LogLevel, LogLevelName } from "./api.js";
import { expandArgs } from "./utils.js";

export class MemoryLogger extends ALogger {
	journal: LogEntry[] = [];

	constructor(
		id?: string,
		level?: LogLevel | LogLevelName,
		parent?: ILogger,
		public limit = 1e3
	) {
		super(id, level, parent);
	}

	childLogger(id?: string, level?: LogLevel): MemoryLogger {
		return new MemoryLogger(id, level ?? this.level, this, this.limit);
	}

	logEntry(e: LogEntry) {
		if (e[0] < this.level) return;
		if (this.journal.length >= this.limit) this.journal.shift();
		this.journal.push([e[0], e[1], e[2], ...expandArgs(e.slice(3))]);
		this.parent && this.parent.logEntry(e);
	}

	/**
	 * Clears the {@link MemoryLogger.journal} of all recorded log entries.
	 */
	clear() {
		this.journal.length = 0;
	}

	/**
	 * Returns an array of stringified payloads of all current journal log
	 * entries.
	 *
	 * @remarks
	 * Only the user provided args of each {@link LogEntry} (excluding log
	 * level, id, epoch) are included and concatenated as strings.
	 */
	messages() {
		return this.journal.map((x) => x.slice(3).join(" "));
	}
}
