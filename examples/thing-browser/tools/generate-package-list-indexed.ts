// SPDX-License-Identifier: Apache-2.0
import { files, readJSON, writeFile, writeJSON } from "@thi.ng/file-io";
import { compareLex } from "@thi.ng/compare";
import { serialize } from "@thi.ng/msgpack";
import {
	transduce,
	concat,
	map,
	filter,
	push,
	comp,
	mapcat,
	distinct,
	labeled,
	indexed,
	assocMap,
	mapIndexed,
	mapKeys,
	assocObj,
} from "@thi.ng/transducers";
import type { Item } from "../src/api.js";

const pkgs = transduce(
	comp(
		map((f) => {
			const p = readJSON(f);
			return {
				id: p.name,
				desc: p.description,
				tags: p.keywords,
				img: p["thi.ng"]?.screenshot,
			};
		}),
		filter((pkg) => !!pkg.tags)
	),
	push<Item>(),
	concat(
		files("../../packages", "package.json", 2),
		files("../../examples", "package.json", 2)
	)
);

// presort unique tags (w/ compareLex) before building index
const uniqueTags = [...distinct(mapcat((x) => x.tags, pkgs))].sort(compareLex);

const tagIndex = transduce(
	mapIndexed((i, x) => <[string, number]>[x, i]),
	assocObj<number>(),
	uniqueTags
);

const indexedPkgs = push(
	mapKeys(
		{
			tags: (tags: string[]) =>
				tags
					.slice()
					.sort(compareLex)
					.map((t) => tagIndex[t]),
		},
		true,
		pkgs
	)
);

writeJSON("src/packages.json", pkgs, null, "\t");
writeJSON(
	"src/packages-indexed.json",
	{ tags: tagIndex, projects: indexedPkgs },
	null,
	"\t"
);

writeFile("src/packages.msgpack", serialize(pkgs, { initial: 0x20000 }));
writeFile(
	"src/packages-indexed.msgpack",
	serialize({ tags: tagIndex, projects: indexedPkgs }, { initial: 0x20000 })
);
