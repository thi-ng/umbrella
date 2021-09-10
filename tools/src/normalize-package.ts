import { selectDefinedKeysObj } from "@thi.ng/associative";
import { compareByKey } from "@thi.ng/compare";
import { assocObj } from "@thi.ng/transducers";
import { readJSON } from "./io";

export const normalizePackage = (pkg: any) => {
    pkg.type = "module";
    delete pkg.main;
    delete pkg["umd:main"];

    injectTestament(pkg);
    cleanupFiles(pkg);

    return selectDefinedKeysObj(pkg, [
        "name",
        "version",
        "description",
        "type",
        "module",
        "typings",
        "bin",
        "sideEffects",
        "repository",
        "homepage",
        "funding",
        "author",
        "license",
        "scripts",
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "peerDependenciesMeta",
        "keywords",
        "publishConfig",
        "browser",
        "files",
        "exports",
        "thi.ng",
    ]);
};

const injectTestament = (pkg: any) => {
    if (pkg.name === "@thi.ng/testament") return;
    const TinDev = "@thi.ng/testament" in (pkg.devDependencies || {});
    const TinPeer = "@thi.ng/testament" in (pkg.peerDependencies || {});
    if (!TinPeer && !TinDev) {
        !pkg.devDependencies && (pkg.devDependencies = {});
        const version = readJSON("packages/testament/package.json").version;
        pkg.devDependencies["@thi.ng/testament"] = `^${version}`;
        pkg.devDependencies = sortObject(pkg.devDependencies);
    }
    if (pkg.scripts.test === "mocha test") {
        pkg.scripts.test = "testament test";
    }
};

const cleanupFiles = (pkg: any) => {
    pkg.files = (<string[]>pkg.files).filter((x) => !["lib"].includes(x));
};

const sortObject = (obj: any) =>
    assocObj(Object.entries(obj).sort(compareByKey(0)));
