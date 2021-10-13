import { unlinkSync } from "fs";
import { files } from "./io.js";

for (let f of files("packages", ".map")) {
    if (f.indexOf("/lib/") === -1) {
        console.log(f);
        unlinkSync(f);
    }
}
