import * as fs from "fs";
import { ISubscriber } from "@thi.ng/rstream/api";

export function writeFile(path: string): ISubscriber<string> {
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
