import { ALogger } from "./alogger.js";
import { LogLevel, type ILogger, type LogEntry } from "./api.js";
import { NULL_LOGGER } from "./null.js";

/**
 * A special {@link ILogger} implementation which only proxies its
 * {@link ILogger.parent}. Used for {@link ROOT} to allow provision &
 * configuration of a single endpoint for an entire tree of child loggers. See
 * {@link ROOT} for more details.
 */
export class ProxyLogger extends ALogger {
	set(logger: ILogger) {
		this.parent = logger;
	}

	childLogger(id?: string, level?: LogLevel): ProxyLogger {
		return new ProxyLogger(id, level ?? this.level, this);
	}

	logEntry(e: LogEntry) {
		this.parent!.logEntry(e);
	}
}

/**
 * thi.ng/umbrella global root logger, by default configured to not produce any
 * output.
 *
 * @remarks
 * Users can attach and create hierarchies of child loggers (each one feeding
 * into this root logger) by calling {@link ILogger.childLogger} or
 * {@link ILogger.addChild}.
 *
 * To enable actual (global) logging output for this root logger, use
 * `.set()` and provide a {@link ILogger} implementation.
 *
 * @example
 * ```ts
 * const myLogger = ROOT.childLogger("custom");
 *
 * // use console output for root logger
 * ROOT.set(new ConsoleLogger("root"));
 *
 * // log message will be forwarded to root
 * myLogger.debug("hello");
 *
 * // [DEBUG] custom: hello
 * ```
 */
export const ROOT = new ProxyLogger("root", LogLevel.FINE, NULL_LOGGER);
