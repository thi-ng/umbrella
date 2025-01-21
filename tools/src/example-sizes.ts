// SPDX-License-Identifier: Apache-2.0
import { files, writeText } from "@thi.ng/file-io";
import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { table } from "@thi.ng/markdown-table";
import { statSync } from "node:fs";

const stats = [...files("examples", /assets\/index-.+\.js$/)].map((x) => [
	/examples\/([a-z0-9-]+)/.exec(x)![1],
	statSync(x).size,
]);

writeText(
	`dev/example-sizes-${FMT_yyyyMMdd_HHmmss()}.md`,
	table(["name", "size"], stats)
);
