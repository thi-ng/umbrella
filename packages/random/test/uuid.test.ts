import { expect, test } from "bun:test";
import { Xoshiro128, uuid, uuidv4Bytes } from "../src/index.js";

test("from seeded rnd", () => {
	const rnd = new Xoshiro128();
	let buf = uuidv4Bytes(undefined, rnd);
	expect(buf).toEqual(
		new Uint8Array([
			157, 255, 141, 148, 201, 143, 77, 74, 163, 71, 204, 243, 50, 107,
			98, 44,
		])
	);
	expect(uuid(buf)).toBe("9dff8d94-c98f-4d4a-a347-ccf3326b622c");
	buf = uuidv4Bytes(undefined, rnd);
	expect(buf).toEqual(
		new Uint8Array([
			147, 9, 138, 29, 127, 233, 67, 121, 173, 249, 45, 60, 153, 190, 193,
			197,
		])
	);
	expect(uuid(buf)).toBe("93098a1d-7fe9-4379-adf9-2d3c99bec1c5");
});
