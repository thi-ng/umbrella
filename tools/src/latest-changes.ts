import type { IObjectOf } from "@thi.ng/api";
import { FMT_yyyyMMdd } from "@thi.ng/date";
import { table } from "@thi.ng/markdown-table";
import {
	comp,
	groupByObj,
	keep,
	map,
	push,
	transduce,
} from "@thi.ng/transducers";
import { execFileSync } from "node:child_process";

const sha = process.argv[2];

const IGNORE_PACKAGES = new Set(["examples", "tools"]);

const CHANGE_TYPES: IObjectOf<number> = {
	refactor: 0,
	perf: 1,
	fix: 2,
	feat: 3,
};

const CHANGE_COLORS: IObjectOf<string> = {
	perf: "cyan",
	refactor: "cyan",
	fix: "orange",
	feat: "green",
};

const changes = transduce(
	comp(
		map((x) => {
			const match = /^([a-z]+)\(([a-z0-9_-]+)\):/i.exec(x);
			if (
				!match ||
				CHANGE_TYPES[match[1]] == null ||
				IGNORE_PACKAGES.has(match[2])
			)
				return;
			return [match[2], match[1]];
		}),
		keep((x) => x && x[0])
	),
	groupByObj<string[], any>({
		key: (x) => x[0],
		group: [
			() => "refactor",
			(acc) => acc,
			(acc, x) => (CHANGE_TYPES[x[1]] > CHANGE_TYPES[acc] ? x[1] : acc),
		],
	}),
	execFileSync("git", ["log", "--pretty=format:%s", `${sha}..`], {
		encoding: "utf-8",
	}).split("\n")
);

const res = table(
	["Status", "Package", "Version", "Changelog"],
	transduce(
		map((k) => [
			`![](https://img.shields.io/badge/-${changes[k]}-${
				CHANGE_COLORS[changes[k]]
			})`,
			`[\`@thi.ng/${k}\`](./packages/${k})`,
			`[![version](https://img.shields.io/npm/v/@thi.ng/${k}.svg)](https://www.npmjs.com/package/@thi.ng/${k})`,
			`[changelog](./packages/${k}/CHANGELOG.md)`,
		]),
		push(),
		Object.keys(changes).sort()
	)
);

console.log(`### Latest updates\n\nAs of: ${FMT_yyyyMMdd()}\n\n${res}`);
