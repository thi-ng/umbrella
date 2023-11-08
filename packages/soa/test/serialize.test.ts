import { expect, test } from "bun:test";
import { scalar, serializer, soa, utf8z } from "../src/index.js";

test("scalar", () => {
	const struct = soa(2, { id: { type: "u32", size: 1 } });
	const ser = serializer({ id: scalar });
	struct.setIndex(0, ser.encode({ id: 0xdecafbad }));
	struct.setIndex(1, ser.encode({ id: 0xaa55aa55 }));
	expect([...struct.values()].map(ser.decode)).toEqual([
		{ id: 0xdecafbad },
		{ id: 0xaa55aa55 },
	]);
});

test("utf8z", () => {
	const struct = soa(2, { name: { type: "u8", size: 10 } });
	const ser = serializer({ name: utf8z(10) });
	expect(ser.decode(struct.index(0))).toEqual({ name: "" });
	struct.setIndex(0, ser.encode({ name: "hëLl0!" }));
	expect([...struct.attribValue("name", 0)]).toEqual([
		104, 195, 171, 76, 108, 48, 33, 0, 0, 0,
	]);
	expect(ser.decode(struct.index(0))).toEqual({ name: "hëLl0!" });
	// overwrite w/ shorter string
	struct.setIndex(0, ser.encode({ name: "🤗" }));
	expect(ser.decode(struct.index(0))).toEqual({ name: "🤗" });
	expect(() =>
		struct.setIndex(0, ser.encode({ name: "123456789" }))
	).not.toThrow();
	expect([...struct.attribValue("name", 0)]).toEqual([
		49, 50, 51, 52, 53, 54, 55, 56, 57, 0,
	]);
	expect(() =>
		struct.setIndex(0, ser.encode({ name: "1234567890" }))
	).toThrow();
});
