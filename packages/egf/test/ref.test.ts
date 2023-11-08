import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import { parseString } from "../src/index.js";

const $ref = (id: string) => ({ $ref: id });

test("resolve w/ prefix", () => {
	const db = parseString(
		`
@prefix thi: thi.ng/
thi:a
    partof -> thi:b
    knows -> alt.thi.ng/c

@prefix thi: alt.thi.ng/
thi:c
    diff -> thi:a
`,
		{ opts: { prefixes: true, resolve: true } }
	).nodes;
	expect(db["thi.ng/a"].partof).toEqual({ $id: "thi.ng/b" });
	expect(db["thi.ng/a"].knows.$id).toBe("alt.thi.ng/c");
	expect(db["alt.thi.ng/c"].diff.$id).toBe("alt.thi.ng/a");
});

test("resolve circular", () => {
	const db = parseString(
		`
a
    knows -> b

b
    knows -> a
`,
		{ opts: { resolve: true } }
	).nodes;
	expect(db.a.knows.$id).toBe("b");
	expect(db.b.knows.$id).toBe("a");
});

test("ref array item (unresolved)", () => {
	expect(
		equiv(
			parseString(
				`
a
    knows -> b
    knows -> c
    knows -> d

b
    name bb

c
    name cc

d
    name dd
`
			).nodes,
			{
				a: { $id: "a", knows: [$ref("b"), $ref("c"), $ref("d")] },
				b: { $id: "b", name: "bb" },
				c: { $id: "c", name: "cc" },
				d: { $id: "d", name: "dd" },
			}
		)
	).toBeTrue();
});

test("ref array item (resolved)", () => {
	expect(
		equiv(
			parseString(
				`
a
    knows -> b
    knows -> c
    knows -> d

b
    name bb

c
    name cc

d
    name dd
`,
				{ opts: { resolve: true } }
			).nodes,
			{
				a: {
					$id: "a",
					knows: [
						{ $id: "b", name: "bb" },
						{ $id: "c", name: "cc" },
						{ $id: "d", name: "dd" },
					],
				},
				b: { $id: "b", name: "bb" },
				c: { $id: "c", name: "cc" },
				d: { $id: "d", name: "dd" },
			}
		)
	).toBeTrue();
});
