import { ALogger } from "./alogger.js";
import {
	LogLevel,
	type LogEntry,
	type LogLevelName,
	type ILogger,
} from "./api.js";
import { expandArgsJSON } from "./utils.js";

/**
 * {@link ILogger} implementation writing messages to provided NodeJS-compatible
 * `WriteStream`, e.g. `process.stderr`. Any non-string or non-numeric args
 * given to {@link StreamLogger.log} will be automatically serialized to JSON.
 */
export class StreamLogger extends ALogger {
	constructor(
		protected target: NodeJS.WriteStream,
		id?: string,
		level?: LogLevel | LogLevelName,
		parent?: ILogger
	) {
		super(id, level, parent);
	}

	childLogger(id?: string, level?: LogLevel): StreamLogger {
		return new StreamLogger(this.target, id, level ?? this.level, this);
	}

	logEntry(e: LogEntry) {
		if (e[0] < this.level) return;
		this.target.write(
			`[${LogLevel[e[0]]}] ${e[1]}: ${expandArgsJSON(e.slice(3))}\n`
		);
		this.parent && this.parent.logEntry(e);
	}
}
