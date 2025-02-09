// SPDX-License-Identifier: Apache-2.0
import { LogLevel, type LogLevelName } from "./api";

export const expandArgs = (args: any[]) =>
	args.map((x) => (typeof x === "function" ? x() : x));

export const expandArgsJSON = (args: any[]) =>
	args
		.map((x) => {
			if (typeof x === "function") x = x();
			if (!(typeof x === "string" || typeof x === "number")) {
				x = JSON.stringify(x);
			}
			return x;
		})
		.join(" ");

/**
 * Returns an {@link ILogger} method name for given log level.
 *
 * @param level
 */
export const methodForLevel = (level: LogLevel | LogLevelName) =>
	<"fine" | "debug" | "info" | "warn" | "severe">(
		(typeof level === "string" ? level : LogLevel[level]).toLowerCase()
	);
