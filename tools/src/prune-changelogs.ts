import { files, readText } from "./io";
import { writeFileSync } from "fs";

const RE =
    /## \[[0-9.]+\].+$\n\n\*\*Note:\*\* Version bump only for package.*$\n{6}/gm;

for (let f of files("packages", "CHANGELOG.md")) {
    console.log(f);
    writeFileSync(f, readText(f).replace(RE, ""));
}
