import { isString } from "@thi.ng/checks";
import { writeText } from "@thi.ng/file-io";
import type { ILogger } from "@thi.ng/logger";

export const maybeWriteText = (
	out: string | undefined,
	body: string | string[],
	logger: ILogger
) => {
	body = isString(body) ? body : body.join("\n");
	out ? writeText(out, body, logger) : console.log(body);
};
