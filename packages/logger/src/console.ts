import { ALogger } from "./alogger.js";
import { LogLevel } from "./api.js";
import { expandArgs } from "./utils.js";

/**
 * {@link ILogger} implementation writing messages via `console.log`.
 */
export class ConsoleLogger extends ALogger {
	protected log(level: LogLevel, args: any[]) {
		console.log(`[${LogLevel[level]}] ${this.id}:`, ...expandArgs(args));
	}
}
