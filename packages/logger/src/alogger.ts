import { LogLevel, type ILogger, type LogLevelName } from "./api.js";

/**
 * Abstract {@link ILogger} base implementation.
 */
export abstract class ALogger implements ILogger {
	id: string;
	level: LogLevel;

	constructor(id: string, level: LogLevel | LogLevelName = LogLevel.FINE) {
		this.id = id;
		this.level = typeof level === "string" ? LogLevel[level] : level;
	}

	enabled(level: LogLevel) {
		return this.level <= level;
	}

	fine(...args: any[]): void {
		this.level <= LogLevel.FINE && this.log(LogLevel.FINE, args);
	}

	debug(...args: any[]): void {
		this.level <= LogLevel.DEBUG && this.log(LogLevel.DEBUG, args);
	}

	info(...args: any[]): void {
		this.level <= LogLevel.INFO && this.log(LogLevel.INFO, args);
	}

	warn(...args: any[]): void {
		this.level <= LogLevel.WARN && this.log(LogLevel.WARN, args);
	}

	severe(...args: any[]): void {
		this.level <= LogLevel.SEVERE && this.log(LogLevel.SEVERE, args);
	}

	protected abstract log(level: LogLevel, args: any[]): void;
}
