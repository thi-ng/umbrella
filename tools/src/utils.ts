// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { execFileSync } from "node:child_process";
import { LOGGER } from "./api.js";

export const compressFile = (path: string) => {
	execFileSync("brotli", ["-9", "-f", path]);
};

export const execAWS = (args: string, logger: ILogger = LOGGER) => {
	const $args = args.split(" ");
	logger.info("aws", args);
	return execFileSync("aws", $args).toString();
};
