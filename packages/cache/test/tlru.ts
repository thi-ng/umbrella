import * as assert from "assert";
import { TLRUCache } from "../src/index";

describe("TLRU", () => {
    let c: TLRUCache<string, number>;
    let evicts: any[];

    beforeEach(() => {
        evicts = [];
        c = new TLRUCache(
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ],
            {
                maxlen: 4,
                ttl: 10,
                release: (k, v) => evicts.push([k, v]),
            }
        );
    });

    it("max length", () => {
        assert.strictEqual(c.length, 3);
        c.set("d", 4);
        assert.strictEqual(c.length, 4);
        c.set("e", 5);
        assert.strictEqual(c.length, 4);
        assert.deepStrictEqual(evicts, [["a", 1]]);
    });

    it("get lru", () => {
        assert.strictEqual(c.get("a"), 1);
        assert.strictEqual(c.get("b"), 2);
        assert.deepStrictEqual([...c.keys()], ["c", "a", "b"]);
        c.set("d", 4);
        assert.deepStrictEqual([...c.keys()], ["c", "a", "b", "d"]);
        c.set("e", 5);
        assert.deepStrictEqual([...c.keys()], ["a", "b", "d", "e"]);
        assert.deepStrictEqual([...c.values()], [1, 2, 4, 5]);
        assert.deepStrictEqual(evicts, [["c", 3]]);
    });

    it("get ttl", (done) => {
        assert.strictEqual(c.set("a", 10, 100), 10);
        setTimeout(() => {
            assert(!c.has("b"));
            assert(!c.has("c"));
            assert.deepStrictEqual(evicts, [
                ["b", 2],
                ["c", 3],
            ]);
            assert.deepStrictEqual([...c.keys()], ["a"]);
            done();
        }, 20);
    });

    it("getSet ttl", (done) => {
        setTimeout(() => {
            c.getSet("a", () => Promise.resolve(10))
                .then((v) => {
                    assert.strictEqual(v, 10);
                    assert(!c.has("b"));
                    assert(!c.has("c"));
                    assert.deepStrictEqual(
                        [...evicts],
                        [
                            ["a", 1],
                            ["b", 2],
                            ["c", 3],
                        ]
                    );
                    assert.deepStrictEqual([...c.keys()], ["a"]);
                    assert.deepStrictEqual([...c.values()], [10]);
                    done();
                })
                .catch(done);
        }, 20);
    });
});
