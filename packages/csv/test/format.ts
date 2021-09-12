import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { formatCSV, formatFloat, zeroPad } from "../src";

group("format array", {
    header: () =>
        assert.deepStrictEqual(
            [...formatCSV({ header: ["a", "b"] }, [[1, 2]])],
            ["a,b", "1,2"]
        ),

    "no header": () =>
        assert.deepStrictEqual([...formatCSV({}, [[1, 2]])], ["1,2"]),

    tx: () =>
        assert.deepStrictEqual(
            [...formatCSV({ cols: [null, formatFloat(2)] }, [[1, 2]])],
            ["1,2.00"]
        ),
});

group("format obj", {
    header: () =>
        assert.deepStrictEqual(
            [...formatCSV({ header: ["a", "b"] }, [{ a: 1, b: 2 }])],
            ["a,b", "1,2"]
        ),

    "no header": () =>
        assert.deepStrictEqual(
            [...formatCSV({}, [{ a: 1, b: 2 }])],
            ["a,b", "1,2"]
        ),

    tx: () =>
        assert.deepStrictEqual(
            [
                ...formatCSV({ cols: { a: zeroPad(4), b: formatFloat(2) } }, [
                    { a: 1, b: 2 },
                ]),
            ],
            ["a,b", "0001,2.00"]
        ),
});
