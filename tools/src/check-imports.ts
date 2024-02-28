import { unionR } from "@thi.ng/associative";
import { compareByKeys2 } from "@thi.ng/compare";
import { dirs, files, readJSON, readText } from "@thi.ng/file-io";
import { split } from "@thi.ng/strings";
import {
	assocObj,
	comp,
	conj,
	filter,
	keep,
	keys,
	map,
	mapcat,
	pluck,
	push,
	transduce,
} from "@thi.ng/transducers";
import { LOGGER } from "./api.js";
import { shortName } from "./partials/package.js";

const PKG_ROOT = "packages";
const EX_ROOT = "examples";

const RE_IMPORT = /\}? from "(?!\.)([a-z0-9@/.-]+)";/;

const NON_COMMENT_LINES = filter((line: string) => !/^\s+\*\s/.test(line));

const xform = comp(
	mapcat((f: string) => split(readText(f, LOGGER))),
	NON_COMMENT_LINES,
	map((line) => RE_IMPORT.exec(line)),
	keep(),
	map((x) =>
		x![1].startsWith("@thi.ng")
			? x![1].split("/").slice(0, 2).join("/")
			: x![1]
	)
);

const usedDependencies = (rootDir: string) =>
	transduce(xform, conj(), files(rootDir, ".ts"));

const updateImports = (root: string, latest = false, exitOnFail = true) => {
	LOGGER.info("checking", root);
	const pkgPath = root + "/package.json";
	const deps = usedDependencies(root + "/src");
	const pkg = readJSON(pkgPath);
	!pkg.dependencies && (pkg.dependencies = {});
	const mergedDeps = unionR<string>([deps, keys(pkg.dependencies)]);
	let edit = false;
	const pairs: [string, string][] = [];
	for (let d of mergedDeps) {
		if (!d.startsWith("@thi.ng")) {
			if (d.startsWith("node:") || d.startsWith("bun:") || d === "tslib")
				continue;
			if (deps.has(d) && !pkg.dependencies[d]) {
				LOGGER.warn("missing 3rd party dependency:", d);
				exitOnFail && process.exit(1);
			} else if (!deps.has(d)) {
				delete pkg.dependencies[d];
				edit = true;
			} else {
				pairs.push([d, pkg.dependencies[d]]);
			}
		} else if (deps.has(d) && !pkg.dependencies[d]) {
			const depPkg = readJSON(`${PKG_ROOT}/${shortName(d)}/package.json`);
			pairs.push([d, latest ? "workspace:^" : `^${depPkg.version}`]);
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
		exitOnFail && process.exit(1);
	}
};

const checkLocalImports = (root: string, exitOnFail = true) => {
	for (let f of files(root + "/src", ".ts")) {
		const badImports = transduce(
			comp(
				NON_COMMENT_LINES,
				map((line) => /from "(\.\/[a-z0-9/-]+)"/.exec(line!)),
				keep(),
				pluck(1)
			),
			push(),
			split(readText(f, LOGGER))
		);
		if (badImports.length) {
			LOGGER.warn("bad local imports:", f, badImports);
			exitOnFail && process.exit(1);
		}
	}
};

const checkPackage = (root: string, latest = false) => {
	updateImports(root, latest, root.startsWith(PKG_ROOT));
	if (root.startsWith(PKG_ROOT)) checkLocalImports(root);
};

const checkPackages = (parent: string, latest = false) => {
	for (let pkg of dirs(parent, "", 1)) {
		try {
			checkPackage(pkg, latest);
		} catch (e) {
			LOGGER.warn("\terror processing package", pkg);
			console.log(e);
		}
	}
};

const project = process.argv[2];

project
	? project === EX_ROOT
		? checkPackages(EX_ROOT, true)
		: checkPackage(project, project.startsWith(EX_ROOT))
	: checkPackages(PKG_ROOT);
