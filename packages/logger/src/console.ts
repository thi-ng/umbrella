import { ALogger } from "./alogger.js";
import { LogLevel, type LogEntry, type ILogger } from "./api.js";
import { expandArgs } from "./utils.js";

/**
 * {@link ILogger} implementation writing messages via `console.log`.
 */
export class ConsoleLogger extends ALogger {
	childLogger(id?: string, level?: LogLevel): ConsoleLogger {
		return new ConsoleLogger(id, level ?? this.level, this);
	}

	logEntry(e: LogEntry) {
		if (e[0] < this.level) return;
		console.log(`[${LogLevel[e[0]]}] ${e[1]}:`, ...expandArgs(e.slice(3)));
		this.parent && this.parent.logEntry(e);
	}
}
