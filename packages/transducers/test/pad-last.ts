import { padLast } from "../src";

import * as assert from "assert";

describe("padLast", () => {
    it("all", () => {
        assert.deepEqual([...padLast(8, 0, [])], []);
        assert.deepEqual([...padLast(8, 0, [1])], [1, 0, 0, 0, 0, 0, 0, 0]);
        assert.deepEqual(
            [...padLast(8, 0, [1, 2, 3, 4, 5])],
            [1, 2, 3, 4, 5, 0, 0, 0]
        );
        assert.deepEqual([...padLast(2, 0, [1, 2, 3])], [1, 2, 3, 0]);
        assert.deepEqual([...padLast(2, 0, [1, 2, 3, 4])], [1, 2, 3, 4]);
    });
});
