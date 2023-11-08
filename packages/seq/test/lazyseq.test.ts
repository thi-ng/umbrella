import type { ISeq } from "@thi.ng/api";
import { expect, test } from "bun:test";
import { cons, lazyseq } from "../src/index.js";

test("lazyseq", () => {
	const fib = (a?: number, b?: number): ISeq<number> =>
		a !== undefined ? lazyseq(() => cons(a, fib(b, a + b!))) : fib(0, 1);
	expect(fib().first()).toBe(0);
	expect(fib().next()!.first()).toBe(1);
	expect(fib().next()!.next()!.first()).toBe(1);
	expect(fib().next()!.next()!.next()!.first()).toBe(2);
	expect(fib().next()!.next()!.next()!.next()!.first()).toBe(3);
});
