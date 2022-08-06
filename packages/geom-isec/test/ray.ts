import { group } from "@thi.ng/testament";
import { eqDelta, maddN3, mulN3, normalize3, Vec } from "@thi.ng/vectors";
import * as assert from "assert";
import { intersectRayAABB } from "../src/index.js";

group("ray intersection", {
	"rayBox inside": () => {
		const dirs: Vec[] = [
			[-1, -1, -1],
			[-1, -1, 0],
			[-1, -1, 1],
			[-1, 0, -1],
			[-1, 0, 0],
			[-1, 0, 1],
			[-1, 1, -1],
			[-1, 1, 0],
			[-1, 1, 1],
			[0, -1, -1],
			[0, -1, 0],
			[0, -1, 1],
			[0, 0, -1],
			[0, 0, 1],
			[0, 1, -1],
			[0, 1, 0],
			[0, 1, 1],
			[1, -1, -1],
			[1, -1, 0],
			[1, -1, 1],
			[1, 0, -1],
			[1, 0, 0],
			[1, 0, 1],
			[1, 1, -1],
			[1, 1, 0],
			[1, 1, 1],
		];
		for (let d of dirs) {
			const n = normalize3([], d);
			const i = intersectRayAABB([5, 5, 5], n, [0, 0, 0], [10, 10, 10]);
			const expected = maddN3([], n, i.alpha!, [5, 5, 5]);
			assert.ok(i.inside, `inside d=${d}`);
			assert.ok(
				eqDelta(expected, <Vec>i.isec![0]),
				`d=${d} isec=${i.isec}, exp=${expected}`
			);
		}
	},

	"rayBox outside": () => {
		const dirs: Vec[] = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		];
		for (let d of dirs) {
			let o = mulN3([], d, -10);
			let i = intersectRayAABB(o, d, [-5, -5, -5], [5, 5, 5]);
			let expected = maddN3([], d, i.alpha!, o);
			assert.ok(
				eqDelta(expected, <Vec>i.isec![0]),
				`d=${d} isec=${i.isec}, exp=${expected}`
			);
			d = mulN3(d, d, -1);
			o = mulN3([], d, -10);
			i = intersectRayAABB(o, d, [-5, -5, -5], [5, 5, 5]);
			expected = maddN3([], d, i.alpha!, o);
			assert.ok(
				eqDelta(expected, <Vec>i.isec![0]),
				`d=${d} isec=${i.isec}, exp=${expected}`
			);
		}
	},
});
