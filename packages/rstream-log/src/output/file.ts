import { isNode } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import { ISubscriber } from "@thi.ng/rstream";

export const writeFile =
    (path: string): ISubscriber<string> => {
        if (isNode()) {
            const fs = require("fs");
            return {
                next(msg) {
                    fs.appendFile(path, msg + "\n", (e) => {
                        if (e) {
                            process.stderr.write(e.message);
                        }
                    });
                }
            };
        }
        unsupported("only available in NodeJS");
    };
