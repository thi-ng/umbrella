// SPDX-License-Identifier: Apache-2.0
import { ALogger } from "./alogger.js";
import {
	LogLevel,
	type ILogger,
	type LogEntry,
	type LogLevelName,
} from "./api.js";
import { expandArgsJSON } from "./utils.js";

/**
 * {@link ILogger} implementation writing messages to provided NodeJS-compatible
 * `WritableStream`, e.g. `process.stderr` or `http.ServerResponse`. Any
 * non-string or non-numeric args given to {@link StreamLogger.log} will be
 * automatically serialized to JSON (using {@link expandArgsJSON}).
 */
export class StreamLogger extends ALogger {
	constructor(
		protected target: NodeJS.WritableStream,
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
			`[${LogLevel[e[0]]}] ${e[1]}: ${expandArgsJSON(e.slice(3)).join(
				" "
			)}\n`
		);
		this.parent?.logEntry(e);
	}
}
