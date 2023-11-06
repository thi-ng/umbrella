import type { ISeq } from "@thi.ng/api";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { cons, lazyseq } from "../src/index.js";

group("lazyseq", {
	lazyseq: () => {
		const fib = (a?: number, b?: number): ISeq<number> =>
			a !== undefined
				? lazyseq(() => cons(a, fib(b, a + b!)))
				: fib(0, 1);
		assert.strictEqual(fib().first(), 0);
		// prettier-ignore
		assert.strictEqual(fib().next()!.first(), 1);
		// prettier-ignore
		assert.strictEqual(fib().next()!.next()!.first(), 1);
		// prettier-ignore
		assert.strictEqual(fib().next()!.next()!.next()!.first(), 2);
		// prettier-ignore
		assert.strictEqual(fib().next()!.next()!.next()!.next()!.first(), 3);
	},
});
