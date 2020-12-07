import * as assert from "assert";
import { MultiTrie } from "../src";

describe("MultiTrie", () => {
    let root: MultiTrie<string, string>;
    beforeEach(() => {
        root = new MultiTrie();
        root.add("hey", "en");
        root.add("hello", "en");
        root.add("hallo", "de");
        root.add("hallo", "de-at");
        root.add("hola", "es");
        root.add("hold", "en");
        root.add("hej", "se");
    });

    it("keys", () => {
        assert.deepStrictEqual(
            new Set(root.keys()),
            new Set(["hey", "hello", "hallo", "hallo", "hola", "hold", "hej"])
        );
        assert.deepStrictEqual(
            new Set(root.find("he")!.keys()),
            new Set(["y", "llo", "j"])
        );
        assert.deepStrictEqual(
            new Set(root.find("ho")!.keys("", "ho")),
            new Set(["hola", "hold"])
        );
        assert.deepStrictEqual(
            new Set(root.find("he")!.keys("-")),
            new Set(["l-l-o", "y", "j"])
        );
    });

    it("keys (words)", () => {
        const t = new MultiTrie<string[], string>();
        t.add("foo bar baz".split(" "), "a");
        t.add("foo boo zoo".split(" "), "b");
        assert.deepStrictEqual(
            new Set(t.keys("/")),
            new Set(["foo/bar/baz", "foo/boo/zoo"])
        );
    });

    it("values", () => {
        assert.deepStrictEqual(
            new Set(root.values()),
            new Set(["en", "es", "de", "de-at", "se"])
        );
        assert.deepStrictEqual(
            new Set(root.find("he")!.values()),
            new Set(["en", "se"])
        );
    });

    it("delete", () => {
        assert(root.delete("he"));
        assert.deepStrictEqual(
            new Set(root.keys()),
            new Set(["hola", "hold", "hallo"])
        );
        assert(root.delete("hallo", "de"));
        assert.deepStrictEqual(root.get("hallo"), new Set(["de-at"]));
        assert(root.delete("h"));
        assert.deepStrictEqual([...root], []);
    });

    it("known prefix", () => {
        assert.deepStrictEqual(root.knownPrefix("hole"), ["h", "o", "l"]);
        assert.deepStrictEqual(root.knownPrefix("whole"), []);
    });
});
