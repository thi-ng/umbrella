import { cogStrategy, gaussian } from "@thi.ng/fuzzy";
import * as assert from "assert";
import { fuzzySetToAscii, instrumentStrategy } from "../src";

describe("fuzzy-viz", () => {
    it("strategy (ascii)", () => {
        const strategy = instrumentStrategy(
            cogStrategy({ samples: 1000 }),
            fuzzySetToAscii({ width: 40, height: 8 })
        );
        assert.strictEqual(strategy(gaussian(5, 2), [0, 10]), 4.995);
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
