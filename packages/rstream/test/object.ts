import * as assert from "assert";
import { fromObject, State, stream, Subscription } from "../src/index";

type Foo = { a?: number; b: string };

describe("fromObject", () => {
    it("basic", () => {
        const obj = fromObject(<{ a?: number; b: string }>{
            a: 1,
            b: "foo",
        });
        assert(obj.streams.a instanceof Subscription);
        assert(obj.streams.b instanceof Subscription);
        assert(obj.streams.a.id.startsWith("obj-a-"));
        assert(obj.streams.b.id.startsWith("obj-b-"));

        const acc: any = { a: [], b: [] };
        obj.streams.a.subscribe({
            next(x) {
                acc.a.push(x);
            },
        });
        obj.streams.b.subscribe({
            next(x) {
                acc.b.push(x);
            },
        });
        obj.next({ a: 2, b: "bar" });
        obj.next({ b: "baz" });
        obj.done();
        assert.deepEqual(acc, {
            a: [1, 2, undefined],
            b: ["foo", "bar", "baz"],
        });
        assert.equal(obj.streams.a.getState(), State.DONE);
        assert.equal(obj.streams.b.getState(), State.DONE);
    });

    it("subscriber", () => {
        const acc: any = { a: [], b: [] };
        const obj = fromObject(<Foo>{}, ["a", "b"], { initial: false });
        obj.streams.a.subscribe({
            next(x) {
                acc.a.push(x);
            },
        });
        obj.streams.b.subscribe({
            next(x) {
                acc.b.push(x);
            },
        });

        const src = stream<Foo>();
        src.subscribe(obj);

        src.next({ a: 1, b: "foo" });
        src.next({ b: "bar" });
        src.done();
        assert.deepEqual(acc, {
            a: [1, undefined],
            b: ["foo", "bar"],
        });
        assert.equal(obj.streams.a.getState(), State.DONE);
        assert.equal(obj.streams.b.getState(), State.DONE);
    });
});
