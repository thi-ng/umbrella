import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { aabb, ellipse, polygon, rect } from "../src/index.js";

group("ctors", {
	aabb: () => {
		let e = aabb({ a: 1 });
		assert.deepStrictEqual(e.pos, [0, 0, 0]);
		assert.deepStrictEqual(e.size, [1, 1, 1]);
		assert.deepStrictEqual(e.attribs, { a: 1 });
		e = aabb(1);
		assert.deepStrictEqual(e.pos, [0, 0, 0]);
		assert.deepStrictEqual(e.size, [1, 1, 1]);
		assert.deepStrictEqual(e.attribs, undefined);
		e = aabb([1, 2, 3]);
		assert.deepStrictEqual(e.pos, [0, 0, 0]);
		assert.deepStrictEqual(e.size, [1, 2, 3]);
		assert.deepStrictEqual(e.attribs, undefined);
		e = aabb([1, 2, 3], { a: 2 });
		assert.deepStrictEqual(e.pos, [0, 0, 0]);
		assert.deepStrictEqual(e.size, [1, 2, 3]);
		assert.deepStrictEqual(e.attribs, { a: 2 });
		e = aabb([1, 2, 3], [4, 5, 6], { a: 3 });
		assert.deepStrictEqual(e.pos, [1, 2, 3]);
		assert.deepStrictEqual(e.size, [4, 5, 6]);
		assert.deepStrictEqual(e.attribs, { a: 3 });
		e = aabb([1, 2, 3], [4, 5, 6], undefined);
		assert.deepStrictEqual(e.pos, [1, 2, 3]);
		assert.deepStrictEqual(e.size, [4, 5, 6]);
		assert.deepStrictEqual(e.attribs, undefined);
	},

	ellipse: () => {
		let e = ellipse({ a: 1 });
		assert.deepStrictEqual(e.pos, [0, 0]);
		assert.deepStrictEqual(e.r, [1, 1]);
		assert.deepStrictEqual(e.attribs, { a: 1 });
		e = ellipse(1);
		assert.deepStrictEqual(e.pos, [0, 0]);
		assert.deepStrictEqual(e.r, [1, 1]);
		assert.deepStrictEqual(e.attribs, undefined);
		e = ellipse([1, 2]);
		assert.deepStrictEqual(e.pos, [0, 0]);
		assert.deepStrictEqual(e.r, [1, 2]);
		assert.deepStrictEqual(e.attribs, undefined);
		e = ellipse([1, 2], { a: 2 });
		assert.deepStrictEqual(e.pos, [0, 0]);
		assert.deepStrictEqual(e.r, [1, 2]);
		assert.deepStrictEqual(e.attribs, { a: 2 });
		e = ellipse([1, 2], [3, 4], { a: 3 });
		assert.deepStrictEqual(e.pos, [1, 2]);
		assert.deepStrictEqual(e.r, [3, 4]);
		assert.deepStrictEqual(e.attribs, { a: 3 });
		e = ellipse([1, 2], [3, 4], undefined);
		assert.deepStrictEqual(e.pos, [1, 2]);
		assert.deepStrictEqual(e.r, [3, 4]);
		assert.deepStrictEqual(e.attribs, undefined);
	},

	polygon: () => {
		let p = polygon();
		assert.deepStrictEqual(p.points, []);
		assert.deepStrictEqual(p.attribs, undefined);
		p = polygon([[0, 0]], { a: 2 });
		assert.deepStrictEqual(p.points, [[0, 0]]);
		assert.deepStrictEqual(p.attribs, { a: 2 });
	},

	rect: () => {
		let r = rect({ a: 1 });
		assert.deepStrictEqual(r.pos, [0, 0]);
		assert.deepStrictEqual(r.size, [1, 1]);
		assert.deepStrictEqual(r.attribs, { a: 1 });
		r = rect(1);
		assert.deepStrictEqual(r.pos, [0, 0]);
		assert.deepStrictEqual(r.size, [1, 1]);
		assert.deepStrictEqual(r.attribs, undefined);
		r = rect([1, 2]);
		assert.deepStrictEqual(r.pos, [0, 0]);
		assert.deepStrictEqual(r.size, [1, 2]);
		assert.deepStrictEqual(r.attribs, undefined);
		r = rect([1, 2], { a: 2 });
		assert.deepStrictEqual(r.pos, [0, 0]);
		assert.deepStrictEqual(r.size, [1, 2]);
		assert.deepStrictEqual(r.attribs, { a: 2 });
		r = rect([1, 2], [3, 4], { a: 3 });
		assert.deepStrictEqual(r.pos, [1, 2]);
		assert.deepStrictEqual(r.size, [3, 4]);
		assert.deepStrictEqual(r.attribs, { a: 3 });
		r = rect([1, 2], [3, 4], undefined);
		assert.deepStrictEqual(r.pos, [1, 2]);
		assert.deepStrictEqual(r.size, [3, 4]);
		assert.deepStrictEqual(r.attribs, undefined);
	},
});
