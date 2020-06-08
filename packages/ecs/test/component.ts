import { Type } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { ECS, MemMappedComponent } from "../src";

describe("component", () => {
    let ecs: ECS<any>;

    beforeEach(() => (ecs = new ECS(16)));

    it("defComponent (minimal)", () => {
        const a = ecs.defComponent({ id: "a", type: Type.F32 });
        assert(a instanceof MemMappedComponent);
        assert(a.dense instanceof Uint8Array);
        assert(a.sparse instanceof Uint8Array);
        assert(a.vals instanceof Float32Array);
        assert.equal(a.dense.length, ecs.idgen.capacity);
        assert.equal(a.sparse.length, ecs.idgen.capacity);
        assert.equal(a.vals.length, ecs.idgen.capacity);
        assert.equal(a.size, 1);
        assert.equal(a.stride, 1);
    });

    it("defComponent (w/ type)", () => {
        const a = ecs.defComponent({ id: "a", type: Type.U8 });
        assert(a.vals instanceof Uint8Array);
        assert.equal(a.dense.length, ecs.idgen.capacity);
        assert.equal(a.sparse.length, ecs.idgen.capacity);
        assert.equal(a.vals.length, ecs.idgen.capacity);
        assert.equal(a.size, 1);
        assert.equal(a.stride, 1);
    });

    it("defComponent (w/ size)", () => {
        const a = ecs.defComponent({ id: "a", type: Type.F32, size: 2 });
        assert(a.vals instanceof Float32Array);
        assert.equal(a.vals.length, ecs.idgen.capacity * 2);
        assert.equal(a.size, 2);
        assert.equal(a.stride, 2);
        const b = ecs.defComponent({
            id: "b",
            type: Type.F32,
            size: 3,
            stride: 4,
        });
        assert.equal(b.vals.length, ecs.idgen.capacity * 4);
        assert.equal(b.size, 3);
        assert.equal(b.stride, 4);
    });

    it("add (w/ default val)", () => {
        const a = ecs.defComponent({
            id: "a",
            type: Type.F32,
            size: 2,
            default: [1, 2],
        });
        assert(a.add(8));
        assert(a.add(9, [10, 20]));
        assert(!a.add(16));
        assert.deepEqual([...a.get(8)!], [1, 2]);
        assert.deepEqual([...a.get(9)!], [10, 20]);
        assert(!a.add(8, [-1, -2]));
        assert.deepEqual([...a.get(8)!], [1, 2]);
    });

    it("values / packeValues", () => {
        const a = ecs.defComponent({
            id: "a",
            type: Type.F32,
            size: 2,
            default: [1, 2],
        });
        assert(a.add(8));
        assert(a.add(9, [10, 20]));
        assert.deepEqual([...a.packedValues()], [1, 2, 10, 20]);
        assert(
            equiv(
                [...a.values()],
                [
                    [10, 20],
                    [1, 2],
                ]
            )
        );
    });
});
