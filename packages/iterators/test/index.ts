import * as ti from "../src/index";
import * as assert from "assert";

describe("iterators", function () {
    it("butLast", () => {
        assert.deepEqual([...ti.butLast([])], [], "empty");
        assert.deepEqual([...ti.butLast([1])], [], "1");
        assert.deepEqual([...ti.butLast([1, 2])], [1], "2");
        assert.deepEqual([...ti.butLast([1, 2, 3])], [1, 2], "3");
        assert.deepEqual([...ti.butLast("hello")], ["h", "e", "l", "l"], "str");
        assert.deepEqual(
            [...ti.butLast(ti.range(10))],
            [0, 1, 2, 3, 4, 5, 6, 7, 8],
            "range"
        );
    });
    it("cached", () => {
        let cache = ti.cached(ti.range(3));
        let a = cache();
        let b = cache();
        let c = cache();
        assert.equal(a.next().value, 0, "a.next 0");
        assert.equal(a.next().value, 1, "a.next 1");
        assert.equal(b.next().value, 0, "b.next 0");
        assert.equal(c.next().value, 0, "c.next 0");
        assert.equal(a.next().value, 2, "a.next 2");
        assert.equal(c.next().value, 1, "c.next 1");
        assert.equal(b.next().value, 1, "b.next 1");
        assert.strictEqual(a.next().value, undefined, "a.next done");
        assert.strictEqual(ti.iterator(a), a, "iterator(a)");
        assert.strictEqual(
            ti.cached([])().next().value,
            undefined,
            "a.next empty"
        );
    });
    it("consume", () => {
        let i;
        assert.deepEqual(
            [...((i = ti.range(3)), ti.consume(i), i)],
            [],
            "consume all"
        );
        assert.deepEqual(
            [...((i = ti.range(3)), ti.consume(i, 3), i)],
            [],
            "consume 3"
        );
        assert.deepEqual(
            [...((i = ti.range(3)), ti.consume(i, 10), i)],
            [],
            "consume 10"
        );
        assert.deepEqual(
            [...((i = ti.range(3)), ti.consume(i, 2), i)],
            [2],
            "consume 2"
        );
        assert.deepEqual(
            [...((i = ti.range(3)), ti.consume(i, -2), i)],
            [0, 1, 2],
            "consume -2"
        );
    });
    it("concat", () => {
        assert.deepEqual([...ti.concat([])], [], "empty");
        assert.deepEqual(
            [...ti.concat<any>([], "", ti.range(0))],
            [],
            "3 args empty"
        );
        assert.deepEqual(
            [...ti.concat<any>([1, 2, 3], "abc", ti.range(3))],
            [1, 2, 3, "a", "b", "c", 0, 1, 2],
            "3 args any"
        );
        assert.deepEqual(
            [...ti.concat.apply(null, <any>["abc", null, [1, 2, 3]])],
            ["a", "b", "c", 1, 2, 3],
            "skip null"
        );
    });
    it("constantly", () => {
        const f = ti.constantly(1);
        assert.equal(f(), 1, "no arg");
        assert.equal(f(2), 1, "1 arg");
        assert.equal(f(2, 3), 1, "2 args");
    });
    it("cycle", () => {
        assert.deepEqual([...ti.cycle([])], [], "empty");
        assert.deepEqual(
            [...ti.take(7, ti.cycle(ti.range(3)))],
            [0, 1, 2, 0, 1, 2, 0],
            "cycle range(3)"
        );
        assert.deepEqual(
            [...ti.take(7, ti.cycle("abc"))],
            ["a", "b", "c", "a", "b", "c", "a"],
            "cycle string"
        );
    });
    it("dedupe", () => {
        assert.deepEqual([...ti.dedupe([])], [], "empty");
        assert.deepEqual(
            [...ti.dedupe([1, 2, 2, 3, 4, 4, 4, 3])],
            [1, 2, 3, 4, 3],
            "array"
        );
        assert.deepEqual(
            [...ti.dedupe("abbcccaabb")],
            ["a", "b", "c", "a", "b"],
            "string"
        );
    });
    it("dedupeWith", () => {
        let coll = [
            { a: 1 },
            { a: 1, b: 2 },
            { a: 2, b: 2 },
            { a: 2, b: 2 },
            { a: 3 },
        ];
        let eq = (a: any, b: any) => a.a === b.a;
        assert.deepEqual([...ti.dedupeWith(eq, [])], [], "empty");
        assert.deepEqual(
            [...ti.dedupeWith(eq, coll)],
            [{ a: 1 }, { a: 2, b: 2 }, { a: 3 }],
            "array[obj]"
        );
    });
    it("dense", () => {
        assert.deepEqual(
            [...ti.dense([, 1, , 2, false, null, undefined, 0, 3])],
            [1, 2, false, 0, 3]
        );
    });
    it("drop", () => {
        assert.deepEqual([...ti.drop(100, [])], [], "empty");
        assert.deepEqual([...ti.drop(4, [1, 2, 3])], [], "drop(4)");
        assert.deepEqual([...ti.drop(3, [1, 2, 3])], [], "drop(3)");
        assert.deepEqual([...ti.drop(2, [1, 2, 3])], [3], "drop(2)");
        assert.deepEqual([...ti.drop(0, [1])], [1], "drop(0)");
        assert.deepEqual([...ti.drop(-1, [1])], [1], "drop(-1)");
        assert.deepEqual(
            [...ti.drop(3, ti.range(5))],
            [3, 4],
            "drop(3, range)"
        );
    });
    it("dropNth", () => {
        assert.deepEqual([...ti.dropNth(2, [])], [], "empty");
        assert.deepEqual([...ti.dropNth(1, ti.range(6))], [], "dropNth(1)");
        assert.deepEqual(
            [...ti.dropNth(2, ti.range(6))],
            [0, 2, 4],
            "dropNth(2)"
        );
        assert.deepEqual(
            [...ti.dropNth(3, ti.range(6))],
            [0, 1, 3, 4],
            "dropNth(3)"
        );
        assert.deepEqual([...ti.dropNth(-1, ti.range(6))], [], "dropNth(-1)");
    });
    it("dropWhile", () => {
        assert.deepEqual([...ti.dropWhile((_) => false, [])], [], "empty");
        assert.deepEqual(
            [...ti.dropWhile((_) => true, [1, 2, 3])],
            [],
            "always"
        );
        assert.deepEqual(
            [...ti.dropWhile((x) => x < 3, ti.range(6))],
            [3, 4, 5],
            "x<3"
        );
        assert.deepEqual(
            [...ti.dropWhile((x) => x > 3, ti.range(6))],
            [0, 1, 2, 3, 4, 5],
            "none"
        );
    });
    it("ensureIterable", () => {
        assert.doesNotThrow(() => ti.ensureIterable([]), "array");
        assert.throws(() => ti.ensureIterable({}), "obj");
    });
    it("every", () => {
        let nums = ti.iterator([2, 4, 6, 8, 10]) as IterableIterator<number>;
        assert(!ti.every((_) => true, []), "empty");
        assert(
            ti.every((x) => x % 2 === 0, nums),
            "even"
        );
        assert.deepEqual(
            nums.next(),
            { value: undefined, done: true },
            "nums done"
        );
        nums = ti.iterator([2, 3, 4]) as IterableIterator<number>;
        assert(!ti.every((x) => x % 2 === 0, nums), "not even");
        assert.deepEqual(nums.next(), { value: 4, done: false }, "next = 4");
    });
    it("filter", () => {
        assert.deepEqual([...ti.filter((_) => true, [])], [], "empty");
        assert.deepEqual(
            [...ti.filter((x) => x % 3 === 0, ti.range(10))],
            [0, 3, 6, 9],
            "mult3"
        );
    });
    it("flatten", () => {
        assert.deepEqual([...ti.flatten([])], [], "empty");
        assert.deepEqual(
            [...ti.flatten([null, [null, [undefined]]])],
            [null, null, undefined],
            "nulls"
        );
        assert.deepEqual(
            [...ti.flatten([1, ti.range(2, 4), [4, [5, ["abc"]]]])],
            [1, 2, 3, 4, 5, "abc"],
            "nested"
        );
        assert.deepEqual(
            [...ti.flatten([{ a: 23, b: 42, c: [1, 2, 3] }])],
            ["a", 23, "b", 42, "c", 1, 2, 3],
            "obj iter"
        );
        assert.deepEqual(
            [...ti.flatten([{ a: 23, b: 42, c: [1, 2, 3] }], false)],
            [{ a: 23, b: 42, c: [1, 2, 3] }],
            "no obj"
        );
    });
    it("flattenWith", () => {
        let tx = (x: any) =>
            typeof x == "string"
                ? ti.map((x) => x.charCodeAt(0), x)
                : ti.maybeIterator(x);
        assert.deepEqual(
            [
                ...ti.flattenWith(tx, [
                    "ROOT",
                    undefined,
                    ["CHILD_1", null, ["CHILD_2"]],
                ]),
            ],
            [
                82,
                79,
                79,
                84,
                undefined,
                67,
                72,
                73,
                76,
                68,
                95,
                49,
                null,
                67,
                72,
                73,
                76,
                68,
                95,
                50,
            ],
            "chars"
        );
    });
    it("fnil", () => {
        let f = ti.fnil(
            (x) => x + 1,
            () => 0
        );
        assert.equal(f(), 1);
        assert.equal(f(1), 2);
        f = ti.fnil(
            (a, b) => a + b,
            () => 0,
            () => 10
        );
        assert.equal(f(), 10);
        assert.equal(f(1), 11);
        assert.equal(f(1, 2), 3);
        f = ti.fnil(
            (a, b, c) => a + b + c,
            () => 0,
            () => 10,
            () => 100
        );
        assert.equal(f(), 110);
        assert.equal(f(1), 111);
        assert.equal(f(1, 2), 103);
        assert.equal(f(1, 2, 3), 6);
        assert.throws(() => ti.fnil(() => {}));
    });
    it("fork", () => {
        const f = ti.fork([1, 2, 3, 4], 3);
        const fa = f();
        const fb = f();
        assert.equal(fa.next().value, 1);
        assert.equal(fa.next().value, 2);
        assert.equal(fb.next().value, 1);

        assert.equal(fa.next().value, 3);
        assert.equal(fa.next().value, 4);
        assert.equal(fb.next().value, 2);
        assert(fa.next().done);
        assert.equal(fb.next().value, 3);
        assert.equal(fb.next().value, 4);
        assert(fb.next().done);
    });
    it("frequencies", () => {
        assert.deepEqual(
            [
                ...ti.frequencies([
                    [1, 2],
                    [2, 3],
                    [1, 2],
                    [2, 4],
                ]),
            ],
            [
                [[1, 2], 2],
                [[2, 3], 1],
                [[2, 4], 1],
            ],
            "array"
        );
        assert.deepEqual(
            [
                ...ti.frequencies(
                    ti.filter((x) => /[a-z]/i.test(x), "hello world!")
                ),
            ],
            [
                ["h", 1],
                ["e", 1],
                ["l", 3],
                ["o", 2],
                ["w", 1],
                ["r", 1],
                ["d", 1],
            ],
            "letters"
        );
        assert.deepEqual(
            [...ti.frequencies([1, 2, 3, 4, 5, 9, 3], (x: number) => x & ~1)],
            [
                [0, 1],
                [2, 3],
                [4, 2],
                [8, 1],
            ],
            "key fn"
        );
    });
    it("groupBy", () => {
        assert.deepEqual(
            ti.groupBy((x) => x & ~1, [1, 2, 3, 4, 5, 9, 3]),
            { "0": [1], "2": [2, 3, 3], "4": [4, 5], "8": [9] },
            "mult 2"
        );
    });
    it("identity", () => {
        const x = { a: 1 };
        assert.strictEqual(ti.identity(x), x);
        assert.strictEqual(ti.identity(null), null);
        assert.strictEqual(ti.identity(undefined), undefined);
    });
    it("indexed", () => {
        assert.deepEqual(
            [...ti.indexed([10, 20, 30])],
            [
                [0, 10],
                [1, 20],
                [2, 30],
            ]
        );
    });
    it("interleave", () => {
        assert.throws(() => ti.interleave().next(), "no inputs");
        assert.deepEqual(
            [
                ...ti.interleave(
                    ti.range(),
                    ti.range(100, 200),
                    ti.range(200, 205)
                ),
            ],
            [0, 100, 200, 1, 101, 201, 2, 102, 202, 3, 103, 203, 4, 104, 204],
            "ranges"
        );
    });
    it("interpose", () => {
        assert.deepEqual(
            [...ti.interpose("/", ti.range(5))],
            [0, "/", 1, "/", 2, "/", 3, "/", 4],
            "slash"
        );
    });
    it("iterate", () => {
        assert.deepEqual(
            [
                ...ti.take(
                    10,
                    ti.iterate((x) => x * 2, 1)
                ),
            ],
            [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
            "pow2"
        );
    });
    it("maybeIterator", () => {
        assert(ti.maybeIterator("a") !== undefined, "str");
        assert(ti.maybeIterator([]) !== undefined, "array");
        assert(ti.maybeIterator(ti.range()) !== undefined, "generator");
        assert.equal(ti.maybeIterator(undefined), undefined, "undefined");
        assert.equal(ti.maybeIterator(null), undefined, "null");
        assert.equal(ti.maybeIterator(0), undefined, "0");
        assert.equal(ti.maybeIterator({}), undefined, "obj");
    });
    it("maybeObjectIterator", () => {
        assert(ti.maybeObjectIterator({}) != undefined, "obj");
        assert(ti.maybeObjectIterator([]) != undefined, "array");
        assert.equal(ti.maybeObjectIterator(undefined), undefined, "undefined");
        assert.equal(ti.maybeObjectIterator(null), undefined, "null");
        assert.equal(ti.maybeObjectIterator(0), undefined, "0");
        assert.equal(ti.maybeObjectIterator("a"), undefined, "str");
        assert.equal(
            ti.maybeObjectIterator(ti.range()),
            undefined,
            "generator"
        );
    });
    it("juxt", () => {
        let kernel = ti.juxt<number>(
            (x) => x - 1,
            (x) => x,
            (x) => x + 1
        );
        assert.equal(ti.juxt((x) => x)(1), 1, "ident1");
        assert.deepEqual(
            ti.juxt(
                (x) => x,
                (x) => x
            )(1),
            [1, 1],
            "ident2"
        );
        assert.deepEqual(kernel(1), [0, 1, 2], "kernel");
        assert.deepEqual(
            [...ti.map(kernel, ti.range(3))],
            [
                [-1, 0, 1],
                [0, 1, 2],
                [1, 2, 3],
            ],
            "map kernel"
        );
    });
    it("last", () => {
        assert.strictEqual(ti.last([]), undefined, "empty");
        assert.equal(ti.last(ti.range(10)), 9, "range(10)");
        assert.equal(ti.last(ti.take(10, ti.range())), 9, "range()");
    });
    it("map", () => {
        assert.deepEqual([...ti.map((x) => x * 10)], [], "no input");
        assert.deepEqual(
            [...ti.map((x) => x * 10, ti.range(3))],
            [0, 10, 20],
            "range(3)"
        );
        assert.deepEqual(
            [
                ...ti.map(
                    (x, y, z) => [x, y, z],
                    ti.range(5),
                    ti.range(0, 100, 10),
                    ti.range(0, 1000, 100)
                ),
            ],
            [
                [0, 0, 0],
                [1, 10, 100],
                [2, 20, 200],
                [3, 30, 300],
                [4, 40, 400],
            ],
            "multi range"
        );
    });
    it("mapcat", () => {
        assert.deepEqual(
            [...ti.mapcat((x) => ti.repeat(x, 3), "hello")],
            [
                "h",
                "h",
                "h",
                "e",
                "e",
                "e",
                "l",
                "l",
                "l",
                "l",
                "l",
                "l",
                "o",
                "o",
                "o",
            ],
            "string"
        );
        assert.deepEqual(
            [
                ...ti.mapcat(
                    (x, y, z) => [x, y, z],
                    ti.range(5),
                    ti.range(0, 100, 10),
                    ti.range(0, 1000, 100)
                ),
            ],
            [0, 0, 0, 1, 10, 100, 2, 20, 200, 3, 30, 300, 4, 40, 400],
            "multi range"
        );
        assert.deepEqual(
            [
                ...ti.mapcat(
                    (x) => (x < 5 ? ti.repeat(x, x) : null),
                    ti.range(10)
                ),
            ],
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4],
            "skip null"
        );
    });
    it("mapIndexed", () => {
        assert.deepEqual(
            [...ti.mapIndexed((i, a, b) => [i, a, b], "hello", "there")],
            [
                [0, "h", "t"],
                [1, "e", "h"],
                [2, "l", "e"],
                [3, "l", "r"],
                [4, "o", "e"],
            ],
            "strings"
        );
    });
    it("objectIterator", () => {
        assert.deepEqual(
            [...ti.objectIterator({ a: 23, b: 42, c: [1, 2, 3] })],
            [
                ["a", 23],
                ["b", 42],
                ["c", [1, 2, 3]],
            ],
            "mixed"
        );
    });
    it("partition", () => {
        assert.throws(() => ti.partition(0, 0, ti.range(3)).next(), "bad size");
        assert.throws(() => ti.partition(1, 0, ti.range(3)).next(), "bad step");
        assert.deepEqual(
            [...ti.partition(1, 1, ti.range(3))],
            [[0], [1], [2]],
            "1,1"
        );
        assert.deepEqual(
            [...ti.partition(3, 3, ti.range(7))],
            [
                [0, 1, 2],
                [3, 4, 5],
            ],
            "3,3"
        );
        assert.deepEqual(
            [...ti.partition(3, 3, ti.range(7), true)],
            [[0, 1, 2], [3, 4, 5], [6]],
            "3,3 all"
        );
        assert.deepEqual(
            [...ti.partition(3, 1, ti.range(7))],
            [
                [0, 1, 2],
                [1, 2, 3],
                [2, 3, 4],
                [3, 4, 5],
                [4, 5, 6],
            ],
            "3,1"
        );
        assert.deepEqual(
            [...ti.partition(3, 1, ti.range(7), true)],
            [
                [0, 1, 2],
                [1, 2, 3],
                [2, 3, 4],
                [3, 4, 5],
                [4, 5, 6],
                [5, 6],
            ],
            "3,1 all"
        );
        assert.deepEqual(
            [...ti.partition(3, 5, ti.range(11))],
            [
                [0, 1, 2],
                [5, 6, 7],
            ],
            "3,5"
        );
        assert.deepEqual(
            [...ti.partition(3, 5, ti.range(11), true)],
            [[0, 1, 2], [5, 6, 7], [10]],
            "3,5 all"
        );
    });
    it("partitionBy", () => {
        assert.deepEqual(
            [...ti.partitionBy((x) => (x / 5) | 0, ti.range(11))],
            [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10]],
            "mult5"
        );
    });
    it("randomSample", () => {
        ti.run((_) => {
            let l = [...ti.randomSample(0.5, ti.range(100))].length;
            assert(l >= 30 && l <= 70, `50% (${l})`);
        }, ti.range(100));
    });
    it("range", () => {
        assert.deepEqual(
            [...ti.take(5, ti.range())],
            [0, 1, 2, 3, 4],
            "unbounded"
        );
        assert.deepEqual([...ti.range(5)], [0, 1, 2, 3, 4], "range(to)");
        assert.deepEqual([...ti.range(1, 5)], [1, 2, 3, 4], "range(from,to)");
        assert.deepEqual([...ti.range(1, 5, 2)], [1, 3], "range(from,to,step)");
        assert.deepEqual([...ti.range(1, 5, -2)], [], "range(from,to,-step)");
        assert.deepEqual(
            [...ti.range(5, 1)],
            [5, 4, 3, 2],
            "range(from,to) rev"
        );
        assert.deepEqual(
            [...ti.range(5, 1, -2)],
            [5, 3],
            "range(from,to,-step) rev"
        );
        assert.deepEqual([...ti.range(5, 1, 2)], [], "range(from,to,step) rev");
    });
    it("reduce", () => {
        assert.equal(
            ti.reduce((acc, x) => acc + x, -1, []),
            -1,
            "empty"
        );
        assert.equal(
            ti.reduce((acc, x) => acc + x, 0, ti.range(10)),
            45,
            "sum"
        );
        assert.equal(
            ti.reduce(
                (acc, x) => {
                    return (acc += x), acc >= 15 ? ti.reduced(acc) : acc;
                },
                0,
                ti.range()
            ),
            15,
            "sum reduced"
        );
    });
    it("reductions", () => {
        assert.deepEqual(
            [...ti.reductions((acc, x) => acc + x, -1, [])],
            [-1],
            "empty"
        );
        assert.deepEqual(
            [...ti.reductions((acc, x) => acc + x, 0, ti.range(10))],
            [0, 1, 3, 6, 10, 15, 21, 28, 36, 45],
            "sums"
        );
        assert.deepEqual(
            [
                ...ti.reductions(
                    (acc, x) => {
                        return (acc += x), acc >= 15 ? ti.reduced(acc) : acc;
                    },
                    0,
                    ti.range()
                ),
            ],
            [0, 1, 3, 6, 10, 15],
            "sum reduced"
        );
    });
    it("repeat", () => {
        assert.deepEqual([...ti.repeat(1, 3)], [1, 1, 1], "repeat(1,3)");
        assert.deepEqual(
            [...ti.take(3, ti.repeat(1))],
            [1, 1, 1],
            "take(3,repeat(1))"
        );
        assert.deepEqual([...ti.repeat(1, 0)], [], "repeat(1,0)");
        assert.deepEqual([...ti.repeat(1, -1)], [], "repeat(1,-1)");
    });
    it("repeatedly", () => {
        let f = () => 1;
        assert.deepEqual(
            [...ti.repeatedly(f, 3)],
            [1, 1, 1],
            "repeatedly(f,3)"
        );
        assert.deepEqual(
            [...ti.take(3, ti.repeatedly(f))],
            [1, 1, 1],
            "take(3,repeatedly(f))"
        );
        assert.deepEqual([...ti.repeatedly(f, 0)], [], "repeatedly(f,0)");
        assert.deepEqual([...ti.repeatedly(f, -1)], [], "repeatedly(f,-1)");
    });
    it("reverse", () => {
        assert.deepEqual([...ti.reverse([])], []);
        assert.deepEqual([...ti.reverse(ti.range(0))], []);
        assert.deepEqual([...ti.reverse("")], []);
        assert.deepEqual([...ti.reverse("a")], ["a"]);
        assert.deepEqual([...ti.reverse([0])], [0]);
        assert.deepEqual([...ti.reverse(ti.range(3))], [2, 1, 0]);
        assert.deepEqual([...ti.reverse("abc")], ["c", "b", "a"]);
    });
    it("some", () => {
        let nums = ti.iterator([1, 2, 3]) as IterableIterator<number>;
        assert.equal(
            ti.some((x) => x % 2 === 0, nums),
            2,
            "even"
        );
        assert.deepEqual(nums.next(), { value: 3, done: false }, "rest");
        nums = ti.iterator([1, 2, 3]) as IterableIterator<number>;
        assert.strictEqual(
            ti.some((x) => x > 3, nums),
            undefined,
            "x>3"
        );
        assert.deepEqual(
            nums.next(),
            { value: undefined, done: true },
            "no rest"
        );
    });
    it("take", () => {
        assert.deepEqual([...ti.take(3, [1, 2, 3, 4])], [1, 2, 3], "take(3)");
        assert.deepEqual([...ti.take(3, [])], [], "take(3) excess");
        assert.deepEqual([...ti.take(0, [1])], [], "take(0)");
        assert.deepEqual([...ti.take(-1, [1])], [], "take(-1)");
    });
    it("takeNth", () => {
        assert.deepEqual([...ti.takeNth(3, [])], [], "empty");
        assert.deepEqual([...ti.takeNth(3, ti.range(10))], [0, 3, 6, 9], "3rd");
    });
    it("takeWhile", () => {
        let input = ti.range(10);
        assert.deepEqual([...ti.takeWhile((_) => true, [])], [], "empty");
        assert.deepEqual(
            [...ti.takeWhile((x) => x < 5, input)],
            [0, 1, 2, 3, 4],
            "x<5"
        );
        assert.deepEqual([...input], [6, 7, 8, 9], "rest");
    });
    it("takeLast", () => {
        assert.deepEqual([...ti.takeLast(5, [])], [], "empty");
        assert.deepEqual(
            [...ti.takeLast(5, ti.range(1000))],
            [995, 996, 997, 998, 999],
            "last 1000"
        );
        assert.deepEqual([...ti.takeLast(5, ti.range(3))], [0, 1, 2], "excess");
    });
    it("walk", () => {
        let walk = (post: any) => {
            let res: any[] = [];
            ti.walk(
                (x) => res.push(x),
                [
                    [1, { a: [2] }],
                    ["3", [4]],
                ],
                post
            );
            return res;
        };
        assert.deepEqual(walk(false), [
            [
                [1, { a: [2] }],
                ["3", [4]],
            ],
            [1, { a: [2] }],
            1,
            { a: [2] },
            ["a", [2]],
            "a",
            [2],
            2,
            ["3", [4]],
            "3",
            [4],
            4,
        ]);
        assert.deepEqual(walk(true), [
            1,
            "a",
            2,
            [2],
            ["a", [2]],
            { a: [2] },
            [1, { a: [2] }],
            "3",
            4,
            [4],
            ["3", [4]],
            [
                [1, { a: [2] }],
                ["3", [4]],
            ],
        ]);
    });
    it("walkIterator", () => {
        assert.deepEqual(
            [
                ...ti.walkIterator(
                    [
                        [1, { a: [2] }],
                        ["3", [4]],
                    ],
                    false
                ),
            ],
            [
                [
                    [1, { a: [2] }],
                    ["3", [4]],
                ],
                [1, { a: [2] }],
                1,
                { a: [2] },
                ["a", [2]],
                "a",
                [2],
                2,
                ["3", [4]],
                "3",
                [4],
                4,
            ]
        );
        assert.deepEqual(
            [
                ...ti.walkIterator(
                    [
                        [1, { a: [2] }],
                        ["3", [4]],
                    ],
                    (x) => (Array.isArray(x) ? x : null),
                    false
                ),
            ],
            [
                [
                    [1, { a: [2] }],
                    ["3", [4]],
                ],
                [1, { a: [2] }],
                1,
                { a: [2] },
                ["3", [4]],
                "3",
                [4],
                4,
            ]
        );
        assert.deepEqual(
            [
                ...ti.walkIterator(
                    [
                        [1, { a: [2] }],
                        ["3", [4]],
                    ],
                    true
                ),
            ],
            [
                1,
                "a",
                2,
                [2],
                ["a", [2]],
                { a: [2] },
                [1, { a: [2] }],
                "3",
                4,
                [4],
                ["3", [4]],
                [
                    [1, { a: [2] }],
                    ["3", [4]],
                ],
            ]
        );
    });
    it("zip", () => {
        let langs = [
            { id: "js", name: "JavaScript" },
            { id: "clj", name: "Clojure" },
            { id: "ts", name: "TypeScript" },
        ];
        assert.deepEqual(
            ti.zip("abcdef", ti.range()),
            { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 },
            ""
        );
        assert.deepEqual(
            ti.zip(ti.range(5, 10), ti.range(100, 200), [
                ...new Uint8Array(16),
            ]),
            [0, 0, 0, 0, 0, 100, 101, 102, 103, 104, 0, 0, 0, 0, 0, 0],
            "typedarray"
        );
        assert.deepEqual(
            ti.zip(
                ti.map((x) => x.id, langs),
                langs
            ),
            {
                js: { id: "js", name: "JavaScript" },
                clj: { id: "clj", name: "Clojure" },
                ts: { id: "ts", name: "TypeScript" },
            },
            "obj"
        );
    });
});
