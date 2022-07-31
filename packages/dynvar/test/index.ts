import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { dynvar } from "../src/index.js";

group("dynvar", {
	basic: () => {
		const a = dynvar(1);
		assert.strictEqual(a.deref(), 1);
		a.bind(2);
		assert.strictEqual(a.deref(), 2);
		a.bind(3);
		assert.strictEqual(a.deref(), 3);
		a.unbind();
		assert.strictEqual(a.deref(), 2);
		a.set(4);
		assert.strictEqual(a.deref(), 4);
		a.unbind();
		assert.strictEqual(a.deref(), 1);
		assert.throws(() => a.unbind());
	},

	withBinding: () => {
		const res: number[] = [];
		const a = dynvar(1);

		const collect = () => {
			const x = a.deref();
			res.push(x);
			if (x < 4) a.withBinding(x + 1, collect);
			res.push(a.deref() * 10);
		};
		collect();

		assert.deepStrictEqual(res, [1, 2, 3, 4, 40, 30, 20, 10]);
		assert.throws(() => a.unbind());
	},

	"withBinding (error)": () => {
		const a = dynvar(1);
		a.withBinding(2, () => {
			try {
				a.withBinding(3, () => {
					throw new Error();
				});
			} catch (_) {}
			assert.strictEqual(a.deref(), 2);
		});
		assert.strictEqual(a.deref(), 1);
	},
});
