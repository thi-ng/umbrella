import type { IObjectOf } from "@thi.ng/api";
import { roundTo } from "@thi.ng/math";
import { expect, test } from "bun:test";
import {
	classify,
	evaluate,
	invSigmoid,
	sigmoid,
	trapezoid,
	variable,
} from "../src/index.js";

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

test("eval", () => {
	expect(roundVals(evaluate(temp, 18))).toEqual(
		roundVals({
			freezing: 0,
			cold: 0.5,
			warm: 0.6,
			hot: 0,
		})
	);
	expect(roundVals(evaluate(temp, 28))).toEqual(
		roundVals({
			freezing: 0,
			cold: 0,
			warm: 0.4,
			hot: 0.018,
		})
	);
});

test("classify", () => {
	expect(classify(temp, -1)).toBe("freezing");
	expect(classify(temp, 0)).toBe("freezing");
	expect(classify(temp, 10)).toBe("cold");
	expect(classify(temp, 20)).toBe("warm");
	expect(classify(temp, 30)).toBe("hot");
});
