// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { Node2D } from "../src/index.js";

test("scaleWithReferencePoint", () => {
	const root = new Node2D({ id: "root", translate: [100, 200] });
	const content = new Node2D({ id: "content", parent: root });
	const mpos = [-123, 456];
	const local = content.mapGlobalPoint(mpos);
	content.scaleWithReferencePoint(local, 4);
	const post = content.mapGlobalPoint(mpos);
	expect(local).toEqual(post);
});
