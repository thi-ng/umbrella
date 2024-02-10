import { equivSet } from "@thi.ng/equiv";
import { readJSON, writeJSON } from "@thi.ng/file-io";
import { existsSync, readdirSync, statSync } from "fs";
import { LOGGER } from "./api.js";

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
	LOGGER.info("checking", pkgPath);
	const pkg = readJSON(pkgPath, LOGGER);
	const srcDirs = subdirs(`${pkkRoot}/src`).sort();
	const hasBin = existsSync(`${pkkRoot}/bin`);
	const hasInclude = existsSync(`${pkkRoot}/include`);
	const hasSchema = existsSync(`${pkkRoot}/schema`);
	const hasSpecs = existsSync(`${pkkRoot}/specs`);
	const hasZig = existsSync(`${pkkRoot}/zig`);
	const oldFiles = new Set(pkg.files);
	const newFiles = [
		"./*.js",
		"./*.d.ts",
		...(hasBin ? ["bin"] : []),
		...(hasInclude ? ["include"] : []),
		...(hasSchema ? ["schema"] : []),
		...(hasSpecs ? ["specs"] : []),
		...(hasZig ? ["zig"] : []),
		...srcDirs,
	];
	if (!equivSet(oldFiles, new Set(newFiles))) {
		console.log("fixing pkg", newFiles);
		pkg.files = newFiles;
		writeJSON(pkgPath, pkg, null, "\t", LOGGER);
	} else {
		LOGGER.info("ok");
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
