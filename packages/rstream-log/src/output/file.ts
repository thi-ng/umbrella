import { unsupported } from "@thi.ng/api/error";
import { isNode } from "@thi.ng/checks/is-node";
import { ISubscriber } from "@thi.ng/rstream/api";

export function writeFile(path: string): ISubscriber<string> {
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
}
