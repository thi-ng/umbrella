import { ALogger } from "./alogger.js";
import { LogLevel, type LogLevelName } from "./api.js";
import { expandArgsJSON } from "./utils.js";

/**
 * {@link ILogger} implementation writing messages to provided NodeJS-compatible
 * `WriteStream`, e.g. `process.stderr`. Any non-string or non-numeric args
 * given to {@link StreamLogger.log} will be automatically serialized to JSON.
 */
export class StreamLogger extends ALogger {
	constructor(
		protected target: NodeJS.WriteStream,
		id: string,
		level: LogLevel | LogLevelName = LogLevel.FINE
	) {
		super(id, level);
	}

	protected log(level: LogLevel, args: any[]): void {
		this.target.write(
			`[${LogLevel[level]}] ${this.id}: ${expandArgsJSON(args)}\n`
		);
	}
}
