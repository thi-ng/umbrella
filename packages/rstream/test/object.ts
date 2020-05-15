import * as assert from "assert";
import { fromObject, State, Subscription } from "../src/index";

describe("fromObject", () => {
    it("basic", () => {
        const streams = fromObject(<{ a?: number; b: string }>{
            a: 1,
            b: "foo",
        });
        assert(streams.a instanceof Subscription);
        assert(streams.b instanceof Subscription);
        assert(streams.a.id.startsWith("obj-a-"));
        assert(streams.b.id.startsWith("obj-b-"));

        const acc: any = { a: [], b: [] };
        streams.a.subscribe({
            next(x) {
                acc.a.push(x);
            },
        });
        streams.b.subscribe({
            next(x) {
                acc.b.push(x);
            },
        });
        streams.__next({ a: 2, b: "bar" });
        streams.__next({ b: "baz" });
        streams.__done();
        assert.deepEqual(acc, {
            a: [1, 2, undefined],
            b: ["foo", "bar", "baz"],
        });
        assert.equal(streams.a.getState(), State.DONE);
        assert.equal(streams.b.getState(), State.DONE);
    });
});
