import { expect, test } from "bun:test";
import {
	EVENT_ALL,
	INotifyMixin,
	type Event,
	type INotify,
	type Listener,
} from "../src/index.js";

test("mixins INotify", () => {
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
	expect(foo.addListener("x", l)).toBeTrue();
	expect(foo.addListener(EVENT_ALL, lall)).toBeTrue();
	foo.notify({ id: "x", value: 1 });
	expect(res).toEqual({ x: 1, [EVENT_ALL]: 1 });
	expect(foo.removeListener("x", l)).toBeTrue();
	expect((<any>foo)._listeners.x === undefined);
	expect(foo.removeListener("x", l)).toBeFalse();
	foo.notify({ id: "x", value: 2 });
	expect(res).toEqual({ x: 1, [EVENT_ALL]: 2 });
	expect(foo.removeListener(EVENT_ALL, lall)).toBeTrue();
	expect((<any>foo)._listeners[EVENT_ALL] === undefined);
	expect((<any>foo)._listeners).toEqual({});
	foo.notify({ id: "x", value: 3 });
	expect(res).toEqual({ x: 1, [EVENT_ALL]: 2 });
});
