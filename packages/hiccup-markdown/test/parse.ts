import { iterator } from "@thi.ng/transducers";
import * as assert from "assert";
import { parse } from "../src";

describe("parse", () => {
    it("CRLF", () => {
        assert.deepEqual(
            [...iterator(parse(), `# hello\r\n\r\nworld\r\n\r\n`)],
            [["h1", " hello "], ["p", "world "]]
        );
    });

    it("blockquote", () => {
        assert.deepEqual(
            [...iterator(parse(), `>a block **quote** of\n> two _lines_.\n\n`)],
            [
                [
                    "blockquote",
                    "a block ",
                    ["strong", "quote"],
                    " of ",
                    ["br"],
                    " two ",
                    ["em", "lines"],
                    ". "
                ]
            ]
        );
    });
});
