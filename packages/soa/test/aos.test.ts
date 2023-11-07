import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import { aos } from "../src/index.js";

test("basic", () => {
	const struct = aos(
		2,
		{
			a: { type: "u16", size: 1 }, // 2, 0
			b: { type: "f32", size: 2 }, // 8, 4
			c: { type: "u8", size: 1 }, // 1, 12
		},
		undefined,
		0x100
	);
	expect(
		struct.buffers.a.buffer === struct.buffers.b.buffer &&
			struct.buffers.b.buffer === struct.buffers.c.buffer
	).toBeTrue();
	expect(struct.specs.a.stride).toBe(8);
	expect(struct.specs.b.stride).toBe(4);
	expect(struct.specs.c.stride).toBe(16);
	expect(struct.buffers.a.byteOffset).toBe(0x100);
	expect(struct.buffers.b.byteOffset).toBe(0x104);
	expect(struct.buffers.c.byteOffset).toBe(0x10c);
	expect(struct.buffers.a.buffer.byteLength).toBe(0x100 + 0x20);
	struct.setValues({
		a: [[0x1001], [0x2002]],
		b: [
			[1, 2],
			[3, 4],
		],
		c: [[0xff], [0xfe]],
	});
	expect(
		equiv(
			[...struct.values()],
			[
				{ a: [0x1001], b: [1, 2], c: [0xff] },
				{ a: [0x2002], b: [3, 4], c: [0xfe] },
			]
		)
	).toBeTrue();
	const x = struct.index(1);
	x.a[0] = 0xaa55;
	expect(struct.buffers.a[8]).toBe(0xaa55);
});
