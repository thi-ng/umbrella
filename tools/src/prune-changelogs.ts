import { files, readText } from "./io";
import { writeFileSync } from "fs";

const RE =
    /## \[[0-9.]+\].+$\n\n\*\*Note:\*\* Version bump only for package.*$\n{6}/gm;

for (let f of files("packages", "CHANGELOG.md")) {
    const src = readText(f);
    const dest = src.replace(RE, "");
    if (dest !== src) {
        console.log("pruning:", f);
        writeFileSync(f, dest);
    }
}
