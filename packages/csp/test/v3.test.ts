import { repeatedly } from "@thi.ng/transducers-async";
import { expect, test } from "bun:test";
import {
	ChannelState,
	ChannelV3,
	broadcast,
	fromAsyncIterable,
	merge,
	pipe,
	select,
} from "../src/v3.js";

test("async iterator", async (done) => {
	const chan = new ChannelV3<number>();
	(async () => {
		await chan.write(1);
		await chan.write(2);
		await chan.write(3);
		setTimeout(() => chan.close(), 10);
	})();
	expect(await chan.consume()).toEqual([1, 2, 3]);
	done();
});

test("fromAsyncIterable", async (done) => {
	const chan = fromAsyncIterable(repeatedly((i) => i, 3));
	expect(await chan.consume()).toEqual([0, 1, 2]);
	done();
});

test("drain", async (done) => {
	const chan = new ChannelV3<number>(3);
	chan.write(1);
	chan.write(2);
	chan.write(3);
	// await delayed(null, 100);
	expect(await chan.drain()).toEqual([1, 2, 3]);
	done();
});

test("broadcast", async (done) => {
	const a = new ChannelV3<any>();
	const b = new ChannelV3<any>();
	const c = new ChannelV3<any>();
	a.write(1);
	broadcast(a, [b, c]);
	a.write(2);
	b.write(10);
	a.close();
	await Promise.all([
		(async () => {
			expect(await b.consume()).toEqual([10, 1, 2]);
		})(),
		(async () => {
			expect(await c.consume()).toEqual([1, 2]);
		})(),
	]);
	done();
});

test("merge", async (done) => {
	const a = new ChannelV3<any>();
	const b = new ChannelV3<any>();
	const c = new ChannelV3<any>();
	(async () => {
		await a.write(1);
		await b.write(2);
		await c.write(3);
		a.close();
		b.close();
		setTimeout(() => c.close(), 10);
	})();
	expect(new Set(await merge([a, b, c]).consume())).toEqual(
		new Set([1, 2, 3])
	);
	done();
});

test("pipe", async (done) => {
	const a = new ChannelV3<any>();
	const b = pipe(a, new ChannelV3<any>());
	(async () => {
		await a.write(1);
		await a.write(2);
		await a.write(3);
		a.close();
	})();
	expect(await b.consume()).toEqual([1, 2, 3]);
	done();
});

test("select", async (done) => {
	const a = new ChannelV3<any>();
	const b = new ChannelV3<any>();
	const c = new ChannelV3<any>();
	a.close();
	b.write(42);
	expect(await select(a, b, c)).toStrictEqual([undefined, a]);
	expect(await select(b, c)).toStrictEqual([42, b]);
	c.write(23);
	expect(await select(b, c)).toStrictEqual([23, c]);
	done();
});

test("ping pong", async (done) => {
	const ping = new ChannelV3<number>({ id: "ping" });
	const pong = new ChannelV3<number>({ id: "pong" });

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
		expect(ping.state).toBe(ChannelState.CLOSED);
	})();

	(async () => {
		let x: number | undefined;
		while (true) {
			x = await pong.read();
			if (x === undefined || x > 3) break;
			await ping.write(x + 1);
		}
		expect(x).toBeUndefined();
		expect(pong.state).toBe(ChannelState.CLOSED);
		done();
	})();

	// kickoff
	ping.write(0);
});
