import { group } from "@thi.ng/testament";
import * as assert from "assert";
import * as ti from "../src";

group("iterators", {
    butLast: () => {
        assert.deepStrictEqual([...ti.butLast([])], [], "empty");
        assert.deepStrictEqual([...ti.butLast([1])], [], "1");
        assert.deepStrictEqual([...ti.butLast([1, 2])], [1], "2");
        assert.deepStrictEqual([...ti.butLast([1, 2, 3])], [1, 2], "3");
        assert.deepStrictEqual(
            [...ti.butLast("hello")],
            ["h", "e", "l", "l"],
            "str"
        );
        assert.deepStrictEqual(
            [...ti.butLast(ti.range(10))],
            [0, 1, 2, 3, 4, 5, 6, 7, 8],
            "range"
        );
    },

    cached: () => {
        let cache = ti.cached(ti.range(3));
        let a = cache();
        let b = cache();
        let c = cache();
        assert.strictEqual(a.next().value, 0, "a.next 0");
        assert.strictEqual(a.next().value, 1, "a.next 1");
        assert.strictEqual(b.next().value, 0, "b.next 0");
        assert.strictEqual(c.next().value, 0, "c.next 0");
        assert.strictEqual(a.next().value, 2, "a.next 2");
        assert.strictEqual(c.next().value, 1, "c.next 1");
        assert.strictEqual(b.next().value, 1, "b.next 1");
        assert.strictEqual(a.next().value, undefined, "a.next done");
        assert.strictEqual(ti.iterator(a), a, "iterator(a)");
        assert.strictEqual(
            ti.cached([])().next().value,
            undefined,
            "a.next empty"
        );
    },

    consume: () => {
        let i;
        assert.deepStrictEqual(
            [...((i = ti.range(3)), ti.consume(i), i)],
            [],
            "consume all"
        );
        assert.deepStrictEqual(
            [...((i = ti.range(3)), ti.consume(i, 3), i)],
            [],
            "consume 3"
        );
        assert.deepStrictEqual(
            [...((i = ti.range(3)), ti.consume(i, 10), i)],
            [],
            "consume 10"
        );
        assert.deepStrictEqual(
            [...((i = ti.range(3)), ti.consume(i, 2), i)],
            [2],
            "consume 2"
        );
        assert.deepStrictEqual(
            [...((i = ti.range(3)), ti.consume(i, -2), i)],
            [0, 1, 2],
            "consume -2"
        );
    },

    concat: () => {
        assert.deepStrictEqual([...ti.concat([])], [], "empty");
        assert.deepStrictEqual(
            [...ti.concat<any>([], "", ti.range(0))],
            [],
            "3 args empty"
        );
        assert.deepStrictEqual(
            [...ti.concat<any>([1, 2, 3], "abc", ti.range(3))],
            [1, 2, 3, "a", "b", "c", 0, 1, 2],
            "3 args any"
        );
        assert.deepStrictEqual(
            [...ti.concat.apply(null, <any>["abc", null, [1, 2, 3]])],
            ["a", "b", "c", 1, 2, 3],
            "skip null"
        );
    },

    constantly: () => {
        const f = ti.constantly(1);
        assert.strictEqual(f(), 1, "no arg");
        assert.strictEqual(f(2), 1, "1 arg");
        assert.strictEqual(f(2, 3), 1, "2 args");
    },

    cycle: () => {
        assert.deepStrictEqual([...ti.cycle([])], [], "empty");
        assert.deepStrictEqual(
            [...ti.take(7, ti.cycle(ti.range(3)))],
            [0, 1, 2, 0, 1, 2, 0],
            "cycle range(3)"
        );
        assert.deepStrictEqual(
            [...ti.take(7, ti.cycle("abc"))],
            ["a", "b", "c", "a", "b", "c", "a"],
            "cycle string"
        );
    },

    dedupe: () => {
        assert.deepStrictEqual([...ti.dedupe([])], [], "empty");
        assert.deepStrictEqual(
            [...ti.dedupe([1, 2, 2, 3, 4, 4, 4, 3])],
            [1, 2, 3, 4, 3],
            "array"
        );
        assert.deepStrictEqual(
            [...ti.dedupe("abbcccaabb")],
            ["a", "b", "c", "a", "b"],
            "string"
        );
    },

    dedupeWith: () => {
        let coll = [
            { a: 1 },
            { a: 1, b: 2 },
            { a: 2, b: 2 },
            { a: 2, b: 2 },
            { a: 3 },
        ];
        let eq = (a: any, b: any) => a.a === b.a;
        assert.deepStrictEqual([...ti.dedupeWith(eq, [])], [], "empty");
        assert.deepStrictEqual(
            [...ti.dedupeWith(eq, coll)],
            [{ a: 1 }, { a: 2, b: 2 }, { a: 3 }],
            "array[obj]"
        );
    },

    dense: () => {
        assert.deepStrictEqual(
            [...ti.dense([, 1, , 2, false, null, undefined, 0, 3])],
            [1, 2, false, 0, 3]
        );
    },

    drop: () => {
        assert.deepStrictEqual([...ti.drop(100, [])], [], "empty");
        assert.deepStrictEqual([...ti.drop(4, [1, 2, 3])], [], "drop(4)");
        assert.deepStrictEqual([...ti.drop(3, [1, 2, 3])], [], "drop(3)");
        assert.deepStrictEqual([...ti.drop(2, [1, 2, 3])], [3], "drop(2)");
        assert.deepStrictEqual([...ti.drop(0, [1])], [1], "drop(0)");
        assert.deepStrictEqual([...ti.drop(-1, [1])], [1], "drop(-1)");
        assert.deepStrictEqual(
            [...ti.drop(3, ti.range(5))],
            [3, 4],
            "drop(3, range)"
        );
    },

    dropNth: () => {
        assert.deepStrictEqual([...ti.dropNth(2, [])], [], "empty");
        assert.deepStrictEqual(
            [...ti.dropNth(1, ti.range(6))],
            [],
            "dropNth(1)"
        );
        assert.deepStrictEqual(
            [...ti.dropNth(2, ti.range(6))],
            [0, 2, 4],
            "dropNth(2)"
        );
        assert.deepStrictEqual(
            [...ti.dropNth(3, ti.range(6))],
            [0, 1, 3, 4],
            "dropNth(3)"
        );
        assert.deepStrictEqual(
            [...ti.dropNth(-1, ti.range(6))],
            [],
            "dropNth(-1)"
        );
    },

    dropWhile: () => {
        assert.deepStrictEqual(
            [...ti.dropWhile((_) => false, [])],
            [],
            "empty"
        );
        assert.deepStrictEqual(
            [...ti.dropWhile((_) => true, [1, 2, 3])],
            [],
            "always"
        );
        assert.deepStrictEqual(
            [...ti.dropWhile((x) => x < 3, ti.range(6))],
            [3, 4, 5],
            "x<3"
        );
        assert.deepStrictEqual(
            [...ti.dropWhile((x) => x > 3, ti.range(6))],
            [0, 1, 2, 3, 4, 5],
            "none"
        );
    },

    ensureIterable: () => {
        assert.doesNotThrow(() => ti.ensureIterable([]), "array");
        assert.throws(() => ti.ensureIterable({}), "obj");
    },

    every: () => {
        let nums = ti.iterator([2, 4, 6, 8, 10]) as IterableIterator<number>;
        assert.ok(!ti.every((_) => true, []), "empty");
        assert.ok(
            ti.every((x) => x % 2 === 0, nums),
            "even"
        );
        assert.deepStrictEqual(
            nums.next(),
            { value: undefined, done: true },
            "nums done"
        );
        nums = ti.iterator([2, 3, 4]) as IterableIterator<number>;
        assert.ok(!ti.every((x) => x % 2 === 0, nums), "not even");
        assert.deepStrictEqual(
            nums.next(),
            { value: 4, done: false },
            "next = 4"
        );
    },

    filter: () => {
        assert.deepStrictEqual([...ti.filter((_) => true, [])], [], "empty");
        assert.deepStrictEqual(
            [...ti.filter((x) => x % 3 === 0, ti.range(10))],
            [0, 3, 6, 9],
            "mult3"
        );
    },

    flatten: () => {
        assert.deepStrictEqual([...ti.flatten([])], [], "empty");
        assert.deepStrictEqual(
            [...ti.flatten([null, [null, [undefined]]])],
            [null, null, undefined],
            "nulls"
        );
        assert.deepStrictEqual(
            [...ti.flatten([1, ti.range(2, 4), [4, [5, ["abc"]]]])],
            [1, 2, 3, 4, 5, "abc"],
            "nested"
        );
        assert.deepStrictEqual(
            [...ti.flatten([{ a: 23, b: 42, c: [1, 2, 3] }])],
            ["a", 23, "b", 42, "c", 1, 2, 3],
            "obj iter"
        );
        assert.deepStrictEqual(
            [...ti.flatten([{ a: 23, b: 42, c: [1, 2, 3] }], false)],
            [{ a: 23, b: 42, c: [1, 2, 3] }],
            "no obj"
        );
    },

    flattenWith: () => {
        let tx = (x: any) =>
            typeof x == "string"
                ? ti.map((x) => x.charCodeAt(0), x)
                : ti.maybeIterator(x);
        assert.deepStrictEqual(
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
    },

    fnil: () => {
        let f = ti.fnil(
            (x) => x + 1,
            () => 0
        );
        assert.strictEqual(f(), 1);
        assert.strictEqual(f(1), 2);
        f = ti.fnil(
            (a, b) => a + b,
            () => 0,
            () => 10
        );
        assert.strictEqual(f(), 10);
        assert.strictEqual(f(1), 11);
        assert.strictEqual(f(1, 2), 3);
        f = ti.fnil(
            (a, b, c) => a + b + c,
            () => 0,
            () => 10,
            () => 100
        );
        assert.strictEqual(f(), 110);
        assert.strictEqual(f(1), 111);
        assert.strictEqual(f(1, 2), 103);
        assert.strictEqual(f(1, 2, 3), 6);
        assert.throws(() => ti.fnil(() => {}));
    },

    fork: () => {
        const f = ti.fork([1, 2, 3, 4], 3);
        const fa = f();
        const fb = f();
        assert.strictEqual(fa.next().value, 1);
        assert.strictEqual(fa.next().value, 2);
        assert.strictEqual(fb.next().value, 1);

        assert.strictEqual(fa.next().value, 3);
        assert.strictEqual(fa.next().value, 4);
        assert.strictEqual(fb.next().value, 2);
        assert.ok(fa.next().done);
        assert.strictEqual(fb.next().value, 3);
        assert.strictEqual(fb.next().value, 4);
        assert.ok(fb.next().done);
    },

    frequencies: () => {
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
            [...ti.frequencies([1, 2, 3, 4, 5, 9, 3], (x: number) => x & ~1)],
            [
                [0, 1],
                [2, 3],
                [4, 2],
                [8, 1],
            ],
            "key fn"
        );
    },

    groupBy: () => {
        assert.deepStrictEqual(
            ti.groupBy((x) => x & ~1, [1, 2, 3, 4, 5, 9, 3]),
            { "0": [1], "2": [2, 3, 3], "4": [4, 5], "8": [9] },
            "mult 2"
        );
    },

    identity: () => {
        const x = { a: 1 };
        assert.strictEqual(ti.identity(x), x);
        assert.strictEqual(ti.identity(null), null);
        assert.strictEqual(ti.identity(undefined), undefined);
    },

    indexed: () => {
        assert.deepStrictEqual(
            [...ti.indexed([10, 20, 30])],
            [
                [0, 10],
                [1, 20],
                [2, 30],
            ]
        );
    },

    interleave: () => {
        assert.throws(() => ti.interleave().next(), "no inputs");
        assert.deepStrictEqual(
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
    },

    interpose: () => {
        assert.deepStrictEqual(
            [...ti.interpose("/", ti.range(5))],
            [0, "/", 1, "/", 2, "/", 3, "/", 4],
            "slash"
        );
    },

    iterate: () => {
        assert.deepStrictEqual(
            [
                ...ti.take(
                    10,
                    ti.iterate((x) => x * 2, 1)
                ),
            ],
            [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
            "pow2"
        );
    },

    maybeIterator: () => {
        assert.ok(ti.maybeIterator("a") !== undefined, "str");
        assert.ok(ti.maybeIterator([]) !== undefined, "array");
        assert.ok(ti.maybeIterator(ti.range()) !== undefined, "generator");
        assert.strictEqual(ti.maybeIterator(undefined), undefined, "undefined");
        assert.strictEqual(ti.maybeIterator(null), undefined, "null");
        assert.strictEqual(ti.maybeIterator(0), undefined, "0");
        assert.strictEqual(ti.maybeIterator({}), undefined, "obj");
    },

    maybeObjectIterator: () => {
        assert.ok(ti.maybeObjectIterator({}) != undefined, "obj");
        assert.ok(ti.maybeObjectIterator([]) != undefined, "array");
        assert.strictEqual(
            ti.maybeObjectIterator(undefined),
            undefined,
            "undefined"
        );
        assert.strictEqual(ti.maybeObjectIterator(null), undefined, "null");
        assert.strictEqual(ti.maybeObjectIterator(0), undefined, "0");
        assert.strictEqual(ti.maybeObjectIterator("a"), undefined, "str");
        assert.strictEqual(
            ti.maybeObjectIterator(ti.range()),
            undefined,
            "generator"
        );
    },

    juxt: () => {
        let kernel = ti.juxt<number>(
            (x) => x - 1,
            (x) => x,
            (x) => x + 1
        );
        assert.deepStrictEqual(ti.juxt((x) => x)(1), [1], "ident1");
        assert.deepStrictEqual(
            ti.juxt(
                (x) => x,
                (x) => x
            )(1),
            [1, 1],
            "ident2"
        );
        assert.deepStrictEqual(kernel(1), [0, 1, 2], "kernel");
        assert.deepStrictEqual(
            [...ti.map(kernel, ti.range(3))],
            [
                [-1, 0, 1],
                [0, 1, 2],
                [1, 2, 3],
            ],
            "map kernel"
        );
    },

    last: () => {
        assert.strictEqual(ti.last([]), undefined, "empty");
        assert.strictEqual(ti.last(ti.range(10)), 9, "range(10)");
        assert.strictEqual(ti.last(ti.take(10, ti.range())), 9, "range()");
    },

    map: () => {
        assert.deepStrictEqual([...ti.map((x) => x * 10)], [], "no input");
        assert.deepStrictEqual(
            [...ti.map((x) => x * 10, ti.range(3))],
            [0, 10, 20],
            "range(3)"
        );
        assert.deepStrictEqual(
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
    },

    mapcat: () => {
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
            [
                ...ti.mapcat(
                    (x) => (x < 5 ? ti.repeat(x, x) : null),
                    ti.range(10)
                ),
            ],
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4],
            "skip null"
        );
    },

    mapIndexed: () => {
        assert.deepStrictEqual(
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
    },

    objectIterator: () => {
        assert.deepStrictEqual(
            [...ti.objectIterator({ a: 23, b: 42, c: [1, 2, 3] })],
            [
                ["a", 23],
                ["b", 42],
                ["c", [1, 2, 3]],
            ],
            "mixed"
        );
    },

    partition: () => {
        assert.throws(() => ti.partition(0, 0, ti.range(3)).next(), "bad size");
        assert.throws(() => ti.partition(1, 0, ti.range(3)).next(), "bad step");
        assert.deepStrictEqual(
            [...ti.partition(1, 1, ti.range(3))],
            [[0], [1], [2]],
            "1,1"
        );
        assert.deepStrictEqual(
            [...ti.partition(3, 3, ti.range(7))],
            [
                [0, 1, 2],
                [3, 4, 5],
            ],
            "3,3"
        );
        assert.deepStrictEqual(
            [...ti.partition(3, 3, ti.range(7), true)],
            [[0, 1, 2], [3, 4, 5], [6]],
            "3,3 all"
        );
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
            [...ti.partition(3, 5, ti.range(11))],
            [
                [0, 1, 2],
                [5, 6, 7],
            ],
            "3,5"
        );
        assert.deepStrictEqual(
            [...ti.partition(3, 5, ti.range(11), true)],
            [[0, 1, 2], [5, 6, 7], [10]],
            "3,5 all"
        );
    },

    partitionBy: () => {
        assert.deepStrictEqual(
            [...ti.partitionBy((x) => (x / 5) | 0, ti.range(11))],
            [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10]],
            "mult5"
        );
    },

    randomSample: () => {
        ti.run((_) => {
            let l = [...ti.randomSample(0.5, ti.range(100))].length;
            assert.ok(l >= 30 && l <= 70, `50% (${l})`);
        }, ti.range(100));
    },

    range: () => {
        assert.deepStrictEqual(
            [...ti.take(5, ti.range())],
            [0, 1, 2, 3, 4],
            "unbounded"
        );
        assert.deepStrictEqual([...ti.range(5)], [0, 1, 2, 3, 4], "range(to)");
        assert.deepStrictEqual(
            [...ti.range(1, 5)],
            [1, 2, 3, 4],
            "range(from,to)"
        );
        assert.deepStrictEqual(
            [...ti.range(1, 5, 2)],
            [1, 3],
            "range(from,to,step)"
        );
        assert.deepStrictEqual(
            [...ti.range(1, 5, -2)],
            [],
            "range(from,to,-step)"
        );
        assert.deepStrictEqual(
            [...ti.range(5, 1)],
            [5, 4, 3, 2],
            "range(from,to) rev"
        );
        assert.deepStrictEqual(
            [...ti.range(5, 1, -2)],
            [5, 3],
            "range(from,to,-step) rev"
        );
        assert.deepStrictEqual(
            [...ti.range(5, 1, 2)],
            [],
            "range(from,to,step) rev"
        );
    },

    reduce: () => {
        assert.strictEqual(
            ti.reduce((acc, x) => acc + x, -1, []),
            -1,
            "empty"
        );
        assert.strictEqual(
            ti.reduce((acc, x) => acc + x, 0, ti.range(10)),
            45,
            "sum"
        );
        assert.strictEqual(
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
    },

    reductions: () => {
        assert.deepStrictEqual(
            [...ti.reductions((acc, x) => acc + x, -1, [])],
            [-1],
            "empty"
        );
        assert.deepStrictEqual(
            [...ti.reductions((acc, x) => acc + x, 0, ti.range(10))],
            [0, 1, 3, 6, 10, 15, 21, 28, 36, 45],
            "sums"
        );
        assert.deepStrictEqual(
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
    },

    repeat: () => {
        assert.deepStrictEqual([...ti.repeat(1, 3)], [1, 1, 1], "repeat(1,3)");
        assert.deepStrictEqual(
            [...ti.take(3, ti.repeat(1))],
            [1, 1, 1],
            "take(3,repeat(1))"
        );
        assert.deepStrictEqual([...ti.repeat(1, 0)], [], "repeat(1,0)");
        assert.deepStrictEqual([...ti.repeat(1, -1)], [], "repeat(1,-1)");
    },

    repeatedly: () => {
        let f = () => 1;
        assert.deepStrictEqual(
            [...ti.repeatedly(f, 3)],
            [1, 1, 1],
            "repeatedly(f,3)"
        );
        assert.deepStrictEqual(
            [...ti.take(3, ti.repeatedly(f))],
            [1, 1, 1],
            "take(3,repeatedly(f))"
        );
        assert.deepStrictEqual([...ti.repeatedly(f, 0)], [], "repeatedly(f,0)");
        assert.deepStrictEqual(
            [...ti.repeatedly(f, -1)],
            [],
            "repeatedly(f,-1)"
        );
    },

    reverse: () => {
        assert.deepStrictEqual([...ti.reverse([])], []);
        assert.deepStrictEqual([...ti.reverse(ti.range(0))], []);
        assert.deepStrictEqual([...ti.reverse("")], []);
        assert.deepStrictEqual([...ti.reverse("a")], ["a"]);
        assert.deepStrictEqual([...ti.reverse([0])], [0]);
        assert.deepStrictEqual([...ti.reverse(ti.range(3))], [2, 1, 0]);
        assert.deepStrictEqual([...ti.reverse("abc")], ["c", "b", "a"]);
    },

    some: () => {
        let nums = ti.iterator([1, 2, 3]) as IterableIterator<number>;
        assert.strictEqual(
            ti.some((x) => x % 2 === 0, nums),
            2,
            "even"
        );
        assert.deepStrictEqual(nums.next(), { value: 3, done: false }, "rest");
        nums = ti.iterator([1, 2, 3]) as IterableIterator<number>;
        assert.strictEqual(
            ti.some((x) => x > 3, nums),
            undefined,
            "x>3"
        );
        assert.deepStrictEqual(
            nums.next(),
            { value: undefined, done: true },
            "no rest"
        );
    },

    take: () => {
        assert.deepStrictEqual(
            [...ti.take(3, [1, 2, 3, 4])],
            [1, 2, 3],
            "take(3)"
        );
        assert.deepStrictEqual([...ti.take(3, [])], [], "take(3) excess");
        assert.deepStrictEqual([...ti.take(0, [1])], [], "take(0)");
        assert.deepStrictEqual([...ti.take(-1, [1])], [], "take(-1)");
    },

    takeNth: () => {
        assert.deepStrictEqual([...ti.takeNth(3, [])], [], "empty");
        assert.deepStrictEqual(
            [...ti.takeNth(3, ti.range(10))],
            [0, 3, 6, 9],
            "3rd"
        );
    },

    takeWhile: () => {
        let input = ti.range(10);
        assert.deepStrictEqual([...ti.takeWhile((_) => true, [])], [], "empty");
        assert.deepStrictEqual(
            [...ti.takeWhile((x) => x < 5, input)],
            [0, 1, 2, 3, 4],
            "x<5"
        );
        assert.deepStrictEqual([...input], [6, 7, 8, 9], "rest");
    },

    takeLast: () => {
        assert.deepStrictEqual([...ti.takeLast(5, [])], [], "empty");
        assert.deepStrictEqual(
            [...ti.takeLast(5, ti.range(1000))],
            [995, 996, 997, 998, 999],
            "last 1000"
        );
        assert.deepStrictEqual(
            [...ti.takeLast(5, ti.range(3))],
            [0, 1, 2],
            "excess"
        );
    },

    walk: () => {
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
        assert.deepStrictEqual(walk(false), [
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
        assert.deepStrictEqual(walk(true), [
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
    },

    walkIterator: () => {
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
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
        assert.deepStrictEqual(
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
    },

    zip: () => {
        let langs = [
            { id: "js", name: "JavaScript" },
            { id: "clj", name: "Clojure" },
            { id: "ts", name: "TypeScript" },
        ];
        assert.deepStrictEqual(
            ti.zip("abcdef", ti.range()),
            { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 },
            ""
        );
        assert.deepStrictEqual(
            ti.zip(ti.range(5, 10), ti.range(100, 200), [
                ...new Uint8Array(16),
            ]),
            [0, 0, 0, 0, 0, 100, 101, 102, 103, 104, 0, 0, 0, 0, 0, 0],
            "typedarray"
        );
        assert.deepStrictEqual(
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
    },
});
