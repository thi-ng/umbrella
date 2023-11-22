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
	 * This logger's configured minimum log level
	 */
	level: LogLevel;

	/**
	 * Returns true if the logger is currently enabled for given `level`.
	 *
	 * @param level
	 */
	enabled(level: LogLevel): boolean;

	fine(...args: any[]): void;
	debug(...args: any[]): void;
	info(...args: any[]): void;
	warn(...args: any[]): void;
	severe(...args: any[]): void;
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
