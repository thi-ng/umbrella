import { isNumber } from "@thi.ng/checks";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { Atom } from "../src";

let a: Atom<any>;

group(
    "atom",
    {
        "can be deref'd": () => {
            assert.strictEqual(a.deref(), 23);
        },

        "can be equiv'd": () => {
            assert.ok(a.equiv(a));
            assert.ok(!a.equiv(new Atom(23)));
        },

        "can be reset": () => {
            assert.strictEqual(a.reset(24), 24);
            assert.strictEqual(a.deref(), 24);
        },

        "can be swapped": () => {
            assert.strictEqual(
                a.swap((x) => x + 1),
                24
            );
            assert.strictEqual(a.deref(), 24);
        },

        "can add & remove watch": () => {
            assert.ok(
                a.addWatch("foo", () => {}),
                "can't add watch"
            );
            assert.ok(
                (<any>a)._watches && (<any>a)._watches.foo,
                "watch missing"
            );
            assert.ok(a.removeWatch("foo"), "can't remove watch");
            assert.ok(
                !a.removeWatch("foo"),
                "should fail to remove invalid watch id"
            );
        },

        "can be watched": () => {
            a.addWatch("foo", (id, prev, curr) => {
                assert.strictEqual(id, "foo", "wrong id");
                assert.strictEqual(prev, 23, "wrong prev");
                assert.strictEqual(curr, 24, "wrong curr");
            });
            a.swap((x) => x + 1);
        },

        "can be validated": () => {
            assert.throws(() => new Atom("", isNumber));
            a = new Atom(1, isNumber);
            assert.strictEqual(a.reset(2), 2);
            assert.strictEqual(a.reset("3"), 2);
            assert.strictEqual(a.reset(null), 2);
            assert.strictEqual(
                a.swap(() => "3"),
                2
            );
            assert.strictEqual(
                a.swap(() => null),
                2
            );
        },
    },
    {
        beforeEach: () => {
            a = new Atom(23);
        },
    }
);
