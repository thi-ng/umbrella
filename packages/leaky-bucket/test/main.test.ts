// SPDX-License-Identifier: Apache-2.0
import { delayed } from "@thi.ng/compose";
import { expect, test } from "bun:test";
import { LeakyBucketMap } from "../src/index.js";

test("LeakyBucketMap", async (done) => {
	const buckets = new LeakyBucketMap({
		maxBuckets: 2,
		capacity: 3,
		leakInterval: 10,
	});
	expect(buckets.update("a")).toBeTrue();
	expect(buckets.update("a")).toBeTrue();
	expect(buckets.update("a")).toBeTrue();
	expect(buckets.has("a")).toBeTrue();
	expect(buckets.get("a")!.level).toBe(3);
	// max capacity reached
	expect(buckets.update("a")).toBeFalse();

	await delayed(null, 15);
	expect(buckets.update("b")).toBeTrue();
	// max buckets reached
	expect(buckets.update("c")).toBeFalse();

	await delayed(null, 25);
	expect(buckets.update("a")).toBeTrue();

	expect(new Set(buckets.buckets.keys())).toEqual(new Set(["a"]));

	done();
});
