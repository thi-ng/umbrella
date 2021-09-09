import { readdirSync, statSync, writeFileSync } from "fs";
import { files, readJSON } from "./io";
import { normalizePackage } from "./normalize-package";

const generatePackageExportMaps = (id: string) => {
    console.log("updating pkg:", id);
    const root = `packages/${id}`;
    const srcRoot = `${root}/src`;
    const pkgPath = `${root}/package.json`;
    let pkg = readJSON(pkgPath);
    pkg.type = "module";
    delete pkg.main;
    delete pkg["umd:main"];
    const exports: Record<string, any> = {
        ".": { import: "./index.js" },
    };
    for (let f of files(srcRoot, ".ts")) {
        if (/\/internal\/|\/index\.ts/.test(f)) continue;
        const local = f.replace(srcRoot, ".").replace(".ts", "");
        exports[local] = { import: `${local}.js` };
    }
    pkg.exports = exports;
    pkg = normalizePackage(pkg);
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + "\n", "utf-8");
};

const updatePackages = (parent = "packages") => {
    for (let pkg of readdirSync(parent)) {
        if (statSync(`${parent}/${pkg}`).isDirectory()) {
            try {
                generatePackageExportMaps(pkg);
            } catch (e) {
                console.warn("\terror processing package", pkg);
            }
        }
    }
};

const project = process.argv[2];

project ? generatePackageExportMaps(project) : updatePackages();
