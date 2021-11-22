import { eqDelta as $eq } from "@thi.ng/math/eqdelta";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    eqDelta,
    sd,
    standardize,
    variance,
    vmean,
    vmedian,
} from "../src/index.js";

const SAMPLES = [7, 4, 9, 4, 5, 4, 5, 2];

group("vectors", {
    vmean: () => {
        assert.strictEqual(vmean(SAMPLES), 5);
    },
    vmedian: () => {
        assert.strictEqual(vmedian(SAMPLES), 5);
    },
    variance: () => {
        assert.strictEqual(variance(SAMPLES), 4);
    },
    sd: () => {
        assert.ok($eq(sd(SAMPLES), 2.138, 0.001));
    },
    standardize: () => {
        assert.ok(
            eqDelta(
                standardize([], SAMPLES),
                [
                    1.2159, 0.6948, 1.5633, 0.6948, 0.8685, 0.6948, 0.8685,
                    0.3474,
                ],
                0.001
            )
        );
    },
});
