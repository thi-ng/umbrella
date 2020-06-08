import { juxt } from "../src";

import * as assert from "assert";

describe("juxt", () => {
    it("2-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10
        );
        assert.deepEqual(a(1), [2, 10]);
    });

    it("3-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x
        );
        assert.deepEqual(a(1), [2, 10, "id-1"]);
    });

    it("4-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x,
            (x: number) => [x, x]
        );
        assert.deepEqual(a(1), [2, 10, "id-1", [1, 1]]);
    });

    it("5-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepEqual(a(1), [2, 10, "id-1", [1, 1], { a: 1 }]);
    });

    it("6-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x - 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepEqual(a(1), [2, 0, 10, "id-1", [1, 1], { a: 1 }]);
    });

    it("7-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x - 1,
            (x: number) => x * 10,
            (x: number) => x * 100,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepEqual(a(1), [2, 0, 10, 100, "id-1", [1, 1], { a: 1 }]);
    });

    it("8-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x - 1,
            (x: number) => x * 10,
            (x: number) => x * 100,
            (x: number) => x * 1000,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepEqual(a(1), [2, 0, 10, 100, 1000, "id-1", [1, 1], { a: 1 }]);
    });

    it("9-args", () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x - 1,
            (x: number) => x * 10,
            (x: number) => x * 100,
            (x: number) => x * 1000,
            (x: number) => x * 10000,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepEqual(a(1), [
            2,
            0,
            10,
            100,
            1000,
            10000,
            "id-1",
            [1, 1],
            { a: 1 },
        ]);
    });
});
