import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import { ECS, MemMappedComponent } from "../src/index.js";

let ecs: ECS<any>;

const init = () => {
	ecs = new ECS({ capacity: 16 });
};

test("defComponent (minimal)", () => {
	init();
	const a = ecs.defComponent({ id: "a", type: "f32" })!;
	expect(a instanceof MemMappedComponent).toBeTrue();
	expect(a.dense instanceof Uint8Array).toBeTrue();
	expect(a.sparse instanceof Uint8Array).toBeTrue();
	expect(a.vals instanceof Float32Array).toBeTrue();
	expect(a.dense.length).toBe(ecs.idgen.capacity);
	expect(a.sparse.length).toBe(ecs.idgen.capacity);
	expect(a.vals.length).toBe(ecs.idgen.capacity);
	expect(a.size).toBe(1);
	expect(a.stride).toBe(1);
});

test("defComponent (w/ type)", () => {
	init();
	const a = ecs.defComponent({ id: "a", type: "u8" })!;
	expect(a.vals instanceof Uint8Array).toBeTrue();
	expect(a.dense.length).toBe(ecs.idgen.capacity);
	expect(a.sparse.length).toBe(ecs.idgen.capacity);
	expect(a.vals.length).toBe(ecs.idgen.capacity);
	expect(a.size).toBe(1);
	expect(a.stride).toBe(1);
});

test("defComponent (w/ size)", () => {
	init();
	const a = ecs.defComponent({ id: "a", type: "f32", size: 2 })!;
	expect(a.vals instanceof Float32Array).toBeTrue();
	expect(a.vals.length).toBe(ecs.idgen.capacity * 2);
	expect(a.size).toBe(2);
	expect(a.stride).toBe(2);
	const b = ecs.defComponent({
		id: "b",
		type: "f32",
		size: 3,
		stride: 4,
	})!;
	expect(b.vals.length).toBe(ecs.idgen.capacity * 4);
	expect(b.size).toBe(3);
	expect(b.stride).toBe(4);
});

test("add (w/ default val)", () => {
	init();
	const a = ecs.defComponent({
		id: "a",
		type: "f32",
		size: 2,
		default: [1, 2],
	})!;
	expect(a.add(8)).toBeTrue();
	expect(a.add(9, [10, 20])).toBeTrue();
	expect(a.add(16)).toBeFalse();
	expect([...a.get(8)!]).toEqual([1, 2]);
	expect([...a.get(9)!]).toEqual([10, 20]);
	expect(a.add(8, [-1, -2])).toBeFalse();
	expect([...a.get(8)!]).toEqual([1, 2]);
});

test("values / packedValues", () => {
	init();
	const a = ecs.defComponent({
		id: "a",
		type: "f32",
		size: 2,
		default: [1, 2],
	})!;
	expect(a.add(8)).toBeTrue();
	expect(a.add(9, [10, 20])).toBeTrue();
	expect([...a.packedValues()]).toEqual([1, 2, 10, 20]);
	expect(
		equiv(
			[...a.values()],
			[
				[10, 20],
				[1, 2],
			]
		)
	);
});

test("resize", () => {
	init();
	const a = ecs.defComponent({
		id: "a",
		type: "f32",
		size: 2,
		default: [1, 2],
	})!;
	const b = ecs.defComponent({ id: "b", default: "red" })!;
	const g = ecs.defGroup([a, b], [a, b]);
	const eid = ecs.defEntity([a, b]);
	expect(g.getEntity(eid)).toEqual({
		a: new Float32Array([1, 2]),
		b: "red",
		id: 0,
	});
	expect(a.sparse.length).toBe(16);
	expect(b.sparse.length).toBe(16);
	ecs.setCapacity(32);
	expect(a.sparse.length).toBe(32);
	expect(b.sparse.length).toBe(32);
	expect(g.getEntity(eid)).toEqual({
		a: new Float32Array([1, 2]),
		b: "red",
		id: 0,
	});
});
