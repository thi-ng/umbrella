import * as assert from "assert";

import { TrieMap } from "../src/trie-map";

describe("TrieMap", () => {
    let root: TrieMap<string>;
    beforeEach(() => {
        root = new TrieMap([
            ["hey", "en"],
            ["hello", "en"],
            ["hallo", "de"],
            ["hallo", "de-at"],
            ["hola", "es"],
            ["hold", "en"],
            ["hej", "se"],
        ]);
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
    });

    it("values", () => {
        assert.deepEqual(
            new Set(root.values()),
            new Set(["en", "es", "de-at", "se"])
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
        assert(root.delete("hallo"));
        assert.equal(root.get("hallo"), undefined);
        assert(root.delete("h"));
        assert.deepEqual([...root], []);
    });

    it("known prefix", () => {
        assert.deepEqual(root.knownPrefix("hole"), "hol");
        assert.deepEqual(root.knownPrefix("whole"), undefined);
    });

    it("suffixes", () => {
        assert.deepEqual([...root.suffixes("he")], ["j", "llo", "y"]);
        assert.deepEqual(
            [...root.suffixes("he", true)],
            ["hej", "hello", "hey"]
        );
    });
});
