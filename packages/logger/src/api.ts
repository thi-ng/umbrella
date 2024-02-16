export enum LogLevel {
	FINE,
	DEBUG,
	INFO,
	WARN,
	SEVERE,
	NONE,
}

export type LogLevelName =
	| "FINE"
	| "DEBUG"
	| "INFO"
	| "WARN"
	| "SEVERE"
	| "NONE";

export interface ILogger {
	/**
	 * This logger's configured minimum log level. Any log messages with a lower
	 * level will not be processed and/or propagated further.
	 */
	level: LogLevel;
	/**
	 * Parent logger. See {@link ILogger.logEntry}.
	 */
	parent?: ILogger;
	/**
	 * Returns true if the logger is currently enabled for given `level`.
	 *
	 * @param level
	 */
	enabled(level: LogLevel): boolean;
	/**
	 * Syntax sugar for {@link ILogger.logEntry} and guard to produce a log
	 * message with level {@link LogLevel.FINE}.
	 *
	 * @param args
	 */
	fine(...args: any[]): void;
	/**
	 * Syntax sugar for {@link ILogger.logEntry} and guard to produce a log
	 * message with level {@link LogLevel.DEBUG}.
	 *
	 * @param args
	 */
	debug(...args: any[]): void;
	/**
	 * Syntax sugar for {@link ILogger.logEntry} and guard to produce a log
	 * message with level {@link LogLevel.INFO}.
	 *
	 * @param args
	 */
	info(...args: any[]): void;
	/**
	 * Syntax sugar for {@link ILogger.logEntry} and guard to produce a log
	 * message with level {@link LogLevel.WARN}.
	 *
	 * @param args
	 */
	warn(...args: any[]): void;
	/**
	 * Syntax sugar for {@link ILogger.logEntry} and guard to produce a log
	 * message with level {@link LogLevel.SEVERE}.
	 *
	 * @param args
	 */
	severe(...args: any[]): void;
	/**
	 * If this logger has a {@link ILogger.parent}, it will simply forward the
	 * given log entry to it. Otherwise this method performs the actual logging.
	 *
	 * @param e
	 */
	logEntry(e: LogEntry): void;
	/**
	 * Configures the given logger to become a child of this one (i.e. by
	 * setting its {@link ILogger.parent} to this instance).
	 *
	 * @param logger
	 */
	addChild(logger: ILogger): ILogger;
	/**
	 * Obtain a new logger instance (usually of same type) with given `id` and
	 * optional custom log level (default is current log level of this
	 * instance). The new instance will be configured as child logger for this
	 * instance.
	 *
	 * @param id
	 * @param level
	 */
	childLogger(id?: string, level?: LogLevel): ILogger;
}

/**
 * Tuple type describing a single log entry.
 */
export interface LogEntry extends Array<any> {
	/**
	 * Entry's associated log level
	 */
	[0]: LogLevel;
	/**
	 * Logger ID
	 */
	[1]: string;
	/**
	 * Timestamp
	 */
	[2]: number;
	/**
	 * Log entry body (any number/type of arguments given)
	 */
	[id: number]: any;
}
