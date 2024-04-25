import { repeatedly } from "@thi.ng/transducers-async";
import { expect, test } from "bun:test";
import {
	broadcast,
	channel,
	consume,
	drain,
	fromAsyncIterable,
	merge,
	mult,
	pipe,
	pubsub,
	select,
	timeout,
} from "../src/index.js";

test("async iterator", async (done) => {
	const chan = channel<number>();
	(async () => {
		await chan.write(1);
		await chan.write(2);
		await chan.write(3);
		setTimeout(() => chan.close(), 10);
	})();
	expect(await consume(chan)).toEqual([1, 2, 3]);
	done();
});

test("fromAsyncIterable", async (done) => {
	const chan = fromAsyncIterable(repeatedly((i) => i, 3));
	expect(await consume(chan)).toEqual([0, 1, 2]);
	done();
});

test("consume", async (done) => {
	const chan = channel<number>();
	chan.write(1);
	chan.write(2);
	chan.write(3);
	chan.write(4);
	chan.write(5);
	chan.write(6);
	chan.close();
	expect(await consume(chan, [], 3)).toEqual([1, 2, 3]);
	expect(await chan.read()).toBe(4);
	expect(await consume(chan)).toEqual([5, 6]);
	done();
});

test("drain", async (done) => {
	const chan = channel<number>(3);
	chan.write(1);
	chan.write(2);
	chan.write(3);
	// await delayed(null, 100);
	expect(await drain(chan)).toEqual([1, 2, 3]);
	done();
});

test("broadcast", async (done) => {
	const a = channel<any>();
	const b = channel<any>();
	const c = channel<any>();
	a.write(1);
	broadcast(a, [b, c]);
	a.write(2);
	b.write(10);
	a.close();
	await Promise.all([
		(async () => {
			expect(await consume(b)).toEqual([10, 1, 2]);
		})(),
		(async () => {
			expect(await consume(c)).toEqual([1, 2]);
		})(),
	]);
	done();
});

test("merge", async (done) => {
	const a = channel<any>();
	const b = channel<any>();
	const c = channel<any>();
	(async () => {
		await a.write(1);
		await b.write(2);
		await c.write(3);
		a.close();
		b.close();
		setTimeout(() => c.close(), 10);
	})();
	expect(new Set(await consume(merge([a, b, c])))).toEqual(
		new Set([1, 2, 3])
	);
	done();
});

test("offer", async (done) => {
	const a = channel<any>();
	expect(a.offer(1)).toBe(true);
	expect(a.offer(2)).toBe(false);
	expect(await a.read()).toBe(1);
	done();
});

test("pipe", async (done) => {
	const a = channel<any>();
	const b = pipe(a, channel<any>());
	(async () => {
		await a.write(1);
		await a.write(2);
		await a.write(3);
		a.close();
	})();
	expect(await consume(b)).toEqual([1, 2, 3]);
	done();
});

test("poll", async (done) => {
	const a = channel<any>();
	expect(a.poll()).toBeUndefined();
	a.write(1);
	expect(a.poll()).toBe(1);
	expect(a.poll()).toBeUndefined();
	done();
});

test("select", async (done) => {
	const a = channel<any>();
	const b = channel<any>();
	const c = channel<any>();
	a.close();
	b.write(42);
	expect(await select(a, b, c)).toStrictEqual([undefined, a]);
	expect(await select(b, c)).toStrictEqual([42, b]);
	c.write(23);
	expect(await select(b, c)).toStrictEqual([23, c]);
	done();
});

test("timeout", async (done) => {
	expect(await timeout(10).read()).toBeUndefined();
	const ch = channel();
	ch.write(1);
	expect(await select(timeout(10), ch)).toEqual([1, ch]);
	expect((await select(timeout(0), channel()))[0]).toBeUndefined();
	done();
});

test("ping pong", async (done) => {
	const ping = channel<number>({ id: "ping" });
	const pong = channel<number>({ id: "pong" });

	(async () => {
		while (true) {
			const x = await ping.read();
			if (x === undefined || x > 3) {
				ping.close();
				pong.close();
				break;
			}
			await pong.write(x + 1);
		}
		expect(ping.closed()).toBeTrue();
	})();

	(async () => {
		let x: number | undefined;
		while (true) {
			x = await pong.read();
			if (x === undefined || x > 3) break;
			await ping.write(x + 1);
		}
		expect(x).toBeUndefined();
		expect(pong.closed()).toBeTrue();
		done();
	})();

	// kickoff
	ping.write(0);
});

test("mult", async (done) => {
	const m = mult<number>();
	const sub1 = (async () => await consume(m.subscribe()))();
	const sub2 = (async () => await consume(m.subscribe()))();
	m.write(1);
	m.write(2);
	m.write(3);
	m.close();
	expect(await Promise.all([sub1, sub2])).toEqual([
		[1, 2, 3],
		[1, 2, 3],
	]);
	done();
});

test("pubsub", async (done) => {
	const pub = pubsub<[string, number]>((x) => x[0]);
	const sub1 = (async () => await consume(pub.subscribeTopic("a")))();
	const sub2 = (async () => await consume(pub.subscribeTopic("b")))();
	await pub.write(["a", 1]);
	await pub.write(["b", 10]);
	await pub.write(["a", 2]);
	await pub.write(["c", 3]);
	pub.close();
	expect(await Promise.all([sub1, sub2])).toEqual([
		[
			["a", 1],
			["a", 2],
		],
		[["b", 10]],
	]);
	done();
});
