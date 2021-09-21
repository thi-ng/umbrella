import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { arrayIterator } from "../src";

group("arrayIterator", {
    basics: () => {
        assert.deepStrictEqual([...arrayIterator(null)], []);
        assert.deepStrictEqual([...arrayIterator([])], []);
        assert.deepStrictEqual([...arrayIterator([1])], [1]);
        assert.deepStrictEqual([...arrayIterator([1, 2, 3, 4], 2)], [3, 4]);
        assert.deepStrictEqual([...arrayIterator([1, 2, 3, 4], 2, 3)], [3]);
        assert.deepStrictEqual(
            [...arrayIterator([1, 2, 3, 4], 3, -1)],
            [4, 3, 2, 1]
        );
    },
});
