import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { uuid, uuidv4Bytes, Xoshiro128 } from "../src/index.js";

group("uuid", {
	"from seeded rnd": () => {
		const rnd = new Xoshiro128();
		let buf = uuidv4Bytes(undefined, rnd);
		assert.deepStrictEqual(
			buf,
			// prettier-ignore
			new Uint8Array([44,98,107,50,243,204,71,35,138,45,143,201,148,141,255,157])
		);
		assert.strictEqual(uuid(buf), "2c626b32-f3cc-4723-8a2d-8fc9948dff9d");
		buf = uuidv4Bytes(undefined, rnd);
		assert.deepStrictEqual(
			buf,
			// prettier-ignore
			new Uint8Array([197,193,190,153,60,45,73,45,185,35,233,127,29,138,9,147])
		);
		assert.strictEqual(uuid(buf), "c5c1be99-3c2d-492d-b923-e97f1d8a0993");
	},
});
