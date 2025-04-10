// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { dropping, fifo, lifo, sliding } from "../src/index.js";

test("fifo", () => {
	const b = fifo(3);
	expect(b.readable()).toBeFalse();
	expect(b.writable()).toBeTrue();
	expect(b.write(1)).toBeTrue();
	expect(b.peek()).toBe(1);
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeTrue();
	expect(b.write(2)).toBeTrue();
	expect(b.write(3)).toBeTrue();
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeFalse();
	expect(b.length).toBe(3);
	expect(b.read()).toBe(1);
	expect(b.length).toBe(2);
	expect(b.write(4)).toBeTrue();
	expect(b.read()).toBe(2);
	expect(b.read()).toBe(3);
	expect(b.read()).toBe(4);
	expect(b.length).toBe(0);
	expect(b.readable()).toBeFalse();
});

test("lifo", () => {
	const b = lifo(3);
	expect(b.readable()).toBeFalse();
	expect(b.writable()).toBeTrue();
	expect(b.write(1)).toBeTrue();
	expect(b.peek()).toBe(1);
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeTrue();
	expect(b.write(2)).toBeTrue();
	expect(b.write(3)).toBeTrue();
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeFalse();
	expect(b.length).toBe(3);
	expect(b.read()).toBe(3);
	expect(b.length).toBe(2);
	expect(b.write(4)).toBeTrue();
	expect(b.read()).toBe(4);
	expect(b.read()).toBe(2);
	expect(b.read()).toBe(1);
	expect(b.length).toBe(0);
	expect(b.readable()).toBeFalse();
});

test("sliding", () => {
	const b = sliding(3);
	expect(b.readable()).toBeFalse();
	expect(b.writable()).toBeTrue();
	expect(b.write(1)).toBeTrue();
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeTrue();
	expect(b.write(2)).toBeTrue();
	expect(b.write(3)).toBeTrue();
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeTrue();
	expect(b.length).toBe(3);
	expect(b.read()).toBe(1);
	expect(b.length).toBe(2);
	expect(b.write(4)).toBeTrue();
	expect(b.write(5)).toBeTrue();
	expect(b.writable()).toBeTrue();
	expect(b.read()).toBe(3);
	expect(b.read()).toBe(4);
	expect(b.read()).toBe(5);
	expect(b.length).toBe(0);
	expect(b.readable()).toBeFalse();
});

test("dropping", () => {
	const b = dropping(3);
	expect(b.readable()).toBeFalse();
	expect(b.writable()).toBeTrue();
	expect(b.write(1)).toBeTrue();
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeTrue();
	expect(b.write(2)).toBeTrue();
	expect(b.write(3)).toBeTrue();
	expect(b.readable()).toBeTrue();
	expect(b.writable()).toBeTrue();
	expect(b.length).toBe(3);
	expect(b.read()).toBe(1);
	expect(b.length).toBe(2);
	expect(b.write(4)).toBeTrue();
	expect(b.write(5)).toBeFalse();
	expect(b.writable()).toBeTrue();
	expect(b.length).toBe(3);
	expect(b.read()).toBe(2);
	expect(b.read()).toBe(3);
	expect(b.read()).toBe(4);
	expect(b.length).toBe(0);
	expect(b.readable()).toBeFalse();
});
