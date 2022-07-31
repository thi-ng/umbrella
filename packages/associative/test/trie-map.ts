import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { TrieMap } from "../src/index.js";

let root: TrieMap<string>;

group(
	"TrieMap",
	{
		keys: () => {
			assert.deepStrictEqual(
				new Set(root.keys()),
				new Set([
					"hey",
					"hello",
					"hallo",
					"hallo",
					"hola",
					"hold",
					"hej",
				])
			);
			assert.deepStrictEqual(
				new Set(root.find("he")!.keys()),
				new Set(["y", "llo", "j"])
			);
		},

		values: () => {
			assert.deepStrictEqual(
				new Set(root.values()),
				new Set(["en", "es", "de-at", "se"])
			);
			assert.deepStrictEqual(
				new Set(root.find("he")!.values()),
				new Set(["en", "se"])
			);
		},

		delete: () => {
			assert.ok(root.delete("he"));
			assert.deepStrictEqual(
				new Set(root.keys()),
				new Set(["hola", "hold", "hallo"])
			);
			assert.ok(root.delete("hallo"));
			assert.strictEqual(root.get("hallo"), undefined);
			assert.ok(root.delete("h"));
			assert.deepStrictEqual([...root], []);
		},

		"known prefix": () => {
			assert.deepStrictEqual(root.knownPrefix("hole"), "hol");
			assert.deepStrictEqual(root.knownPrefix("whole"), undefined);
		},

		suffixes: () => {
			assert.deepStrictEqual([...root.suffixes("he")], ["j", "llo", "y"]);
			assert.deepStrictEqual(
				[...root.suffixes("he", true)],
				["hej", "hello", "hey"]
			);
		},
	},
	{
		beforeEach: () => {
			root = new TrieMap([
				["hey", "en"],
				["hello", "en"],
				["hallo", "de"],
				["hallo", "de-at"],
				["hola", "es"],
				["hold", "en"],
				["hej", "se"],
			]);
		},
	}
);
