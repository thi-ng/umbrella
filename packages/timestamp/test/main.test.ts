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
