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

	protected log(level: LogLevel, args: any[]) {
		if (this.journal.length >= this.limit) this.journal.shift();
		this.journal.push([level, this.id, Date.now(), ...args]);
	}
}
