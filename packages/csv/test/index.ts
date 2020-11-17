import * as assert from "assert";
import { parseCSV, parseCSVString } from "../src";

describe("csv", () => {
    it("header", () => {
        assert.deepStrictEqual(
            [...parseCSV({ header: ["a", "b", "c"] }, ["1,2,3"])],
            [{ a: "1", b: "2", c: "3" }]
        );
    });

    it("column mapping", () => {
        assert.deepStrictEqual(
            [
                ...parseCSV(
                    {
                        all: false,
                        cols: {
                            a: { alias: "aa", coerce: (x) => x.toUpperCase() },
                            b: { alias: "bb", coerce: (x, row) => row.aa + x },
                        },
                    },
                    ["a,b,c", "foo,23,42", "bar,66,88"]
                ),
            ],
            [
                { aa: "FOO", bb: "FOO23" },
                { aa: "BAR", bb: "BAR66" },
            ]
        );
    });

    it("quotes", () => {
        assert.deepStrictEqual(
            [...parseCSVString({}, `a,b,c\n"ha ""he""\nho","2,",3\n4,,6`)],
            [
                { a: `ha "he"\nho`, b: "2,", c: "3" },
                { a: "4", b: "", c: "6" },
            ]
        );
    });

    it("quotes in header", () => {
        assert.deepStrictEqual(
            [
                ...parseCSVString(
                    {},
                    `"foo","bar\nbaz","fin,\n#ignore"\n#ignore2\n1,2,3\n`
                ),
            ],
            [{ foo: "1", "bar\nbaz": "2", "fin,\n#ignore": "3" }]
        );
    });
});
