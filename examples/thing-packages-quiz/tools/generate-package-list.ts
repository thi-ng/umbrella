// SPDX-License-Identifier: Apache-2.0
import { dirs, writeText } from "@thi.ng/file-io";
import { map } from "@thi.ng/transducers";

const packages = [
	...map(
		(x) => `"${x.substring(x.lastIndexOf("/") + 1)}"`,
		dirs("../../packages", "", 1)
	),
].sort();

const src = `// generated @ ${new Date().toISOString()} - DO NOT EDIT!
// run \`yarn tool:packages\` to re-generate...

export const packages = [
	${packages.join(",\n\t")}
];
`;

writeText("src/packages.ts", src);
