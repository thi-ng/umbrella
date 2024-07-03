import { beforeEach, describe, expect, test } from "bun:test";
import { Location, zipper } from "../src/index.js";

interface Branch {
	type: "root" | "branch";
	children: Node[];
}
interface Leaf {
	type: "leaf";
	value: number;
}

type Node = Branch | Leaf;

let tree: Branch;
let a: Location<Node>;

describe("custom", () => {
	beforeEach(() => {
		tree = {
			type: "root",
			children: [
				{
					type: "branch",
					children: [
						{ type: "leaf", value: 1 },
						{ type: "leaf", value: 2 },
					],
				},
				{ type: "leaf", value: 3 },
				{
					type: "branch",
					children: [
						{ type: "leaf", value: 4 },
						{
							type: "branch",
							children: [{ type: "leaf", value: 5 }],
						},
					],
				},
			],
		};
		a = zipper<Node>(
			{
				branch: (x) => x.type !== "leaf",
				children: (x) => (<Branch>x).children,
				factory: (src, children) => ({
					type: (<Branch>src).type,
					children,
				}),
			},
			tree
		);
	});

	test("next", () => {
		expect(a.node).toEqual(tree);
		expect(a.next!.node).toEqual(tree.children[0]);
		expect(a.next!.next!.node).toEqual((<any>tree).children[0].children[0]);
		expect(a.next!.next!.next!.node).toEqual(
			(<any>tree).children[0].children[1]
		);
		expect(a.next!.next!.next!.next!.node).toEqual((<any>tree).children[1]);
		expect(a.next!.next!.next!.next!.next!.node).toEqual(
			(<any>tree).children[2]
		);
		expect(a.next!.next!.next!.next!.next!.next!.node).toEqual(
			(<any>tree).children[2].children[0]
		);
		expect(a.next!.next!.next!.next!.next!.next!.next!.node).toEqual(
			(<any>tree).children[2].children[1]
		);
		expect(a.next!.next!.next!.next!.next!.next!.next!.next!.node).toEqual(
			(<any>tree).children[2].children[1].children[0]
		);
		expect(
			a.next!.next!.next!.next!.next!.next!.next!.next!.next
		).toBeUndefined();
	});

	test("replace", () => {
		expect(
			a.next!.next!.next!.replace({ type: "leaf", value: 10 }).up!.root
		).toEqual({
			type: "root",
			children: [
				{
					type: "branch",
					children: [
						{ type: "leaf", value: 1 },
						{ type: "leaf", value: 10 },
					],
				},
				...tree.children.slice(1),
			],
		});
		expect(
			a.next!.rightmost.down!.right!.down!.replace({
				type: "leaf",
				value: 10,
			}).up!.root
		).toEqual({
			type: "root",
			children: [
				...tree.children.slice(0, 2),
				{
					type: "branch",
					children: [
						{ type: "leaf", value: 4 },
						{
							type: "branch",
							children: [{ type: "leaf", value: 10 }],
						},
					],
				},
			],
		});
	});
});
