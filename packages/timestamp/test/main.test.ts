// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { now, timeDiff } from "../src/index.js";

test(
	"timeDiff",
	async (done) => {
		const a = now();
		setTimeout(() => {
			const delta = timeDiff(a);
			expect(delta > 40 && delta < 60).toBeTrue();
			done();
		}, 50);
	},
	{ retry: 10 }
);

test("timeDiff big/big", () => expect(timeDiff(0n, 1_000_000n)).toBe(1));

test("timeDiff big/num", () => expect(timeDiff(0n, 1e6)).toBe(1));

test("timeDiff num/big", () => expect(timeDiff(0, 1_000_000n)).toBe(1));

test("timeDiff num/num", () => expect(timeDiff(0, 1_000_000)).toBe(1));
