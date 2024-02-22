import type { ISubscriber } from "@thi.ng/rstream";
import { appendFile } from "node:fs";

export const writeFile = (path: string): ISubscriber<string> => ({
	next(msg) {
		appendFile(path, msg + "\n", (e) => {
			if (e) {
				process.stderr.write((<Error>e).message);
			}
		});
	},
});
