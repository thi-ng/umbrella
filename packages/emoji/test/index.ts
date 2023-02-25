import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { EMOJI, NAMES } from "../src/index.js";

group("emoji", {
	roundtrip: () => {
		Object.keys(EMOJI).forEach((id) => {
			assert.ok(
				NAMES[EMOJI[id]] === id ||
					EMOJI[NAMES[EMOJI[id]]] === EMOJI[id],
				id
			);
		});
	},

	"no-hyphens": () => {
		const ignore = ["-1"];
		const invalid = Object.keys(EMOJI).filter(
			(id) => !(ignore.includes(id) || id.indexOf("-") == -1)
		);
		assert.ok(!invalid.length, `invalid keys: ${invalid.join(", ")}`);
	},
});
