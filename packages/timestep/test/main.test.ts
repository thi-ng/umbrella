import { eqDelta } from "@thi.ng/math";
import { group } from "@thi.ng/testament";
import {
	eqDelta2,
	eqDelta3,
	eqDelta4,
	maddN2,
	maddN3,
	maddN4,
} from "@thi.ng/vectors";
import * as assert from "assert";
import {
	defNumeric,
	defTimeStep,
	defVector2,
	defVector3,
	defVector4,
} from "../src/index.js";

group("timestep", {
	numeric: () => {
		const sim = defTimeStep({ maxFrameTime: 10 });
		const states = [
			defNumeric(100, (x, dt) => x - 0.1 * dt),
			defNumeric(0, (x, dt) => (100 - x) * 0.1 * dt),
		];
		sim.update(61 * (1000 / 60), states);
		assert.ok(eqDelta(states[0].deref(), 99.9, 0.001));
		assert.ok(eqDelta(states[1].deref(), 0.166, 0.001));
	},

	vector: () => {
		const sim = defTimeStep({ maxFrameTime: 10 });
		const states = [
			defVector2([0, 0], (v, dt) => maddN2(v, [-10, 20], dt, v)),
			defVector3([0, 0, 0], (v, dt) => maddN3(v, [-10, 20, -30], dt, v)),
			defVector4([0, 0, 0, 0], (v, dt) =>
				maddN4(v, [-10, 20, -30, 40], dt, v)
			),
		];
		sim.update(61 * (1000 / 60), states);
		assert.ok(eqDelta2(states[0].deref(), [-10, 20], 0.001));
		assert.ok(eqDelta3(states[1].deref(), [-10, 20, -30], 0.001));
		assert.ok(eqDelta4(states[2].deref(), [-10, 20, -30, 40], 0.001));
	},
});
