#!/usr/bin/env node

const fs = require("fs");
const cproc = require("child_process");
const hdiff = require("@thi.ng/hdiff");

let src1;
let src2;
let headerBody;

const args = process.argv.slice(2);
if (args.length === 3) {
    const [path, rev1, rev2] = args;
    src1 = cproc.execSync(`git show ${rev1}:${path}`).toString();
    src2 = cproc.execSync(`git show ${rev2}:${path}`).toString();
    headerBody = ["header", ["h1", path], ["code", `${rev1} ⇌ ${rev2}`]];
} else if (args.length === 2) {
    const [rev1, rev2] = args;
    src1 = fs.readFileSync(rev1).toString();
    src2 = fs.readFileSync(rev2).toString();
    headerBody = ["header", ["h1", "File diff"], ["code", `${rev1} ⇌ ${rev2}`]];
} else {
    console.log("Usage:\n\thdiff file1 file2\n\thdiff relpath gitrev1 gitrev2");
    process.exit(1);
}

console.log(hdiff.generateHtml(hdiff.computeDiff(src1, src2), headerBody));
