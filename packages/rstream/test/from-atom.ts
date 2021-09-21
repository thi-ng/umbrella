import { Atom, Cursor, History } from "@thi.ng/atom";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { fromAtom } from "../src";

// prettier-ignore
group("fromAtom", {

    "works with atom": ({done}) => {
        let a = new Atom(0);
        let src = fromAtom(a, { emitFirst:false });
        let calledNext = false;
        src.subscribe({
            next(x) {
                assert.strictEqual(x, 23);
                calledNext = true;
            },
            done() {
                assert.ok(calledNext, "not called next()");
                done();
            },
            error() {
                assert.fail("called error()");
            }
        });
        a.reset(23);
        src.done();
    },

    "works with cursor": ({done}) => {
        let state = { a: { b: {}, d: { e: 42 } } };
        let a = new Atom(state);
        let c = new Cursor(a, "a.b.c");
        let src = fromAtom(c, { emitFirst: false });
        let calledNext = false;
        src.subscribe({
            next(x) {
                assert.strictEqual(x, 23);
                calledNext = true;
            },
            done() {
                assert.ok(calledNext, "not called next()");
                assert. deepStrictEqual(a.deref(), { a: { b: { c: 23 }, d: { e: 42 } } });
                assert.strictEqual(a.deref().a.d, state.a.d);
                done();
            },
            error() {
                assert.fail("called error()");
            }
        });
        c.reset(23);
        src.done();
    },

    "works with history (single)": () => {
        let a = new Atom({});
        let c = new Cursor(a, "a.b");
        let h = new History(c);
        let src = fromAtom<any>(h);
        let buf: any[] = [];
        src.subscribe({ next(x) { buf.push(x); } });
        h.reset(1);
        h.reset(2);
        h.reset({ c: 3 });
        assert. deepStrictEqual(a.deref(), { a: { b: { c: 3 } } });
        h.undo();
        assert. deepStrictEqual(a.deref(), { a: { b: 2 } });
        h.redo();
        assert. deepStrictEqual(a.deref(), { a: { b: { c: 3 } } });
        h.undo();
        assert. deepStrictEqual(a.deref(), { a: { b: 2 } });
        h.undo();
        assert. deepStrictEqual(a.deref(), { a: { b: 1 } });
        h.undo();
        assert. deepStrictEqual(a.deref(), { a: { b: undefined } });
        src.done();
        assert. deepStrictEqual(buf, [undefined, 1, 2, { c: 3 }, 2, { c: 3 }, 2, 1, undefined]);
    },

    "works with history (multiple)": () => {
        let a = new Atom({});
        let h = new History(a);
        let c1 = new Cursor(a, "a.b");
        let c2 = new Cursor(a, "c");
        let src1 = fromAtom(c1);
        let src2 = fromAtom(c2);
        let buf1:any[] = [];
        let buf2:any[] = [];
        src1.subscribe({ next(x) { buf1.push(x); } });
        src2.subscribe({ next(x) { buf2.push(x); } });
        h.record();
        c1.reset(1);

        h.record();
        c1.reset(2);
        c2.reset(10);

        h.record();
        c1.reset(3);

        h.record();
        c2.reset(20);

        assert. deepStrictEqual(buf1, [undefined, 1, 2, 3]);
        assert. deepStrictEqual(buf2, [undefined, 10, 20]);

        h.undo();
        h.undo();
        h.redo();
        h.redo();
        h.undo();
        h.undo();
        h.undo();
        h.undo();
        src1.done();
        src2.done();

        assert. deepStrictEqual(buf1, [undefined, 1, 2, 3, 2, 3, 2, 1, undefined]);
        assert. deepStrictEqual(buf2, [undefined, 10, 20, 10, 20, 10, undefined]);
    },

});
