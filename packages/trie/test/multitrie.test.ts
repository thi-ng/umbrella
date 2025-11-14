// SPDX-License-Identifier: Apache-2.0
import { beforeEach, expect, test } from "bun:test";
import { MultiTrie } from "../src/index.js";

let chars: MultiTrie<string, string>;
let words: MultiTrie<string, string>;

beforeEach(() => {
	words = new MultiTrie<string, string>();
	words.add("foo bar baz".split(" "), "a");
	words.add("foo boo zoo".split(" "), "b");
	words.add("foo boo".split(" "), "c");
	words.add("boo bar".split(" "), "d");

	chars = new MultiTrie();
	chars.add([..."hey"], "en");
	chars.add([..."hello"], "en");
	chars.add([..."hallo"], "de");
	chars.add([..."hallo"], "de-at");
	chars.add([..."hola"], "es");
	chars.add([..."hold"], "en");
	chars.add([..."hej"], "se");
});

test("keys (words)", () => {
	expect([...words.keys()].sort()).toEqual([
		["boo", "bar"],
		["foo", "bar", "baz"],
		["foo", "boo"],
		["foo", "boo", "zoo"],
	]);
	expect([...words.keys(["boo"])]).toEqual([["boo", "bar"]]);
	expect([...words.keys(["boo"], false)]).toEqual([["bar"]]);
});

test("values (words)", () => {
	expect([...words.values()].sort()).toEqual(["a", "b", "c", "d"]);
	expect([...words.values(["foo"])].sort()).toEqual(["a", "b", "c"]);
});

test("keys (chars)", () => {
	expect([...chars.keys()].sort()).toEqual([
		[..."hallo"],
		[..."hej"],
		[..."hello"],
		[..."hey"],
		[..."hola"],
		[..."hold"],
	]);
	expect(new Set(chars.keys([..."he"], false))).toEqual(
		new Set([["y"], [..."llo"], [..."j"]])
	);
	expect(new Set(chars.keys([..."ho"], true))).toEqual(
		new Set([[..."hold"], [..."hola"]])
	);
});

test("values (chars)", () => {
	expect([...new Set(chars.values())].sort()).toEqual(
		["en", "es", "de", "de-at", "se"].sort()
	);
	expect([...new Set(chars.find([..."he"])!.values())].sort()).toEqual([
		"en",
		"se",
	]);
});

test("delete (chars)", () => {
	expect(chars.delete([..."he"])).toBeTrue();
	expect(new Set(chars.keys())).toEqual(
		new Set([[..."hola"], [..."hold"], [..."hallo"]])
	);
	expect(chars.delete([..."hallo"], "de")).toBeTrue();
	expect(chars.delete([..."hallo"], "de")).toBeFalse();
	expect(chars.get([..."hallo"])).toEqual(new Set(["de-at"]));
	expect(chars.delete(["h"])).toBeTrue();
	expect([...chars]).toEqual([]);
});

test("known prefix (words)", () => {
	expect(words.knownPrefix(["foo", "baz"])).toEqual(["foo"]);
	expect(words.knownPrefix(["bar"])).toEqual([]);
});

test("known prefix (chars)", () => {
	expect(chars.knownPrefix([..."hole"])).toEqual(["h", "o", "l"]);
	expect(chars.knownPrefix([..."whole"])).toEqual([]);
});
