import { identity } from "@thi.ng/api";
import { readText } from "@thi.ng/file-io";
import { expect, test } from "bun:test";
import {
	compactEmptyLines,
	packageTemplates,
	preincludeFile,
	tabsToSpaces,
	toc,
	transcludeFile,
	type Package,
} from "../src/index.js";

const DUMMY_PKG: Package = {
	name: "@thi.ng/foobar",
	version: "1.12.34",
	description: "Look upon my works and despair",
	author: "Asterix <asterix@example.com> (https://example.org)",
	homepage: "https://thi.ng",
	keywords: ["foo", "bar"],
	contributors: ["Obelix", "Dogmatix (https://dogmatix.com)"],
	license: "Apache-2.0",
};

test("transclude file", () => {
	const src = transcludeFile<Package>(`${import.meta.dir}/fixtures/main.md`, {
		user: DUMMY_PKG,
		templates: {
			...packageTemplates<Package>(identity, {
				hdContributors: "##### Collaborators\n\n",
			}),
		},
		pre: [preincludeFile],
		post: [
			toc({ title: "## Contents\n\n" }),
			tabsToSpaces(),
			compactEmptyLines,
		],
	}).src;
	// writeFileSync(fixturePath("result.md"), src);
	expect(src).toBe(readText(`${import.meta.dir}/fixtures/result.md`));
});
