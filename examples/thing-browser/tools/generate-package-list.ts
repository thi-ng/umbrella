// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";
import { files, readJSON, writeJSON } from "@thi.ng/file-io";
import {
	comp,
	concat,
	filter,
	map,
	push,
	transduce,
} from "@thi.ng/transducers";
import type { Item } from "../src/api.js";

const ALIASES: IObjectOf<string> = {
	edges: "edge",
	editlog: "edit",
	interaction: "interactive",
};

const pkgs = transduce(
	comp(
		map((f) => {
			const p = readJSON(f);
			return {
				id: p.name,
				desc: p.description,
				tags: [
					...new Set<string>(
						p.keywords?.map((x: string) => ALIASES[x] ?? x)
					),
				],
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
