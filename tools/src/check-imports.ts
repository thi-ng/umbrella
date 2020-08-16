import { unionR } from "@thi.ng/associative";
import { compareByKeys2 } from "@thi.ng/compare";
import {
    assocObj,
    comp,
    conj,
    filter,
    keys,
    map,
    mapcat,
    transduce,
} from "@thi.ng/transducers";
import { readFileSync } from "fs";
import { files, readJSON } from "./io";
import { shortName } from "./partials/package";

const RE_IMPORT = /\}? from "(?!\.)([a-z0-9@/.-]+)";/;

const xform = comp(
    mapcat((f: string) => readFileSync(f).toString().split("\n")),
    map((line) => RE_IMPORT.exec(line)),
    filter((x) => !!x),
    map((x) => x![1])
);

const usedDependencies = (rootDir: string) =>
    transduce(xform, conj(), files(rootDir, ".ts"));

const updateImports = (project: string) => {
    const pkgPath = project + "/package.json";
    const deps = usedDependencies(project + "/src");
    const pkg = readJSON(pkgPath);
    !pkg.dependencies && (pkg.dependencies = {});
    const mergedDeps = unionR<string>([deps, keys(pkg.dependencies)]);
    let edit = false;
    const pairs: [string, string][] = [];
    for (let d of mergedDeps) {
        if (!d.startsWith("@thi.ng")) continue;
        if (deps.has(d) && !pkg.dependencies[d]) {
            const depPkg = readJSON(`packages/${shortName(d)}/package.json`);
            pairs.push([d, `^${depPkg.version}`]);
            edit = true;
        } else if (!deps.has(d)) {
            delete pkg.dependencies[d];
            edit = true;
        } else {
            pairs.push([d, pkg.dependencies[d]]);
        }
    }
    if (edit) {
        const result = assocObj(pairs.sort(compareByKeys2(0, 1)));
        console.log(JSON.stringify(result, null, 2));
    } else {
        console.log("ok");
    }
};

const project = process.argv[2];
updateImports(project);
