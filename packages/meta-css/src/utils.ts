import { isString } from "@thi.ng/checks";
import { writeText } from "@thi.ng/file-io";
import type { ILogger } from "@thi.ng/logger";

export const maybeWriteText = (
	outDir: string,
	file: string,
	body: string | string[],
	logger: ILogger
) => {
	body = isString(body) ? body : body.join("\n");
	outDir ? writeText(outDir + file, body, logger) : console.log(body);
};
