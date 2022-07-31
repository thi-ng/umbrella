import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	fromIterable,
	ISubscription,
	State,
	Stream,
	Subscription,
} from "../src/index.js";
import { TIMEOUT } from "./config.js";

let src: Stream<number>;
let data = [10, 20, 30];

group(
	"fromIterable",
	{
		"is a stream": () => {
			assert.ok(src instanceof Stream);
			assert.ok(src instanceof Subscription);
		},

		"has an ID": () => {
			assert.ok(src.id.startsWith("iterable-"));
		},

		"starts in IDLE state": () => {
			assert.strictEqual(src.getState(), State.IDLE);
		},

		"delivers all values": ({ done }) => {
			let buf: any[] = [];
			src.subscribe({
				next(x) {
					buf.push(x);
				},
				done() {
					assert.deepStrictEqual(buf, data);
					done();
				},
			});
		},

		finishes: ({ done }) => {
			let sub: ISubscription<any, any> = src.subscribe({
				next() {},
				done() {
					assert.strictEqual(
						src.getState(),
						State.DONE,
						"src not done"
					);
					assert.strictEqual(
						sub.getState(),
						State.DONE,
						"sub not done"
					);
					done();
				},
			});
		},

		"works with delay": ({ done }) => {
			let buf: any[] = [];
			let t0 = Date.now();
			src = fromIterable(data, { delay: 10 });
			src.subscribe({
				next(x) {
					buf.push(x);
				},
				done() {
					assert.deepStrictEqual(buf, data);
					assert.ok(Date.now() - t0 >= (data.length + 1) * 10);
					done();
				},
			});
		},

		"can be cancelled": ({ done, setTimeout }) => {
			let buf: any[] = [];
			let doneCalled = false;
			src = fromIterable(data, { delay: TIMEOUT });
			src.subscribe({
				next(x) {
					buf.push(x);
				},
				done() {
					doneCalled = true;
				},
			});
			setTimeout(() => src.cancel(), TIMEOUT * 1.5);
			setTimeout(() => {
				assert.deepStrictEqual(buf, [data[0]]);
				assert.ok(!doneCalled);
				done();
			}, TIMEOUT * 4);
		},
	},
	{
		maxTrials: 3,
		timeOut: TIMEOUT * 5,
		beforeEach: () => {
			src = fromIterable(data);
		},
	}
);
