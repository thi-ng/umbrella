// SPDX-License-Identifier: Apache-2.0
import { centroidStrategy, gaussian } from "@thi.ng/fuzzy";
import { eqDelta } from "@thi.ng/math";
import { expect, test } from "bun:test";
import { fuzzySetToAscii, instrumentStrategy } from "../src/index.js";

test("strategy (ascii)", () => {
	const strategy = instrumentStrategy(
		centroidStrategy({ samples: 1000 }),
		fuzzySetToAscii({ width: 40, height: 8 })
	);
	expect(eqDelta(strategy(gaussian(5, 2), [0, 10]), 5)).toBeTrue();
	expect(strategy.deref()).toEqual([
		`.................▄▆█|█▆▄.................
...............▅████|████▅...............
.............▄██████|██████▄.............
...........▂▇███████|███████▇▂...........
..........▅█████████|█████████▅..........
.......▁▅███████████|███████████▅▁.......
.....▃▆█████████████|█████████████▆▃.....
▃▄▅▇████████████████|████████████████▇▅▄▃
                    ^ 5.00`,
	]);
});
