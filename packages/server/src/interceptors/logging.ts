import { isString } from "@thi.ng/checks";
import { LogLevel, type LogLevelName } from "@thi.ng/logger";
import type { Interceptor } from "../api.js";

const __method = (level: LogLevel | LogLevelName) =>
	<"fine" | "debug" | "info" | "warn" | "severe">(
		(isString(level) ? level : LogLevel[level]).toLowerCase()
	);

/**
 * Pre-interceptor to log request details (route, headers, query string args)
 * using the server's {@link ServerOpts.logger}. The `level` arg can be used to
 * customize which log level to use.
 *
 * @param level
 */
export const logRequest = (
	level: LogLevel | LogLevelName = "INFO"
): Interceptor => {
	const method = __method(level);
	return {
		pre: ({ logger, req, match, query, cookies }) => {
			logger[method]("request route", req.method, match);
			logger[method]("request headers", req.headers);
			logger[method]("request cookies", cookies);
			logger[method]("request query", query);
			return true;
		},
	};
};

/**
 * Pre-interceptor to log response details (status, route, headers) using the
 * server's {@link ServerOpts.logger}. The `level` arg can be used to customize
 * which log level to use.
 *
 * @param level
 */
export const logResponse = (
	level: LogLevel | LogLevelName = "INFO"
): Interceptor => {
	const method = __method(level);
	return {
		post: ({ logger, match, res }) => {
			logger[method]("response status", res.statusCode, match);
			logger[method]("response headers", res.getHeaders());
			return true;
		},
	};
};
