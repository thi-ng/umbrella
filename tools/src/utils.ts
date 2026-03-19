// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { execFileSync } from "node:child_process";
import { LOGGER } from "./api.js";
import { RCLONE_PROFILE } from "./aws-config.js";

export const compressFile = (path: string) => {
	execFileSync("brotli", ["-9", "-f", path]);
};

export const execAWS = (args: string, logger: ILogger = LOGGER) => {
	const $args = args.split(" ");
	logger.info("aws", args);
	return execFileSync("aws", $args).toString();
};

export const execRclone = (
	src: string,
	dest: string,
	dryRun = false,
	logger: ILogger = LOGGER
) => {
	const args = [
		"sync",
		"--exclude",
		".*",
		"--delete-excluded",
		src,
		`${RCLONE_PROFILE}:${dest}`,
	];
	if (dryRun) args.push("--dry-run");
	logger.info("rclone", args);
	return execFileSync(`rclone`, args).toString();
};
