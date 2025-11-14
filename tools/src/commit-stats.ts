// SPDX-License-Identifier: Apache-2.0
import { lower, percent, split } from "@thi.ng/strings";
import {
	assocObj,
	comp,
	filter,
	keep,
	map,
	normFrequenciesAuto,
	transduce,
} from "@thi.ng/transducers";
import { execFileSync } from "node:child_process";

const args =
	"log --all --pretty=format:%ad~~%s --date=iso-strict --since=2018-01-01";

console.log(args);

const commits = execFileSync("git", args.split(" ")).toString("utf8");

const xfPreproc = comp(
	map(lower),
	map((x) => x.split("~~"))
);

const types = transduce(
	comp(
		xfPreproc,
		map(([_, msg]) => /^(\w+)\(/.exec(msg)),
		keep(),
		map((x) => x[1]),
		filter((x) => ["feat", "refactor", "docs", "fix", "perf"].includes(x))
	),
	normFrequenciesAuto(),
	split(commits)
);

console.log(
	assocObj(
		[...types.keys()]
			.sort()
			.map((x) => <[string, string]>[x, percent(1)(types.get(x)!)])
	)
);
