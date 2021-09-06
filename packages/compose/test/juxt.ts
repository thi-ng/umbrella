import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { juxt } from "../src";

group("juxt", {
    "2-args": () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10
        );
        assert.deepStrictEqual(a(1), [2, 10]);
    },

    "3-args": () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x
        );
        assert.deepStrictEqual(a(1), [2, 10, "id-1"]);
    },

    "4-args": () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x,
            (x: number) => [x, x]
        );
        assert.deepStrictEqual(a(1), [2, 10, "id-1", [1, 1]]);
    },

    "5-args": () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepStrictEqual(a(1), [2, 10, "id-1", [1, 1], { a: 1 }]);
    },

    "6-args": () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x - 1,
            (x: number) => x * 10,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepStrictEqual(a(1), [2, 0, 10, "id-1", [1, 1], { a: 1 }]);
    },

    "7-args": () => {
        const a = juxt(
            (x: number) => x + 1,
            (x: number) => x - 1,
            (x: number) => x * 10,
            (x: number) => x * 100,
            (x: number) => "id-" + x,
            (x: number) => [x, x],
            (x: number) => ({ a: x })
        );
        assert.deepStrictEqual(a(1), [2, 0, 10, 100, "id-1", [1, 1], { a: 1 }]);
    },

    "8-args": () => {
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
        assert.deepStrictEqual(a(1), [
            2,
            0,
            10,
            100,
            1000,
            "id-1",
            [1, 1],
            { a: 1 },
        ]);
    },

    "9-args": () => {
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
        assert.deepStrictEqual(a(1), [
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
    },
});
