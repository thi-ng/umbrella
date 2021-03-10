import * as assert from "assert";
import { fromObject, stream, Subscription } from "../src";
import { assertDone } from "./utils";

type Foo = { a?: number; b: string };

describe("fromObject", () => {
    it("basic", () => {
        const obj = fromObject(
            <{ a?: number; b: string }>{
                a: 1,
                b: "foo",
            },
            { id: "test" }
        );
        assert(obj.streams.a instanceof Subscription);
        assert(obj.streams.b instanceof Subscription);
        assert(obj.streams.a.id.startsWith("test-a"));
        assert(obj.streams.b.id.startsWith("test-b"));

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
        assert.deepStrictEqual(acc, {
            a: [1, 2, undefined],
            b: ["foo", "bar", "baz"],
        });
        assertDone(obj.streams.a);
        assertDone(obj.streams.b);
    });

    it("subscriber", () => {
        const acc: any = { a: [], b: [] };
        const obj = fromObject(<Foo>{}, { keys: ["a", "b"], initial: false });
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
        assert.deepStrictEqual(acc, {
            a: [1, undefined],
            b: ["foo", "bar"],
        });
        assertDone(obj.streams.a);
        assertDone(obj.streams.b);
    });

    it("defaults & dedupe", () => {
        const acc: any = { a: [], b: [] };
        const obj = fromObject(<Foo>{}, {
            keys: ["a", "b"],
            initial: false,
            defaults: { a: 0 },
        });
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

        obj.next({ b: "foo" });
        obj.next({ a: 1, b: "bar" });
        obj.next({ a: 0, b: "bar" });
        obj.next({ a: 2, b: "bar" });
        obj.next({ a: 2, b: "baz" });
        obj.next({ b: "baz" });
        assert.deepStrictEqual(acc, {
            a: [0, 1, 0, 2, 0],
            b: ["foo", "bar", "baz"],
        });
    });
});
