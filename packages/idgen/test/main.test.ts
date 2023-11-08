import { expect, test } from "bun:test";
import { EVENT_ADDED, EVENT_REMOVED, IDGen } from "../src/index.js";

test("re-use (versioned)", () => {
	const g = new IDGen(8);
	expect(g.next()).toBe(0);
	expect(g.next()).toBe(1);
	expect(g.next()).toBe(2);
	expect(g.free(1)).toBeTrue();
	expect(g.free(2)).toBeTrue();
	expect(g.next()).toBe(0x102);
	expect(g.next()).toBe(0x101);
	expect(g.next()).toBe(3);
	expect(g.free(0)).toBeTrue();
	expect(g.free(0)).toBeFalse();
	expect(g.next()).toBe(0x100);
	expect(g.free(0x100)).toBeTrue();
	expect(g.free(3)).toBeTrue();
	expect((<any>g).freeID).toBe(0x103);
	expect(g.free(0x101)).toBeTrue();
	expect(g.free(0x102)).toBeTrue();
	expect((<any>g).freeID).toBe(0x202);
	expect((<any>g).ids).toEqual([-1, 0x103, 0x201, 0x200]);
});

test("has (unversioned)", () => {
	const check = (expected: boolean[]) => {
		for (let i = 0; i < 4; i++) {
			i > 0 && expect(g.has(-i)).toBeFalse();
			expect(g.has(i)).toBe(expected[i]);
			expect(g.has(i + 4)).toBeFalse();
		}
	};

	const g = new IDGen(2, 0);
	expect(g.available).toBe(4);
	g.next();
	g.next();
	g.next();
	g.next();
	expect(g.available).toBe(0);
	expect(() => g.next()).toThrow();
	check([true, true, true, true]);
	g.free(2);
	expect(g.available).toBe(1);
	check([true, true, false, true]);
	g.free(1);
	expect(g.available).toBe(2);
	check([true, false, false, true]);
	g.free(0);
	expect(g.available).toBe(3);
	check([false, false, false, true]);
	g.next();
	check([true, false, false, true]);
	g.next();
	check([true, true, false, true]);
	g.free(3);
	check([true, true, false, false]);
	g.next();
	check([true, true, false, true]);
	g.next();
	check([true, true, true, true]);
	expect(() => g.next()).toThrow();
});

test("has (versioned)", () => {
	const check = (ids: number[], expected: boolean[]) => {
		for (let i = 0; i < 4; i++) {
			expect(g.has(ids[i])).toBe(expected[i]);
		}
	};

	const g = new IDGen(2, 1);
	g.next();
	g.next();
	g.next();
	g.next();
	expect(() => g.next()).toThrow();
	check([0, 1, 2, 3], [true, true, true, true]);
	check([0 + 4, 1 + 4, 2 + 4, 3 + 4], [false, false, false, false]);
	g.free(2);
	check([0, 1, 2, 3], [true, true, false, true]);
	check([0, 1, 2 + 4, 3], [true, true, false, true]);
	g.free(1);
	check([0, 1, 2, 3], [true, false, false, true]);
	check([0, 1 + 4, 2 + 4, 3], [true, false, false, true]);
	g.free(0);
	check([0, 1, 2, 3], [false, false, false, true]);
	check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
	g.next();
	check([0, 1 + 4, 2 + 4, 3], [false, false, false, true]);
	check([0 + 4, 1 + 4, 2 + 4, 3], [true, false, false, true]);
	g.free(0 + 4);
	check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
	// 0 version wraparound
	g.next();
	check([0, 1 + 4, 2 + 4, 3], [true, false, false, true]);
	check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
	g.next();
	check([0, 1 + 4, 2 + 4, 3], [true, true, false, true]);
	g.next();
	check([0, 1 + 4, 2 + 4, 3], [true, true, true, true]);
	g.free(0);
	g.free(1 + 4);
	g.free(2 + 4);
	g.free(3);
	check([0, 1, 2, 3], [false, false, false, false]);
	check([0 + 4, 1 + 4, 2 + 4, 3 + 4], [false, false, false, false]);
	expect((<any>g).freeID).toBe(3 + 4);
});

test("notify", () => {
	const added: number[] = [];
	const removed: number[] = [];
	const g = new IDGen(8);
	g.addListener(EVENT_ADDED, ({ value }) => added.push(value));
	g.addListener(EVENT_REMOVED, ({ value }) => removed.push(value));
	g.next();
	g.next();
	g.free(0);
	g.free(1);
	g.next();
	g.next();
	g.free(0x100);
	g.free(0x101);
	expect(added).toEqual([0, 1, 0x101, 0x100]);
	expect(removed).toEqual([0, 1, 0x100, 0x101]);
});

test("grow capacity", () => {
	const g = new IDGen(1, 0);
	g.next();
	g.next();
	expect(() => g.next()).toThrow();
	g.capacity = 4;
	g.next();
	g.next();
	expect(() => g.next()).toThrow();
	expect(g.capacity).toBe(4);
	expect((<any>g).mask).toBe(3);
	expect((<any>g).shift).toBe(2);
	const g2 = new IDGen(1);
	expect(() => (g2.capacity = 4)).toThrow();
});

test("clear", () => {
	const g = new IDGen(8, 0, 256, 128);
	expect(g.available).toBe(128);
	expect(g.next()).toBe(128);
	expect(g.next()).toBe(129);
	expect(g.available).toBe(126);
	g.clear();
	expect(g.available).toBe(128);
	expect(g.used).toBe(0);
	expect(g.next()).toBe(128);
});
