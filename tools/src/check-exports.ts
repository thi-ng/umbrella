import { readdirSync, statSync, writeFileSync } from "fs";
import { readJSON } from "./io";

const subdirs = (root: string) => {
    const dirs: string[] = [];
    for (let f of readdirSync(root)) {
        const d = `${root}/${f}`;
        statSync(d).isDirectory() && dirs.push(f);
    }
    return dirs;
};

const processPackage = (id: string) => {
    const pkgPath = `packages/${id}/package.json`;
    console.log("checking", pkgPath);
    const pkg = readJSON(pkgPath);
    const srcDirs = subdirs(`packages/${id}/src`);
    const newFiles = ["*.js", "*.d.ts", "lib", ...srcDirs.sort()];
    const oldLength = pkg.files.length;
    const newLength = newFiles.length;
    if (
        oldLength !== newLength &&
        !(pkg.files.includes("bin") && newLength === oldLength - 1)
    ) {
        console.log("fixing pkg", newFiles);
        pkg.files = newFiles;
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 4));
    } else {
        console.log("ok");
    }
};

const pkg = process.argv[2];

if (pkg) {
    processPackage(pkg);
} else {
    for (let p of readdirSync("packages")) {
        if (statSync(`packages/${p}`).isDirectory()) {
            processPackage(p);
        }
    }
}
