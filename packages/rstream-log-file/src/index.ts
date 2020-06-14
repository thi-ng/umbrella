import { appendFile } from "fs";
import type { ISubscriber } from "@thi.ng/rstream";

export const writeFile = (path: string): ISubscriber<string> => ({
    next(msg) {
        appendFile(path, msg + "\n", (e) => {
            if (e) {
                process.stderr.write(e.message);
            }
        });
    },
});
