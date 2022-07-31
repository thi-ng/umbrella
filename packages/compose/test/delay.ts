import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { delay } from "../src/index.js";

group("delay", {
	"only executes once": () => {
		let num = 0;
		const a = delay(() => ++num);
		assert.ok(!a.isRealized());
		assert.strictEqual(a.deref(), 1);
		assert.strictEqual(a.deref(), 1);
		assert.ok(a.isRealized());
	},
});
