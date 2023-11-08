import { expect, test } from "bun:test";
import { dynvar } from "../src/index.js";

test("basic", () => {
	const a = dynvar(1);
	expect(a.deref()).toBe(1);
	a.bind(2);
	expect(a.deref()).toBe(2);
	a.bind(3);
	expect(a.deref()).toBe(3);
	a.unbind();
	expect(a.deref()).toBe(2);
	a.set(4);
	expect(a.deref()).toBe(4);
	a.unbind();
	expect(a.deref()).toBe(1);
	expect(() => a.unbind()).toThrow();
});

test("withBinding", () => {
	const res: number[] = [];
	const a = dynvar(1);

	const collect = () => {
		const x = a.deref();
		res.push(x);
		if (x < 4) a.withBinding(x + 1, collect);
		res.push(a.deref() * 10);
	};
	collect();

	expect(res).toEqual([1, 2, 3, 4, 40, 30, 20, 10]);
	expect(() => a.unbind()).toThrow();
});

test("withBinding (error)", () => {
	const a = dynvar(1);
	a.withBinding(2, () => {
		try {
			a.withBinding(3, () => {
				throw new Error();
			});
		} catch (_) {}
		expect(a.deref()).toBe(2);
	});
	expect(a.deref()).toBe(1);
});
