import * as assert from "assert";
import {
    compareByKey,
    compareByKeys2,
    compareByKeys3,
    compareByKeys4,
} from "../src";

describe("compare", () => {
    it("compareByKey", () => {
        const src = [
            { a: 2, b: 2 },
            { a: 1, b: 1 },
            { a: 2, b: 1 },
            { a: 1, b: 2, c: 3 },
        ];
        const res = [
            { a: 1, b: 1 },
            { a: 1, b: 2, c: 3 },
            { a: 2, b: 2 },
            { a: 2, b: 1 },
        ];
        assert.deepStrictEqual([...src].sort(compareByKey("a")), res);
        assert.deepStrictEqual([...src].sort(compareByKey((x) => x.a)), res);
    });
    it("compareByKeys2", () => {
        const src = [
            { a: 2, b: 2 },
            { a: 1, b: 1 },
            { a: 2, b: 1 },
            { a: 1, b: 2, c: 3 },
        ];
        const res = [
            { a: 1, b: 1 },
            { a: 1, b: 2, c: 3 },
            { a: 2, b: 1 },
            { a: 2, b: 2 },
        ];
        assert.deepStrictEqual([...src].sort(compareByKeys2("a", "b")), res);
        assert.deepStrictEqual(
            [...src].sort(
                compareByKeys2(
                    (x) => x.a,
                    (x) => x.b
                )
            ),
            res
        );
    });

    it("compareByKeys3", () => {
        const src = [
            { a: 1, b: 2, c: 3 },
            { a: 1, b: 2, c: 1 },
            { a: 1, b: 1, c: 3 },
            { a: 0, b: 1, c: 4 },
        ];
        const res = [
            { a: 0, b: 1, c: 4 },
            { a: 1, b: 1, c: 3 },
            { a: 1, b: 2, c: 1 },
            { a: 1, b: 2, c: 3 },
        ];
        assert.deepStrictEqual(
            [...src].sort(compareByKeys3("a", "b", "c")),
            res
        );
        assert.deepStrictEqual(
            [...src].sort(
                compareByKeys3(
                    (x) => x.a,
                    (x) => x.b,
                    (x) => x.c
                )
            ),
            res
        );
    });

    it("compareByKeys4", () => {
        const src = [
            { a: 1, b: 2, c: 3, d: 3 },
            { a: 1, b: 2, c: 3, d: 2 },
            { a: 1, b: 2, c: 3, d: 0 },
            { a: 1, b: 2, c: 3, d: 1 },
        ];
        const res = [
            { a: 1, b: 2, c: 3, d: 0 },
            { a: 1, b: 2, c: 3, d: 1 },
            { a: 1, b: 2, c: 3, d: 2 },
            { a: 1, b: 2, c: 3, d: 3 },
        ];
        assert.deepStrictEqual(
            [...src].sort(compareByKeys4("a", "b", "c", "d")),
            res
        );
        assert.deepStrictEqual(
            [...src].sort(
                compareByKeys4(
                    (x) => x.a,
                    (x) => x.b,
                    (x) => x.c,
                    (x) => x.d
                )
            ),
            res
        );
    });
});
