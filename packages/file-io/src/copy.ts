// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { copyFileSync } from "node:fs";
import { copyFile as $copy } from "node:fs/promises";
import { maskedPath } from "./mask.js";

export const copyFile = (src: string, dest: string, logger?: ILogger) => {
	logger?.debug(maskedPath(`copying file: ${src} → ${dest}`));
	copyFileSync(src, dest);
};

export const copyFileAsync = (src: string, dest: string, logger?: ILogger) => {
	logger?.debug(maskedPath(`copying file: ${src} → ${dest}`));
	return $copy(src, dest);
};
