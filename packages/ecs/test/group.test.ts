import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import { ECS, Group } from "../src/index.js";

const collect = (g: Group<any, any>) => {
	let res: any[] = [];
	g.forEach((x) => res.push(x));
	return res;
};

let ecs: ECS<any>;

const init = () => {
	ecs = new ECS({ capacity: 16 });
};

test("group", () => {
	init();
	const a = ecs.defComponent({ id: "a", default: () => "a" })!;
	const b = ecs.defComponent({ id: "b", type: "f32", size: 2 })!;
	const g = ecs.defGroup([a, b]);
	ecs.defEntity(["a", "b"]);
	ecs.defEntity({ a: "aa", b: [1, 2] });
	ecs.defEntity({ a: "aaa", b: [3, 4] });
	expect(g.has(0)).toBeTrue();
	expect(g.has(1)).toBeTrue();
	expect(g.has(2)).toBeTrue();
	expect(g.has(3)).toBeFalse();
	expect([...ecs.componentsForID(2)]).toEqual([a, b]);
	expect([...ecs.groupsForID(2)]).toEqual([g]);
	expect(
		equiv(collect(g), [
			{ a: "a", b: [0, 0], id: 0 },
			{ a: "aa", b: [1, 2], id: 1 },
			{ a: "aaa", b: [3, 4], id: 2 },
		])
	).toBeTrue();

	a.delete(0);
	expect(
		equiv(collect(g), [
			{ a: "aa", b: [1, 2], id: 1 },
			{ a: "aaa", b: [3, 4], id: 2 },
		])
	).toBeTrue();
	a.delete(2);
	expect(equiv(collect(g), [{ a: "aa", b: [1, 2], id: 1 }])).toBeTrue();
	a.set(1, "hi");
	expect(equiv(collect(g), [{ a: "hi", b: [1, 2], id: 1 }])).toBeTrue();
});
