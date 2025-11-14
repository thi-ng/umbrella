// SPDX-License-Identifier: Apache-2.0
import { files, readJSON, writeJSON } from "@thi.ng/file-io";
import {
	transduce,
	concat,
	map,
	filter,
	push,
	comp,
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

writeJSON("src/packages.json", pkgs, null, "\t");
