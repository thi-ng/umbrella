import { group } from "@thi.ng/testament";
import { eqDelta } from "@thi.ng/math";
import * as assert from "assert";
import { AxiDraw, MockSerial, MOCK_SERIAL } from "../src/index.js";

group(
	"axidraw",
	{
		"square + diagonals": async (ctx) => {
			const axi = new AxiDraw({
				serial: MOCK_SERIAL,
			});
			await axi.connect("/foo");
			const metrics = await axi.draw([
				["m", [0, 0]],
				["d"],
				["m", [100, 0]],
				["m", [100, 100]],
				["m", [0, 100]],
				["m", [0, 0]],
				["u"],
				["m", [0, 0]],
				["d"],
				["m", [100, 100]],
				["u"],
				["m", [100, 0]],
				["d"],
				["m", [0, 100]],
				["u"],
			]);
			assert.ok(eqDelta(metrics.drawDist, 682.843, 1e3));
			assert.ok(eqDelta(metrics.totalDist, 782.843, 1e3));
			assert.strictEqual(metrics.commands, 17);
			assert.deepStrictEqual((<MockSerial>axi.serial).sent, [
				"EM,1,1\r",
				"SC,5,12750\r",
				"SC,4,18000\r",
				"SC,10,65535\r",
				"SP,1,150\r",
				"XM,0,0,0\r",
				"SP,0,150\r",
				"XM,2000,8000,0\r",
				"XM,2000,0,8000\r",
				"XM,2000,-8000,0\r",
				"XM,2000,0,-8000\r",
				"SP,1,150\r",
				"XM,0,0,0\r",
				"SP,0,150\r",
				"XM,2000,8000,8000\r",
				"SP,1,150\r",
				"XM,2000,0,-8000\r",
				"SP,0,150\r",
				"XM,2000,-8000,8000\r",
				"SP,1,150\r",
				"SP,1,150\r",
				"XM,2000,0,-8000\r",
				"EM,0,0\r",
			]);
			ctx.done();
		},
	},
	{ timeOut: 20000 }
);
