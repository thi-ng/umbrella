import { group } from "@thi.ng/testament";
import { map, partition } from "@thi.ng/transducers";
import * as assert from "assert";
import {
	CloseMode,
	fromIterable,
	fromIterableSync,
	ISubscription,
	State,
	stream,
	Stream,
	subscription,
} from "../src/index.js";
import { TIMEOUT } from "./config.js";
import { assertActive, assertError, assertIdle, assertUnsub } from "./utils.js";

let src: Stream<number>;

group(
	"Subscription",
	{
		fsm: () => {
			src = stream();
			assertIdle(src);
			const sub = src.subscribe({
				next() {
					throw 1;
				},
			});
			let state2 = State.IDLE;
			let err: any;
			let sub2: ISubscription<any, any>;
			sub2 = src.subscribe({
				next() {
					throw 1;
				},
				done() {
					state2 = sub2.getState();
				},
				error(e) {
					err = e;
					return true;
				},
			});
			assertActive(src);
			assertActive(sub);
			assertActive(sub2);
			src.next(1);
			assertActive(src);
			assertError(sub);
			assertActive(sub2);
			src.done();
			assertUnsub(src);
			assertError(sub);
			assertUnsub(sub2);
			assert.strictEqual(state2, State.DONE);
			assert.strictEqual(err, 1);

			assert.throws(() => src.subscribe({}), "subscribe");
		},

		"new sub receives last": ({ done, setTimeout }) => {
			let buf: any[] = [];
			src = fromIterable([1, 2, 3], { delay: TIMEOUT });
			src.subscribe({
				next(x) {
					buf.push(x);
				},
			});
			setTimeout(
				() =>
					src.subscribe({
						next(x) {
							buf.push(x);
						},
						done() {
							assert.deepStrictEqual(buf, [1, 2, 2, 3, 3]);
							done();
						},
					}),
				TIMEOUT * 2.5
			);
		},

		"unsub does not trigger Subscription.done()": ({
			done,
			setTimeout,
		}) => {
			let buf: any[] = [];
			let called = false;
			src = fromIterable([1, 2, 3], { delay: TIMEOUT });
			const sub = src.subscribe({
				next(x) {
					buf.push(x);
				},
				done() {
					called = true;
				},
			});
			setTimeout(() => sub.unsubscribe(), TIMEOUT * 1.5);
			setTimeout(() => {
				assert.deepStrictEqual(buf, [1]);
				assert.strictEqual(src.getState(), State.UNSUBSCRIBED);
				assert.strictEqual((<any>src).subs.length, 0);
				assert.ok(!called);
				done();
			}, TIMEOUT * 4);
		},

		"no new values after unsub": ({ done, setTimeout }) => {
			let buf: any[] = [];
			let called = false;
			src = fromIterable([1, 2, 3], { delay: TIMEOUT });
			const sub = src.subscribe(
				{
					next(x) {
						buf.push(x);
					},
					done() {
						called = true;
					},
				},
				{ xform: partition<number>(2, true) }
			);
			setTimeout(() => sub.unsubscribe(), TIMEOUT * 2.5);
			setTimeout(() => {
				assert.deepStrictEqual(buf, [[1, 2]]);
				assert.strictEqual(src.getState(), State.UNSUBSCRIBED);
				assert.ok(!called);
				done();
			}, TIMEOUT * 4);
		},

		"done state": ({ done, setTimeout }) => {
			let state = State.IDLE;
			src = fromIterable([1]);
			const sub = src.subscribe({
				done() {
					state = sub.getState();
				},
			});
			setTimeout(() => {
				assert.strictEqual(state, State.DONE);
				assertUnsub(sub);
				assertUnsub(src);
				done();
			}, TIMEOUT * 2);
		},

		"completing transducer sends all values": ({ done }) => {
			let buf: any[] = [];
			src = fromIterable([1, 2, 3], { delay: 10 });
			src.subscribe(
				{
					next(x) {
						buf.push(x);
					},
					done() {
						assert.deepStrictEqual(buf, [[1, 2], [3]]);
						assert.strictEqual(src.getState(), State.DONE);
						done();
					},
				},
				{ xform: partition(2, true) }
			);
		},

		transform: () => {
			let buf: any[] = [];
			fromIterableSync([1], { closeIn: CloseMode.NEVER })
				.transform(map((x: number) => x + 10))
				.subscribe({
					next(x) {
						buf.push(x);
					},
				});
			assert.deepStrictEqual(buf, [11]);
		},

		"sub w/ xform": () => {
			let buf: any[] = [];
			fromIterableSync([1], { closeIn: CloseMode.NEVER }).subscribe(
				{
					next(x) {
						buf.push(x);
					},
				},
				{ xform: map((x: number) => x + 10) }
			);
			assert.deepStrictEqual(buf, [11]);
		},

		"child sub w/ xform": () => {
			let buf: any[] = [];
			fromIterableSync([1], { closeIn: CloseMode.NEVER }).subscribe(
				subscription({
					next(x) {
						buf.push(x);
					},
				}),
				{ xform: map((x: number) => x + 10) }
			);
			assert.deepStrictEqual(buf, [11]);
		},

		"stream source error": () => {
			let err: any;
			const src = stream(
				() => {
					throw "eek";
				},
				{
					error(e) {
						err = e;
						return false;
					},
				}
			);
			const sub = src.subscribe({});
			assert.strictEqual(err, "eek");
			assertError(src);
			assertActive(sub);
		},
	},
	{
		maxTrials: 3,
		timeOut: TIMEOUT * 5,
	}
);
