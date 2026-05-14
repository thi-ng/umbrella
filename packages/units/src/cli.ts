// SPDX-License-Identifier: Apache-2.0
import { cliApp, THING_HEADER, type CommandCtx } from "@thi.ng/args";
import { compareByKey } from "@thi.ng/compare/keys";
import { defFormat } from "@thi.ng/strings/format";
import { padRight } from "@thi.ng/strings/pad-right";
import { $eval } from "./dsl.js";
import { ALIASES, UNITS } from "./unit.js";

import "./units/index.js";

export interface CLIOpts {}

cliApp<CLIOpts, CommandCtx<CLIOpts, CLIOpts>>({
	name: "units",
	start: 3,
	opts: {},
	commands: {
		list: {
			desc: "List known units (optionally filtered by given pattern)",
			opts: {},
			inputs: [0, 1],
			fn: async ({ inputs }) => {
				const re = inputs.length ? new RegExp(inputs[0]) : null;
				const fmt = defFormat([
					padRight(10),
					padRight(32),
					(x: string) => x,
				]);
				console.log(
					fmt("symbol", "aliases", "name"),
					"\n" + "-".repeat(72)
				);
				for (let [sym, aliases] of Object.entries(ALIASES).sort(
					compareByKey(0)
				)) {
					if (
						re &&
						!(
							re.test(UNITS[sym].name) ||
							[...aliases, sym].some((x) => re.test(x))
						)
					)
						continue;
					console.log(fmt(sym, aliases.join(", "), UNITS[sym].name));
				}
			},
		},
		convert: {
			desc: "Unit conversion (x srcunit destunit)",
			opts: {},
			inputs: 3,
			fn: async ({ inputs }) => {
				console.log($eval(`(${inputs[2]} ${inputs[0]}${inputs[1]})`));
			},
		},
		calc: {
			desc: "Unit calculator (S-expression)",
			opts: {},
			inputs: 1,
			fn: async ({ inputs }) => {
				console.log($eval(inputs[0]));
			},
		},
	},
	ctx: async (ctx) => ctx,
	usage: {
		prefix:
			THING_HEADER(
				"@thi.ng/units",
				"1.4.0",
				"Unit converter & calculator"
			) + "\n",
	},
});
