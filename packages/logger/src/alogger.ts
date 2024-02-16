import {
	LogLevel,
	type ILogger,
	type LogEntry,
	type LogLevelName,
} from "./api.js";

let __nextID = 0;
/**
 * Abstract {@link ILogger} base implementation.
 */
export abstract class ALogger implements ILogger {
	id: string;
	level: LogLevel;

	constructor(
		id?: string,
		level: LogLevel | LogLevelName = LogLevel.FINE,
		public parent?: ILogger
	) {
		this.id = id || `logger-${__nextID++}`;
		this.level = typeof level === "string" ? LogLevel[level] : level;
	}

	addChild(logger: ILogger): ILogger {
		logger.parent = this;
		return logger;
	}

	abstract childLogger(id: string, level?: LogLevel): ILogger;

	enabled(level: LogLevel) {
		return this.level <= level;
	}

	fine(...args: any[]) {
		this.log(LogLevel.FINE, args);
	}

	debug(...args: any[]) {
		this.log(LogLevel.DEBUG, args);
	}

	info(...args: any[]) {
		this.log(LogLevel.INFO, args);
	}

	warn(...args: any[]) {
		this.log(LogLevel.WARN, args);
	}

	severe(...args: any[]) {
		this.log(LogLevel.SEVERE, args);
	}

	protected log(level: LogLevel, args: any[]) {
		this.level <= level &&
			this.logEntry([level, this.id, Date.now(), ...args]);
	}

	abstract logEntry(entry: LogEntry): void;
}
