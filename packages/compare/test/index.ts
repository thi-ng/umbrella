import * as assert from "assert";
import {
    compareByKey,
    compareByKeys2,
    compareByKeys3,
    compareByKeys4
} from "../src";

describe("compare", () => {
    it("compareByKey", () => {
        assert.deepEqual(
            [
                { a: 2, b: 2 },
                { a: 1, b: 1 },
                { a: 2, b: 1 },
                { a: 1, b: 2, c: 3 }
            ].sort(compareByKey("a")),
            [
                { a: 1, b: 1 },
                { a: 1, b: 2, c: 3 },
                { a: 2, b: 2 },
                { a: 2, b: 1 }
            ]
        );
    });
    it("compareByKeys2", () => {
        assert.deepEqual(
            [
                { a: 2, b: 2 },
                { a: 1, b: 1 },
                { a: 2, b: 1 },
                { a: 1, b: 2, c: 3 }
            ].sort(compareByKeys2("a", "b")),
            [
                { a: 1, b: 1 },
                { a: 1, b: 2, c: 3 },
                { a: 2, b: 1 },
                { a: 2, b: 2 }
            ]
        );
    });

    it("compareByKeys3", () => {
        assert.deepEqual(
            [
                { a: 1, b: 2, c: 3 },
                { a: 1, b: 2, c: 1 },
                { a: 1, b: 1, c: 3 },
                { a: 0, b: 1, c: 4 }
            ].sort(compareByKeys3("a", "b", "c")),
            [
                { a: 0, b: 1, c: 4 },
                { a: 1, b: 1, c: 3 },
                { a: 1, b: 2, c: 1 },
                { a: 1, b: 2, c: 3 }
            ]
        );
    });

    it("compareByKeys4", () => {
        assert.deepEqual(
            [
                { a: 1, b: 2, c: 3, d: 3 },
                { a: 1, b: 2, c: 3, d: 2 },
                { a: 1, b: 2, c: 3, d: 0 },
                { a: 1, b: 2, c: 3, d: 1 }
            ].sort(compareByKeys4("a", "b", "c", "d")),
            [
                { a: 1, b: 2, c: 3, d: 0 },
                { a: 1, b: 2, c: 3, d: 1 },
                { a: 1, b: 2, c: 3, d: 2 },
                { a: 1, b: 2, c: 3, d: 3 }
            ]
        );
    });
});
