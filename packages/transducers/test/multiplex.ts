import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { iterator, map, mapcat, multiplex, step } from "../src/index.js";
import { identity } from "@thi.ng/api";

group("multiplex/step", {
	example: () => {
		assert.deepStrictEqual(
			[
				...iterator(
					multiplex(
						map((x) => x.charAt(0)),
						map((x) => x.toUpperCase()),
						map((x) => x.length)
					),
					["Alice", "Bob", "Charlie"]
				),
			],
			[
				["A", "ALICE", 5],
				["B", "BOB", 3],
				["C", "CHARLIE", 7],
			]
		);
	},
	unwrap: () => {
		assert.deepStrictEqual(
			[
				...iterator(multiplex(mapcat(identity), map(identity)), [
					[1, 2],
					[3],
				]),
			],
			[
				[
					[1, 2],
					[1, 2],
				],
				[3, [3]],
			]
		);
		assert.deepStrictEqual(
			step<number[], number>(mapcat((x) => x))([1, 2]),
			[1, 2]
		);
		assert.deepStrictEqual(
			step<number[], number>(mapcat((x) => x))([3]),
			3
		);
	},
	"no unwrap": () => {
		assert.deepStrictEqual(
			[
				...iterator(
					multiplex([mapcat(identity), false], map(identity)),
					[[1, 2], [3]]
				),
			],
			[
				[
					[1, 2],
					[1, 2],
				],
				[[3], [3]],
			]
		);
		assert.deepStrictEqual(
			step<number[], number>(
				mapcat((x) => x),
				false
			)([1, 2]),
			[1, 2]
		);
		assert.deepStrictEqual(
			step<number[], number>(
				mapcat((x) => x),
				false
			)([3]),
			[3]
		);
	},
});
