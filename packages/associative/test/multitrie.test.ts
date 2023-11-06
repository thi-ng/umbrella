import { expect, test } from "bun:test";
import { MultiTrie } from "../src/index.js";

let root: MultiTrie<string, string>;

const init = () => {
	root = new MultiTrie();
	root.add("hey", "en");
	root.add("hello", "en");
	root.add("hallo", "de");
	root.add("hallo", "de-at");
	root.add("hola", "es");
	root.add("hold", "en");
	root.add("hej", "se");
};

test("keys", () => {
	init();
	expect(new Set(root.keys())).toEqual(
		new Set(["hey", "hello", "hallo", "hallo", "hola", "hold", "hej"])
	);
	expect(new Set(root.find("he")!.keys())).toEqual(
		new Set(["y", "llo", "j"])
	);
	expect(new Set(root.find("ho")!.keys("", "ho"))).toEqual(
		new Set(["hola", "hold"])
	);
	expect(new Set(root.find("he")!.keys("-"))).toEqual(
		new Set(["l-l-o", "y", "j"])
	);
});

test("keys (words)", () => {
	init();
	const t = new MultiTrie<string[], string>();
	t.add("foo bar baz".split(" "), "a");
	t.add("foo boo zoo".split(" "), "b");
	expect(new Set(t.keys("/"))).toEqual(
		new Set(["foo/bar/baz", "foo/boo/zoo"])
	);
});

test("values", () => {
	init();
	expect(new Set(root.values())).toEqual(
		new Set(["en", "es", "de", "de-at", "se"])
	);
	expect(new Set(root.find("he")!.values())).toEqual(new Set(["en", "se"]));
});

test("delete", () => {
	init();
	expect(root.delete("he")).toBeTrue();
	expect(new Set(root.keys())).toEqual(new Set(["hola", "hold", "hallo"]));
	expect(root.delete("hallo", "de")).toBeTrue();
	expect(root.get("hallo")).toEqual(new Set(["de-at"]));
	expect(root.delete("h")).toBeTrue();
	expect([...root]).toEqual([]);
});

test("known prefix", () => {
	init();
	expect(root.knownPrefix("hole")).toEqual(["h", "o", "l"]);
	expect(root.knownPrefix("whole")).toEqual([]);
});
