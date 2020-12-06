import * as assert from "assert";
import { TrieMap } from "../src";

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
        assert.deepStrictEqual(
            new Set(root.keys()),
            new Set(["hey", "hello", "hallo", "hallo", "hola", "hold", "hej"])
        );
        assert.deepStrictEqual(
            new Set(root.find("he")!.keys()),
            new Set(["y", "llo", "j"])
        );
    });

    it("values", () => {
        assert.deepStrictEqual(
            new Set(root.values()),
            new Set(["en", "es", "de-at", "se"])
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
        assert(root.delete("hallo"));
        assert.strictEqual(root.get("hallo"), undefined);
        assert(root.delete("h"));
        assert.deepStrictEqual([...root], []);
    });

    it("known prefix", () => {
        assert.deepStrictEqual(root.knownPrefix("hole"), "hol");
        assert.deepStrictEqual(root.knownPrefix("whole"), undefined);
    });

    it("suffixes", () => {
        assert.deepStrictEqual([...root.suffixes("he")], ["j", "llo", "y"]);
        assert.deepStrictEqual(
            [...root.suffixes("he", true)],
            ["hej", "hello", "hey"]
        );
    });
});
