import { selectDefinedKeysObj } from "@thi.ng/associative";

export const normalizePackage = (pkg: any) => {
    pkg.type = "module";
    delete pkg.main;
    delete pkg["umd:main"];

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

const cleanupFiles = (pkg: any) => {
    pkg.files = (<string[]>pkg.files).filter((x) => !["lib"].includes(x));
};
