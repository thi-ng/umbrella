import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { syncRAF, stream, State } from "../src/index.js";

group("syncRAF", {
	basic: ({ done }) => {
		const a = stream();
		const a2 = syncRAF(a);
		a.next(1);
		assert.strictEqual(a.deref(), 1);
		assert.strictEqual(a2.deref(), undefined);
		setTimeout(() => {
			assert.strictEqual(a.deref(), 2);
			assert.strictEqual(a2.deref(), 2);
			done();
		}, 20);
		a.next(2);
	},

	"early done": ({ done }) => {
		const a = stream();
		const a2 = syncRAF(a);
		a.next(1);
		a.done();
		setTimeout(() => {
			assert.strictEqual(a.getState(), State.UNSUBSCRIBED);
			assert.strictEqual(a.deref(), undefined);
			assert.strictEqual(a2.getState(), State.UNSUBSCRIBED);
			assert.strictEqual(a2.deref(), undefined);
			done();
		}, 20);
	},
});
