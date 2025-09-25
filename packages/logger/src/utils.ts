// SPDX-License-Identifier: Apache-2.0
import { LogLevel, type LogLevelName } from "./api.js";

/**
 * Helper function for {@link ILogger.logEntry}. Takes an array of log message
 * parts and expands those parts which are functions (by calling them). Other
 * parts remain as is. Returns expanded args.
 *
 * @remarks
 * Also see {@link expandArgsJSON}.
 *
 * @param args
 */
export const expandArgs = (args: any[]) =>
	args.map((x) => (typeof x === "function" ? x() : x));

/**
 * Similar to {@link expandArgs}, but also stringifies each part as JSON (unless
 * string or number).
 *
 * @param args
 */
export const expandArgsJSON = (args: any[]) =>
	args.map((x) => {
		if (typeof x === "function") x = x();
		if (!(typeof x === "string" || typeof x === "number")) {
			x = JSON.stringify(x);
		}
		return x;
	});

/**
 * Returns an {@link ILogger} method name for given log level.
 *
 * @param level
 */
export const methodForLevel = (level: LogLevel | LogLevelName) =>
	<"fine" | "debug" | "info" | "warn" | "severe">(
		(typeof level === "string" ? level : LogLevel[level]).toLowerCase()
	);
