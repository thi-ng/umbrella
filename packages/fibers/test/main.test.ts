import { expect, test } from "bun:test";
import { fiber, sequence, untilEvent, wait } from "../src/index.js";

const logger = undefined; //new ConsoleLogger("app");

test("chain", async () => {
	const acc: any[] = [];
	const a = sequence(
		[
			function* () {
				return 11;
			},
			function* () {
				acc.push(a.value);
				yield* wait(5);
				return 22;
			},
			function* () {
				acc.push(a.value);
				yield;
				return 33;
			},
		],
		{ logger }
	).runWith(setImmediate);
	const result = await a.promise();
	expect(result).toBe(33);
	expect(a.state).toBe(2);
	expect(acc).toEqual([11, 22]);
});

test("await event", async () => {
	const a = fiber(
		function* (ctx) {
			let added = false;
			let removed = false;
			const ev = ctx.fork(
				untilEvent(
					{
						addEventListener() {
							added = true;
						},
						removeEventListener() {
							removed = true;
						},
						dispatchEvent() {
							return true;
						},
					},
					"foo",
					{ logger }
				)
			);
			const waiter = ctx.fork(function* () {
				yield* wait(10);
				ev.done({ type: "foo" });
				return 42;
			});
			yield* ctx.join();
			return { a: ev.value!, b: waiter.value!, added, removed };
		},
		{ logger }
	).runWith(setImmediate);

	const result = await a.promise();
	expect(result).toEqual(a.deref());
	expect(result).toEqual({
		a: { type: "foo" },
		b: 42,
		added: true,
		removed: true,
	});
});
