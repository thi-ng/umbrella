import * as assert from "assert";
import { equiv } from "../src";

describe("equiv", () => {
    it("null", () => {
        assert.ok(equiv(null, null));
        assert.ok(equiv(null, undefined));
        assert.ok(equiv(undefined, null));
    });

    it("boolean", () => {
        assert.ok(!equiv(null, false));
        assert.ok(!equiv(false, null));
        assert.ok(!equiv(undefined, false));
        assert.ok(!equiv(false, undefined));
    });

    it("number", () => {
        assert.ok(!equiv(null, 0));
        assert.ok(!equiv(0, null));
        assert.ok(!equiv(0, undefined));
        assert.ok(!equiv(undefined, 0));

        assert.ok(equiv(0, 0));
        assert.ok(equiv(0, 0.0));
        assert.ok(!equiv(0, 1));
        assert.ok(!equiv(1, 0));
        assert.ok(!equiv(0, "0"));
        assert.ok(!equiv("0", 0));
        assert.ok(!equiv(0, [0]));
        assert.ok(!equiv([0], 0));
    });

    it("string", () => {
        assert.ok(!equiv(null, ""));
        assert.ok(!equiv("", null));
        assert.ok(equiv("a", "a"));
        assert.ok(!equiv("a", "ab"));
    });

    it("array", () => {
        assert.ok(equiv([], []));
        assert.ok(equiv([], []));
        assert.ok(equiv([], { length: 0 }));
        assert.ok(equiv({ length: 0 }, []));
        assert.ok(equiv(["a"], ["a"]));
        assert.ok(!equiv(["a"], ["b"]));
    });

    it("object", () => {
        assert.ok(!equiv(undefined, {}));
        assert.ok(!equiv({}, undefined));
        assert.ok(!equiv(null, {}));
        assert.ok(!equiv({}, null));

        assert.ok(equiv({}, {}));
        assert.ok(!equiv({}, []));
        assert.ok(!equiv([], {}));
        assert.ok(equiv({ a: 0 }, { a: 0 }));
        assert.ok(equiv({ a: 0, b: { c: 1 } }, { a: 0, b: { c: 1 } }));
        assert.ok(!equiv({ a: 0, b: { c: 1 } }, { a: 0, b: { c: 2 } }));
        assert.ok(!equiv({ a: 0, b: { c: 1 } }, { a: 0, b: {} }));
    });

    it("equiv impl", () => {
        class A {
            a: any;
            constructor(a: any) {
                this.a = a;
            }

            equiv(b: any) {
                return equiv(this.a, b);
            }
        }

        assert.ok(!equiv(new A(1), null));
        assert.ok(!equiv(new A(1), undefined));
        assert.ok(!equiv(null, new A(1)));
        assert.ok(!equiv(undefined, new A(1)));
        assert.ok(equiv(new A(1), new A(1)));
        assert.ok(equiv(new A(1), 1));
        assert.ok(equiv(1, new A(1)));
        assert.ok(
            equiv(1, {
                equiv(x: number) {
                    return x === 1;
                },
            })
        );
        assert.ok(
            equiv(
                {
                    equiv(x: number) {
                        return x === 1;
                    },
                },
                1
            )
        );
        assert.ok(!equiv(new A(1), new A(2)));
        assert.ok(!equiv(new A(1), 2));
    });

    it("set", () => {
        const a = new Set([1, 2, 3]);
        assert.ok(equiv(a, a));
        assert.ok(equiv(a, new Set([3, 2, 1])));
        assert.ok(
            equiv(
                new Set([{ a: 1 }, new Set([{ b: 2 }, [3]])]),
                new Set([new Set([[3], { b: 2 }]), { a: 1 }])
            )
        );
        assert.ok(!equiv(a, new Set([3, 2, 0])));
        assert.ok(!equiv(a, [3, 2, 0]));
        assert.ok(
            !equiv(
                a,
                new Map([
                    [3, 3],
                    [2, 2],
                    [1, 1],
                ])
            )
        );
        assert.ok(!equiv(a, null));
        assert.ok(!equiv(null, a));
    });

    it("date", () => {
        const a = new Date(123456);
        assert.ok(equiv(a, a));
        assert.ok(equiv(a, new Date(123456)));
        assert.ok(!equiv(a, new Date(123)));
    });

    it("regexp", () => {
        const a = /(\w+)/g;
        assert.ok(equiv(a, a));
        assert.ok(equiv(a, /(\w+)/g));
        assert.ok(!equiv(a, /(\w+)/));
        assert.ok(!equiv(a, /(\w*)/g));
    });
});
