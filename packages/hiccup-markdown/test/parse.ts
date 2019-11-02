import { iterator } from "@thi.ng/transducers";
import * as assert from "assert";
import { parse } from "../src";

describe("parse", () => {
    it("CRLF", () => {
        assert.deepEqual(
            [...iterator(parse(), `# hello\r\n\r\nworld\r\n\r\n`)],
            [["h1", "hello"], ["p", "world"]]
        );
    });
});
