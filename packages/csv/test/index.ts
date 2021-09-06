import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { parseCSV, parseCSVFromString } from "../src";

group("csv", {
    header: () => {
        assert.deepStrictEqual(
            [...parseCSV({ header: ["a", "b", "c"] }, ["1,2,3"])],
            [{ a: "1", b: "2", c: "3" }]
        );
    },

    "column mapping (obj)": () => {
        assert.deepStrictEqual(
            [
                ...parseCSV(
                    {
                        cols: {
                            a: { alias: "aa", tx: (x) => x.toUpperCase() },
                            b: { alias: "bb", tx: (x, row) => row.aa + x },
                        },
                    },
                    ["a,b,c", "foo,23,42", "bar,66,88"]
                ),
            ],
            [
                { aa: "FOO", bb: "FOO23", c: "42" },
                { aa: "BAR", bb: "BAR66", c: "88" },
            ]
        );
    },

    "column mapping (array, no header)": () => {
        assert.deepStrictEqual(
            [
                ...parseCSV(
                    {
                        all: false,
                        header: [],
                        cols: [
                            { tx: (x) => x.toUpperCase() },
                            null,
                            { alias: "cc", tx: (x, row) => row[0] + x },
                        ],
                    },
                    ["foo,23,42", "bar,66,88"]
                ),
            ],
            [
                { 0: "FOO", cc: "FOO42" },
                { 0: "BAR", cc: "BAR88" },
            ]
        );
    },

    "column mapping (array, w/ header)": () => {
        assert.deepStrictEqual(
            [
                ...parseCSV(
                    {
                        all: false,
                        header: ["a", "b", "c"],
                        cols: [
                            { tx: (x) => x.toUpperCase() },
                            null,
                            { alias: "cc", tx: (x, row) => row.a + x },
                        ],
                    },
                    ["foo,23,42", "bar,66,88"]
                ),
            ],
            [
                { a: "FOO", cc: "FOO42" },
                { a: "BAR", cc: "BAR88" },
            ]
        );
    },

    quotes: () => {
        assert.deepStrictEqual(
            [...parseCSVFromString({}, `a,b,c\n"ha ""he""\nho","2,",3\n4,,6`)],
            [
                { a: `ha "he"\nho`, b: "2,", c: "3" },
                { a: "4", b: "", c: "6" },
            ]
        );
    },

    "quotes in header": () => {
        assert.deepStrictEqual(
            [
                ...parseCSVFromString(
                    {},
                    `"foo","bar\nbaz","fin,\n#ignore"\n#ignore2\n1,2,3\n`
                ),
            ],
            [{ foo: "1", "bar\nbaz": "2", "fin,\n#ignore": "3" }]
        );
    },
});
