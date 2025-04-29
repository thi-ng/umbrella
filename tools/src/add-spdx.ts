// SPDX-License-Identifier: Apache-2.0
import { files, readText, writeFile } from "@thi.ng/file-io";
import { LOGGER } from "./api.js";

const sourceFiles = [...files(".", /(?<!\.d)\.(ts|zig)$/)].filter(
	(x) =>
		!/\/(deprecated|dev|export|fixtures|node_modules|generated|\.?zig-cache|zig\/api\.zig|binary.ts)/.test(
			x
		)
);

for (let f of sourceFiles) {
	let src = readText(f);
	if (/^\/\/ SPDX-License/.test(src)) continue;
	LOGGER.info("patching:", f);
	src = "// SPDX-License-Identifier: Apache-2.0\n" + src;
	writeFile(f, src);
}
