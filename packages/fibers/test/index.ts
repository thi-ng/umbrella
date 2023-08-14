import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { sequence, fiber, untilEvent, wait } from "../src/index.js";

const logger = undefined; //new ConsoleLogger("app");

group(
	"fibers",
	{
		chain: ({ done, setTimeout }) => {
			const a = sequence(
				[
					function* () {
						console.log("a");
						return 11;
					},
					function* () {
						console.log("waiting...");
						yield* wait(5);
						return 22;
					},
					function* () {
						console.log("b");
						assert.equal(a.value, 22);
						yield;
						return 33;
					},
				],
				{ logger }
			).run();
			// setTimeout(() => a.cancel(), 5);
			setTimeout(() => {
				assert.equal(a.value, 33);
				assert.equal(a.state, 2);
				done();
			}, 10);
		},
		"await event": ({ done, setTimeout }) => {
			const a = fiber(
				function* (ctx) {
					console.log("hello");
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
					assert.deepStrictEqual(ev.value, { type: "foo" });
					assert.strictEqual(waiter.value, 42);
					assert.ok(added);
					assert.ok(removed);
					return { a: ev.value!, b: waiter.value! };
				},
				{ logger }
			).runWith(setImmediate);
			setTimeout(() => {
				assert.deepStrictEqual(a.deref(), {
					a: { type: "foo" },
					b: 42,
				});
				done();
			}, 15);
		},
	},
	{ timeOut: 100 }
);
