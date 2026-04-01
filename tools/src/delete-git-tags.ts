// SPDX-License-Identifier: Apache-2.0
import { delayed } from "@thi.ng/compose";
import { readText, writeText } from "@thi.ng/file-io";
import { split } from "@thi.ng/strings";
import {
	comp,
	drop,
	filter,
	map,
	partition,
	push,
	transduce,
} from "@thi.ng/transducers";
import { execFileSync } from "node:child_process";
import { LOGGER } from "./api.js";

const CUTOFF_DATE = "2023-01-01";
const REMOTES = ["origin", "gh"];
const CHUNK_SIZE = 200;
const START_CHUNK = 0;

// git for-each-ref --sort=committerdate --format '%(refname:short) %(committerdate:short)' refs/tags
const oldTags = readText("oldtags.txt");

const tags = transduce(
	comp(
		map((line) => line.split(" ")),
		filter((x) => x.length < 2 || x[1] < CUTOFF_DATE)
	),
	push<string[]>(),
	split(oldTags)
);

writeText(
	"remove-tags.txt",
	tags.map((x) => x.join(" "))
);

let i = START_CHUNK;
for (let chunk of drop(START_CHUNK, partition(CHUNK_SIZE, true, tags))) {
	const ids = chunk.map((x) => x[0]);
	LOGGER.info(`deleting tags, chunk #${i}:`, ids);
	let result = execFileSync("git", ["tag", "-d", ...ids]).toString();
	LOGGER.info(result);
	for (let remote of REMOTES) {
		result = execFileSync("git", [
			"push",
			remote,
			"--delete",
			...ids,
		]).toString();
		LOGGER.info(result);
	}
	LOGGER.info("waiting 5 seconds...");

	// effectively waiting 10+ secs between updates
	// due to delay from multiple remotes...
	await delayed(null, 5000);

	i++;
}
