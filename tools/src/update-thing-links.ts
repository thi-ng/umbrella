import { getIn } from "@thi.ng/paths";
import { execSync } from "child_process";
import { readdirSync, statSync, unlinkSync, writeFileSync } from "fs";
import { readJSON } from "./io.js";

const baseDir = "./packages/";
const tmpFile = `./temp-${Date.now()}`;

for (let f of readdirSync(baseDir)) {
    f = baseDir + f;
    if (f.indexOf(".DS_Store") >= 0 || !statSync(f).isDirectory) continue;
    try {
        const pkg = readJSON(f + "/package.json");
        const id = pkg.name.split("/")[1];
        if (getIn(pkg, ["thi.ng", "shortlink"]) === false) {
            console.log(`\tskipping: ${id}`);
            continue;
        }
        const branch = getIn(pkg, ["thi.ng", "branch"]) || "develop";
        const html = `<html><head><meta http-equiv="refresh" content="0; url=https://github.com/thi-ng/umbrella/tree/${branch}/packages/${id}"/></head></html>`;
        console.log(`${id} -> ${branch}`);
        writeFileSync(tmpFile, html);
        execSync(
            `aws s3 cp ${tmpFile} s3://thi.ng/${id} --profile thing-umbrella --acl public-read --content-type "text/html" --cache-control "no-cache"`
        );
    } catch (e) {
        console.warn(`error: ${(<Error>e).message}`);
    }
}

unlinkSync(tmpFile);
