import { expect, test } from "bun:test";
import { Trie } from "../src/trie.js";

test("trie", () => {
	const trie = new Trie([], "root");
	trie.set(["nodes", "?id", "?media"], "node-media");
	trie.set(["tags", "+"], "tags");
	// console.log(JSON.stringify(trie, null, 2));
	expect(trie.get(["nodes", "123", "foo"])).toBe("node-media");
	expect(trie.get(["nodes", "123"])).toBeUndefined();
	expect(trie.get(["tags", "123", "456", "789"])).toBe("tags");
	expect(trie.get(["tags"])).toBeUndefined();
	trie.set(["+"], "default");
	expect(trie.get(["foo"])).toBe("default");
	expect(trie.get([])).toBe("root");
});

test("wildcards", () => {
	const trie = new Trie(["a", "?", "c"], "A");
	trie.set(["a", "b"], "B");
	trie.set(["a", "+"], "C");
	// console.log(JSON.stringify(trie, null, 2));
	expect(trie.get(["a", "d", "c"])).toBe("A");
	expect(trie.get(["a", "b"])).toBe("B");
	expect(trie.get(["a", "b", "c"])).toBeUndefined();
	expect(trie.get(["a", "d"])).toBeUndefined();
	expect(trie.get(["a"])).toBeUndefined();
});

test("wildcard not in tail position", () => {
	expect(() => new Trie(["a", "+", "x"], "D")).toThrow();
});
