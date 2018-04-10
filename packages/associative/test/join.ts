import * as assert from "assert";

import { EquivSet } from "../src/equiv-set";
import { join, joinWith } from "../src/join";

describe("join", () => {
    it("simple", () => {
        const a = new EquivSet([{ a: 1 }, { a: 2 }]);
        const b = new EquivSet([{ b: 1 }, { b: 2 }]);
        assert.deepEqual(join(a, b), new EquivSet([{ a: 1, b: 1 }, { a: 2, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 2 }]));
    });

    it("simple isec", () => {
        const a = new EquivSet([{ id: "a", type: 1 }, { id: "b", type: 1 }, { id: "c", type: 2 }]);
        const b = new EquivSet([{ type: 1, label: "foo" }, { type: 2, label: "bar" }, { type: 3, label: "baz" }]);
        assert.deepEqual(
            join(a, b),
            new EquivSet([
                { id: "a", type: 1, label: "foo" },
                { id: "b", type: 1, label: "foo" },
                { id: "c", type: 2, label: "bar" }
            ]));
    });

    it("joinWith", () => {
        const a = new EquivSet([{ id: "a", type: 1 }, { id: "b", type: 1 }, { id: "c", type: 2 }]);
        const b = new EquivSet([{ xyz: 1, label: "foo" }, { xyz: 2, label: "bar" }, { xyz: 3, label: "baz" }]);
        assert.deepEqual(
            joinWith(a, b, { type: "xyz" }),
            new EquivSet([
                { id: "a", type: 1, xyz: 1, label: "foo" },
                { id: "b", type: 1, xyz: 1, label: "foo" },
                { id: "c", type: 2, xyz: 2, label: "bar" }
            ]));
    });
});
