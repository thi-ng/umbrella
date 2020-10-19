import { Type } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { ECS, MemMappedComponent } from "../src";

describe("component", () => {
    let ecs: ECS<any>;

    beforeEach(() => (ecs = new ECS({ capacity: 16 })));

    it("defComponent (minimal)", () => {
        const a = ecs.defComponent({ id: "a", type: Type.F32 });
        assert(a instanceof MemMappedComponent);
        assert(a.dense instanceof Uint8Array);
        assert(a.sparse instanceof Uint8Array);
        assert(a.vals instanceof Float32Array);
        assert.strictEqual(a.dense.length, ecs.idgen.capacity);
        assert.strictEqual(a.sparse.length, ecs.idgen.capacity);
        assert.strictEqual(a.vals.length, ecs.idgen.capacity);
        assert.strictEqual(a.size, 1);
        assert.strictEqual(a.stride, 1);
    });

    it("defComponent (w/ type)", () => {
        const a = ecs.defComponent({ id: "a", type: Type.U8 })!;
        assert(a.vals instanceof Uint8Array);
        assert.strictEqual(a.dense.length, ecs.idgen.capacity);
        assert.strictEqual(a.sparse.length, ecs.idgen.capacity);
        assert.strictEqual(a.vals.length, ecs.idgen.capacity);
        assert.strictEqual(a.size, 1);
        assert.strictEqual(a.stride, 1);
    });

    it("defComponent (w/ size)", () => {
        const a = ecs.defComponent({ id: "a", type: Type.F32, size: 2 })!;
        assert(a.vals instanceof Float32Array);
        assert.strictEqual(a.vals.length, ecs.idgen.capacity * 2);
        assert.strictEqual(a.size, 2);
        assert.strictEqual(a.stride, 2);
        const b = ecs.defComponent({
            id: "b",
            type: Type.F32,
            size: 3,
            stride: 4,
        })!;
        assert.strictEqual(b.vals.length, ecs.idgen.capacity * 4);
        assert.strictEqual(b.size, 3);
        assert.strictEqual(b.stride, 4);
    });

    it("add (w/ default val)", () => {
        const a = ecs.defComponent({
            id: "a",
            type: Type.F32,
            size: 2,
            default: [1, 2],
        })!;
        assert(a.add(8));
        assert(a.add(9, [10, 20]));
        assert(!a.add(16));
        assert.deepStrictEqual([...a.get(8)!], [1, 2]);
        assert.deepStrictEqual([...a.get(9)!], [10, 20]);
        assert(!a.add(8, [-1, -2]));
        assert.deepStrictEqual([...a.get(8)!], [1, 2]);
    });

    it("values / packedValues", () => {
        const a = ecs.defComponent({
            id: "a",
            type: Type.F32,
            size: 2,
            default: [1, 2],
        })!;
        assert(a.add(8));
        assert(a.add(9, [10, 20]));
        assert.deepStrictEqual([...a.packedValues()], [1, 2, 10, 20]);
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

    it("resize", () => {
        const a = ecs.defComponent({
            id: "a",
            type: Type.F32,
            size: 2,
            default: [1, 2],
        })!;
        const b = ecs.defComponent({ id: "b", default: "red" })!;
        const g = ecs.defGroup([a, b], [a, b]);
        const eid = ecs.defEntity([a, b]);
        assert.deepStrictEqual(g.getEntity(eid), {
            a: new Float32Array([1, 2]),
            b: "red",
            id: 0,
        });
        assert.strictEqual(a.sparse.length, 16);
        assert.strictEqual(b.sparse.length, 16);
        ecs.setCapacity(32);
        assert.strictEqual(a.sparse.length, 32);
        assert.strictEqual(b.sparse.length, 32);
        assert.deepStrictEqual(g.getEntity(eid), {
            a: new Float32Array([1, 2]),
            b: "red",
            id: 0,
        });
    });
});
