import * as assert from "assert";

import { Event, INotify, EVENT_ALL } from "../src/api";
import * as mixins from "../src/mixins";

describe("mixins", () => {

    it("INotify", () => {

        @mixins.INotify
        class Foo implements INotify {
            addListener(_: string, __: (e: Event) => void, ___?: any): boolean {
                throw new Error();
            }
            removeListener(_: string, __: (e: Event) => void, ___?: any): boolean {
                throw new Error();
            }
            notify(_: Event) {
                throw new Error();
            }
        }

        const res: any = {};
        const foo = new Foo();
        const l = (e) => res[e.id] = e.value;
        const lall = (e) => res[EVENT_ALL] = e.value;
        assert.doesNotThrow(() => foo.addListener("x", l));
        assert.doesNotThrow(() => foo.addListener(EVENT_ALL, lall));
        foo.notify({ id: "x", value: 1 });
        assert.deepEqual(res, { x: 1, [EVENT_ALL]: 1 });
        assert.doesNotThrow(() => foo.removeListener("x", l));
        foo.notify({ id: "x", value: 2 });
        assert.deepEqual(res, { x: 1, [EVENT_ALL]: 2 });
        assert.doesNotThrow(() => foo.removeListener(EVENT_ALL, lall));
        foo.notify({ id: "x", value: 3 });
        assert.deepEqual(res, { x: 1, [EVENT_ALL]: 2 });
    });
});