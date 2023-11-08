import { comp, iterator, map, range, takeNth } from "@thi.ng/transducers";
import { expect, test } from "bun:test";
import { fsm } from "../src/index.js";

test("readme example", () => {
	const testFSM = fsm<any, number, number>({
		states: {
			skip: (state, x) => {
				if (x < 20) {
					if (++state.count > 5) {
						state.state = "take";
						state.count = 1;
						return [x];
					}
				} else {
					state.state = "done";
				}
			},
			take: (state, x) => {
				if (x < 20) {
					if (++state.count > 5) {
						state.state = "skip";
						state.count = 1;
					} else {
						return [x];
					}
				} else {
					state.state = "done";
				}
			},
			done: () => {},
		},
		terminate: "done",
		init: () => ({ state: "skip", count: 0 }),
	});
	expect([...iterator(testFSM, range(100))]).toEqual([
		5, 6, 7, 8, 9, 15, 16, 17, 18, 19,
	]);
	expect([...iterator(comp(takeNth(2), testFSM), range(100))]).toEqual([
		10, 12, 14, 16, 18,
	]);
	expect([
		...iterator(
			comp(
				testFSM,
				map((x: number) => x * 10)
			),
			range(100)
		),
	]).toEqual([50, 60, 70, 80, 90, 150, 160, 170, 180, 190]);
});
