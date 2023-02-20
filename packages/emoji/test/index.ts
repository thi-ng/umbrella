import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { EMOJI, NAMES } from "../src/index.js";

group("emoji", {
	roundtrip: () => {
		assert.strictEqual(EMOJI["wink"], "😉");
		assert.strictEqual(NAMES[EMOJI["wink"]], "wink");
		assert.strictEqual(EMOJI[NAMES["💎"]], "💎");
	},

	"no-hyphens": () => {
		const ignore = ["-1"];
		const invalid = Object.keys(EMOJI).filter(
			(id) => !(ignore.includes(id) || id.indexOf("-") == -1)
		);
		assert.ok(!invalid.length, `invalid keys: ${invalid.join(", ")}`);
	},
});
