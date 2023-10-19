import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { uuid, uuidv4Bytes, Xoshiro128 } from "../src/index.js";

group("uuid", {
	"from seeded rnd": () => {
		const rnd = new Xoshiro128();
		let buf = uuidv4Bytes(undefined, rnd);
		assert.deepStrictEqual(
			buf,
			new Uint8Array([
				157, 255, 141, 148, 201, 143, 77, 74, 163, 71, 204, 243, 50,
				107, 98, 44,
			])
		);
		assert.strictEqual(uuid(buf), "9dff8d94-c98f-4d4a-a347-ccf3326b622c");
		buf = uuidv4Bytes(undefined, rnd);
		assert.deepStrictEqual(
			buf,
			new Uint8Array([
				147, 9, 138, 29, 127, 233, 67, 121, 173, 249, 45, 60, 153, 190,
				193, 197,
			])
		);
		assert.strictEqual(uuid(buf), "93098a1d-7fe9-4379-adf9-2d3c99bec1c5");
	},
});
