import { eqDelta } from "@thi.ng/math";
import { expect, test } from "bun:test";
import {
	AxiDraw,
	DOWN,
	MOCK_SERIAL,
	MOVE,
	MockSerial,
	UP,
} from "../src/index.js";

test(
	"square + diagonals",
	async () => {
		const axi = new AxiDraw({
			serial: MOCK_SERIAL,
			sigint: false,
		});
		await axi.connect("/foo");
		const metrics = await axi.draw([
			MOVE([0, 0]),
			DOWN(),
			MOVE([100, 0]),
			MOVE([100, 100]),
			MOVE([0, 100]),
			MOVE([0, 0]),
			UP(),
			MOVE([0, 0]),
			DOWN(),
			MOVE([100, 100]),
			UP(),
			MOVE([100, 0]),
			DOWN(),
			MOVE([0, 100]),
			UP(),
		]);
		const sent = (<MockSerial>axi.serial).sent;
		const dist = 4 * 100 + 2 * Math.hypot(100, 100);
		expect(eqDelta(metrics.drawDist, dist, 1e-3)).toBeTrue();
		expect(eqDelta(metrics.totalDist, dist + 2 * 100, 1e-3)).toBeTrue();
		expect(metrics.penCommands).toBe(8);
		expect(metrics.commands).toBe(23);
		expect(metrics.commands).toBe(sent.length);
		expect(sent).toEqual([
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
	},
	{ timeout: 20000 }
);
