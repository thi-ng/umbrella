import { expect, test } from "bun:test";
import { defMTF, defTranspose } from "../src/index.js";

test("mtf (n=5)", () => {
	const a = defMTF([1, 2, 3, 4, 5]);
	a.nth(3);
	expect([...a]).toEqual([4, 1, 2, 3, 5]);
	a.nth(3);
	expect([...a]).toEqual([3, 4, 1, 2, 5]);
	expect(a.find(3)!.value).toBe(3);
	expect([...a]).toEqual([3, 4, 1, 2, 5]);
	expect(a.find(1)!.value).toBe(1);
	expect([...a]).toEqual([1, 3, 4, 2, 5]);
	expect(a.findWith((x) => x === 2)!.value).toBe(2);
	expect([...a]).toEqual([2, 1, 3, 4, 5]);
	a.setNth(4, 50);
	expect([...a]).toEqual([50, 2, 1, 3, 4]);
	a.setTail(40);
	expect([...a]).toEqual([40, 50, 2, 1, 3]);
});

test("transpose (n=5)", () => {
	const a = defTranspose([1, 2, 3, 4, 5]);
	a.nth(3);
	expect([...a]).toEqual([1, 2, 4, 3, 5]);
	a.nth(3);
	expect([...a]).toEqual([1, 2, 3, 4, 5]);
	expect(a.find(3)!.value).toBe(3);
	expect([...a]).toEqual([1, 3, 2, 4, 5]);
	expect(a.find(1)!.value).toBe(1);
	expect([...a]).toEqual([1, 3, 2, 4, 5]);
	expect(a.findWith((x) => x === 2)!.value).toBe(2);
	expect([...a]).toEqual([1, 2, 3, 4, 5]);
	a.setNth(4, 50);
	expect([...a]).toEqual([1, 2, 3, 50, 4]);
	a.setTail(40);
	expect([...a]).toEqual([1, 2, 3, 40, 50]);
});
