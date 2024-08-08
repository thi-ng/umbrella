import { files, readJSON, writeJSON } from "@thi.ng/file-io";
import { LOGGER } from "./api.js";

for (let x of files(".", /(examples|packages)\/.+\/package.json$/, 3)) {
	const pkg = readJSON(x, LOGGER);
	if (pkg.keywords) {
		pkg.keywords.sort();
	} else {
		if (pkg.name.startsWith("@example")) {
			pkg.keywords = ["example"];
		}
	}
	writeJSON(x, pkg, null, "\t", LOGGER);
}
