import type { IObjectOf } from "@thi.ng/api";
import { roundTo } from "@thi.ng/math";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    classify,
    evaluate,
    invSigmoid,
    sigmoid,
    trapezoid,
    variable,
} from "../src";

const roundVals = (obj: IObjectOf<number>) => {
    for (let k in obj) obj[k] = roundTo(obj[k], 1e-3);
    return obj;
};

const temp = variable([-20, 40], {
    freezing: invSigmoid(0.01, 2),
    cold: trapezoid(0, 4, 16, 20),
    warm: trapezoid(15, 20, 25, 30),
    hot: sigmoid(29.99, 2),
});

group("lvar", {
    eval: () => {
        assert.deepStrictEqual(
            roundVals(evaluate(temp, 18)),
            roundVals({
                freezing: 0,
                cold: 0.5,
                warm: 0.6,
                hot: 0,
            })
        );
        assert.deepStrictEqual(
            roundVals(evaluate(temp, 28)),
            roundVals({
                freezing: 0,
                cold: 0,
                warm: 0.4,
                hot: 0.018,
            })
        );
    },

    classify: () => {
        assert.strictEqual(classify(temp, -1), "freezing");
        assert.strictEqual(classify(temp, 0), "freezing");
        assert.strictEqual(classify(temp, 10), "cold");
        assert.strictEqual(classify(temp, 20), "warm");
        assert.strictEqual(classify(temp, 30), "hot");
    },
});
