import * as assert from "assert";
import { group } from "@thi.ng/testament";
import {
	Event,
	EVENT_ALL,
	INotify,
	INotifyMixin,
	Listener,
} from "../src/index.js";

group("mixins", {
	INotify: () => {
		@INotifyMixin
		class Foo implements INotify {
			addListener(_: string, __: Listener, ___?: any): boolean {
				throw new Error();
			}
			removeListener(_: string, __: Listener, ___?: any): boolean {
				throw new Error();
			}
			notify(_: Event): boolean {
				throw new Error();
			}
		}

		const res: any = {};
		const foo = new Foo();
		const l = (e: Event) => (res[e.id] = e.value);
		const lall = (e: Event) => (res[EVENT_ALL] = e.value);
		assert.ok(foo.addListener("x", l));
		assert.ok(foo.addListener(EVENT_ALL, lall));
		foo.notify({ id: "x", value: 1 });
		assert.deepStrictEqual(res, { x: 1, [EVENT_ALL]: 1 });
		assert.ok(foo.removeListener("x", l));
		assert.ok((<any>foo)._listeners.x === undefined);
		assert.ok(!foo.removeListener("x", l));
		foo.notify({ id: "x", value: 2 });
		assert.deepStrictEqual(res, { x: 1, [EVENT_ALL]: 2 });
		assert.ok(foo.removeListener(EVENT_ALL, lall));
		assert.ok((<any>foo)._listeners[EVENT_ALL] === undefined);
		assert.deepStrictEqual((<any>foo)._listeners, {});
		foo.notify({ id: "x", value: 3 });
		assert.deepStrictEqual(res, { x: 1, [EVENT_ALL]: 2 });
	},
});
