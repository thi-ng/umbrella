import { centroidStrategy, gaussian } from "@thi.ng/fuzzy";
import { eqDelta } from "@thi.ng/math";
import * as assert from "assert";
import { fuzzySetToAscii, instrumentStrategy } from "../src";

describe("fuzzy-viz", () => {
    it("strategy (ascii)", () => {
        const strategy = instrumentStrategy(
            centroidStrategy({ samples: 1000 }),
            fuzzySetToAscii({ width: 40, height: 8 })
        );
        assert(eqDelta(strategy(gaussian(5, 2), [0, 10]), 5));
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
    });
});
