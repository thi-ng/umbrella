import type { ILogger } from "@thi.ng/logger";
import { unlinkSync } from "fs";

export const deleteFile = (path: string, logger?: ILogger) => {
    logger && logger.debug("deleting file:", path);
    unlinkSync(path);
};
