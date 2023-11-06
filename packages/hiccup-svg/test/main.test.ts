import { hsv } from "@thi.ng/color";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { convertTree } from "../src/index.js";

group("hiccup-svg", {
	convertTree: () => {
		const res = convertTree([
			"g",
			{ __prec: 1 },
			[
				"circle",
				{ stroke: [1, 0, 0], __prec: 3 },
				[1.2345, -1.2345],
				99.9994,
			],
			[
				"line",
				{ stroke: hsv("blue") },
				[1.2345, -1.2345],
				[99.999, -99.999],
			],
		]);
		assert.deepStrictEqual(res, [
			"g",
			{
				__prec: 1,
			},
			[
				"circle",
				{
					__prec: 3,
					cx: "1.234",
					cy: "-1.234",
					r: "99.999",
					stroke: "#ff0000",
				},
			],
			[
				"line",
				{
					stroke: "hsl(240.000,100.000%,50.000%)",
					x1: "1.2",
					x2: "100.0",
					y1: "-1.2",
					y2: "-100.0",
				},
			],
		]);
	},
});
