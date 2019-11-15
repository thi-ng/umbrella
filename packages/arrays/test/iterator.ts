import * as assert from "assert";
import { arrayIterator } from "../src";

describe("arrayIterator", () => {
    it("basics", () => {
        assert.deepEqual([...arrayIterator(null)], []);
        assert.deepEqual([...arrayIterator([])], []);
        assert.deepEqual([...arrayIterator([1])], [1]);
        assert.deepEqual([...arrayIterator([1, 2, 3, 4], 2)], [3, 4]);
        assert.deepEqual([...arrayIterator([1, 2, 3, 4], 2, 3)], [3]);
        assert.deepEqual([...arrayIterator([1, 2, 3, 4], 3, -1)], [4, 3, 2, 1]);
    });
});
