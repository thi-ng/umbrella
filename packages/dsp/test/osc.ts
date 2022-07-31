import { group } from "@thi.ng/testament";
import { eqDelta } from "@thi.ng/math";
import * as assert from "assert";
import { cos, osc, sin } from "../src/index.js";

const checkEq = (a: number, b: number) => assert.ok(eqDelta(a, b, 1e-3));

group("osc", {
	startPhase: () => {
		checkEq(osc(sin, 0.01).next(), 0);
		checkEq(osc(sin, 0.01, 0.5, 0, 0.25 /** 1/2π */).next(), 0.5);
		checkEq(osc(sin, 0.01, 0.5, 0, 0.5 /** π */).next(), 0);
		checkEq(osc(sin, 0.01, 0.5, 0, 0.75 /** 3/2π */).next(), -0.5);
		checkEq(osc(cos, 0.01).next(), 1);
		checkEq(osc(cos, 0.01, 0.5, 0, 0.25 /** 1/2π */).next(), 0);
		checkEq(osc(cos, 0.01, 0.5, 0, 0.5 /** π */).next(), -0.5);
		checkEq(osc(cos, 0.01, 0.5, 0, 0.75 /** 3/2π */).next(), 0);
	},
});
