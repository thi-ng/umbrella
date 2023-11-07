import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import { soa } from "../src/index.js";

test("basic", () => {
	const struct = soa(2, {
		a: { type: "u16" },
		b: { size: 2, default: [1, 2] },
		c: { type: "i8", size: 2, default: [-3, 4] },
	});
	expect(struct.length).toBe(2);
	expect(struct.keys()).toEqual(["a", "b", "c"]);
	expect(struct.buffers.a instanceof Uint16Array).toBeTrue();
	expect(struct.buffers.a.length).toBe(2);
	expect(struct.buffers.b instanceof Float32Array).toBeTrue();
	expect(struct.buffers.b.length).toBe(4);
	expect(struct.buffers.c instanceof Int8Array).toBeTrue();
	expect(struct.buffers.c.length).toBe(4);
	expect(
		equiv(
			[...struct.values()],
			[
				{ a: [0], b: [1, 2], c: [-3, 4] },
				{ a: [0], b: [1, 2], c: [-3, 4] },
			]
		)
	).toBeTrue();
});

test("copy", () => {
	const src = soa(2, {
		a: { type: "u16" },
		b: { size: 2, default: [1, 2] },
		c: { type: "i8", size: 2, default: [-3, 4] },
	});
	const dest = soa(4, {
		a: { type: "u16", default: [0xaa55] },
		b: { size: 2 },
		c: { type: "i8", size: 2 },
	});
	src.copyTo(dest, undefined, 2);
	expect(
		equiv(
			[...dest.values()],
			[
				{ a: [0xaa55], b: [0, 0], c: [0, 0] },
				{ a: [0xaa55], b: [0, 0], c: [0, 0] },
				{ a: [0], b: [1, 2], c: [-3, 4] },
				{ a: [0], b: [1, 2], c: [-3, 4] },
			]
		)
	).toBeTrue();
});
