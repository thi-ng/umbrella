import * as assert from "assert";

import { DCons } from "../src/index";

describe("DCons", () => {
    it("foo", () => {
        const a = new DCons([1, 2, 3, 4, 5, 6]);
        assert(a instanceof DCons);
    });
});
