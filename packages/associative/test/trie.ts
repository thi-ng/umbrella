import * as assert from "assert";

import { Trie } from "../src/trie";

describe("Trie", () => {
    let root: Trie<string, string>;
    beforeEach(() => {
        root = new Trie();
        root.add("hey", "en");
        root.add("hello", "en");
        root.add("hallo", "de");
        root.add("hallo", "de-at");
        root.add("hola", "es");
        root.add("hold", "en");
        root.add("hej", "se");
    });

    it("keys", () => {
        assert.deepEqual(
            new Set(root.keys()),
            new Set(["hey", "hello", "hallo", "hallo", "hola", "hold", "hej"])
        );
        assert.deepEqual(
            new Set(root.find("he")!.keys()),
            new Set(["y", "llo", "j"])
        );
        assert.deepEqual(
            new Set(root.find("ho")!.keys("", "ho")),
            new Set(["hola", "hold"])
        );
        assert.deepEqual(
            new Set(root.find("he")!.keys("-")),
            new Set(["l-l-o", "y", "j"])
        );
    });

    it("keys (words)", () => {
        const t = new Trie<string[], string>();
        t.add("foo bar baz".split(" "), "a");
        t.add("foo boo zoo".split(" "), "b");
        assert.deepEqual(
            new Set(t.keys("/")),
            new Set(["foo/bar/baz", "foo/boo/zoo"])
        );
    });

    it("values", () => {
        assert.deepEqual(
            new Set(root.values()),
            new Set(["en", "es", "de", "de-at", "se"])
        );
        assert.deepEqual(
            new Set(root.find("he")!.values()),
            new Set(["en", "se"])
        );
    });

    it("delete", () => {
        assert(root.delete("he"));
        assert.deepEqual(
            new Set(root.keys()),
            new Set(["hola", "hold", "hallo"])
        );
        assert(root.delete("hallo", "de"));
        assert.deepEqual(root.get("hallo"), new Set(["de-at"]));
        assert(root.delete("h"));
        assert.deepEqual([...root], []);
    });

    it("known prefix", () => {
        assert.deepEqual(root.knownPrefix("hole"), ["h", "o", "l"]);
        assert.deepEqual(root.knownPrefix("whole"), []);
    });
});
