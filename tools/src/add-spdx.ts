// SPDX-License-Identifier: Apache-2.0
import { files, readText, writeFile } from "@thi.ng/file-io";
import { LOGGER } from "./api.js";

const sourceFiles = [...files(".", /(?<!\.d)\.(ts|zig)$/)].filter(
	(x) => !/\/(deprecated|dev|export|node_modules|\.?zig-cache)\//.test(x)
);

for (let f of sourceFiles) {
	let src = readText(f);
	if (/^\/\/ SPDX-License/.test(src)) continue;
	LOGGER.info("patching:", f);
	src = "// SPDX-License-Identifier: Apache-2.0\n" + src;
	writeFile(f, src);
}
