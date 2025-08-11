// SPDX-License-Identifier: Apache-2.0
import { beforeEach, expect, test } from "bun:test";
import { TrieMap } from "../src/index.js";

let root: TrieMap<string>;

beforeEach(
	() =>
		(root = new TrieMap([
			["hey", "en"],
			["hello", "en"],
			["hallo", "de"],
			["hallo", "de-at"],
			["ha", "n/a"],
			["hola", "es"],
			["hold", "en"],
			["hej", "se"],
		]))
);

test("keys", () => {
	expect(new Set(root.keys())).toEqual(
		new Set(["hey", "hello", "hallo", "hallo", "hola", "hold", "hej", "ha"])
	);
	expect(new Set(root.find("he")!.keys())).toEqual(
		new Set(["y", "llo", "j"])
	);
});

test("values", () => {
	expect(new Set(root.values())).toEqual(
		new Set(["en", "es", "de-at", "se", "n/a"])
	);
	expect(new Set(root.find("he")!.values())).toEqual(new Set(["en", "se"]));
});

test("delete", () => {
	expect(root.delete("he")).toBeTrue();
	expect(new Set(root.keys())).toEqual(
		new Set(["hola", "hold", "hallo", "ha"])
	);
	expect(root.delete("hallo")).toBeTrue();
	expect(root.get("hallo")).toBeUndefined();
	expect(root.delete("h")).toBeTrue();
	expect([...root]).toEqual([]);
});

test("known prefix", () => {
	expect(root.knownPrefix("hole")).toEqual("hol");
	expect(root.knownPrefix("whole")).toBeUndefined();
});

test("suffixes", () => {
	expect([...root.keys("he", false)]).toEqual(["j", "llo", "y"]);
	expect([...root.keys("he", true)]).toEqual(["hej", "hello", "hey"]);
});
