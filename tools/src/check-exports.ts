import { equivSet } from "@thi.ng/equiv";
import { existsSync, readdirSync, statSync, writeFileSync } from "fs";
import { readJSON } from "./io";

const subdirs = (root: string, ignore = ["zig-cache"]) => {
    const dirs: string[] = [];
    for (let f of readdirSync(root)) {
        const d = `${root}/${f}`;
        statSync(d).isDirectory() && !ignore.includes(f) && dirs.push(f);
    }
    return dirs;
};

const processPackage = (id: string) => {
    const pkkRoot = `packages/${id}`;
    const pkgPath = `${pkkRoot}/package.json`;
    console.log("checking", pkgPath);
    const pkg = readJSON(pkgPath);
    const srcDirs = subdirs(`${pkkRoot}/src`).sort();
    const hasBin = existsSync(`${pkkRoot}/bin`);
    const oldFiles = new Set(pkg.files);
    const newFiles = ["*.js", "*.d.ts", ...(hasBin ? ["bin"] : []), ...srcDirs];
    if (!equivSet(oldFiles, new Set(newFiles))) {
        console.log("fixing pkg", newFiles);
        pkg.files = newFiles;
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + "\n");
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
