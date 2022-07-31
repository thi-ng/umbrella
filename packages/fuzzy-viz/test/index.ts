import { centroidStrategy, gaussian } from "@thi.ng/fuzzy";
import { eqDelta } from "@thi.ng/math";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { fuzzySetToAscii, instrumentStrategy } from "../src/index.js";

group("fuzzy-viz", {
	"strategy (ascii)": () => {
		const strategy = instrumentStrategy(
			centroidStrategy({ samples: 1000 }),
			fuzzySetToAscii({ width: 40, height: 8 })
		);
		assert.ok(eqDelta(strategy(gaussian(5, 2), [0, 10]), 5));
		assert.deepStrictEqual(strategy.deref(), [
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
	},
});
