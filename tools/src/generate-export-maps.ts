import { files, readJSON, readText } from "@thi.ng/file-io";
import { readdirSync, statSync, writeFileSync } from "fs";
import { normalizePackage } from "./normalize-package.js";

const generatePackageExportMaps = (id: string) => {
    console.log("updating pkg:", id);

    const root = `packages/${id}`;
    const srcRoot = `${root}/src`;
    const pkgPath = `${root}/package.json`;
    let pkg = readJSON(pkgPath);

    const thing = pkg["thi.ng"];
    if (!thing || thing.exports !== false) {
        const exports: Record<string, any> = {
            ".": { default: "./index.js" },
        };
        for (let f of files(srcRoot, ".ts")) {
            if (/\/internal\/|\/index\.ts/.test(f)) continue;
            const src = readText(f);
            if (src.indexOf("// thing:no-export") !== -1) continue;
            // if (/\/index\.ts$/.test(f)) continue;
            const local = f.replace(srcRoot, ".").replace(".ts", "");
            exports[local] = { default: `${local}.js` };
        }
        pkg.exports = exports;
    }
    pkg = normalizePackage(pkg);
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + "\n", "utf-8");
};

const updatePackages = (parent = "packages") => {
    for (let pkg of readdirSync(parent)) {
        if (statSync(`${parent}/${pkg}`).isDirectory()) {
            try {
                generatePackageExportMaps(pkg);
            } catch (e) {
                console.warn("\terror processing package", pkg, e);
            }
        }
    }
};

const project = process.argv[2];

project ? generatePackageExportMaps(project) : updatePackages();
