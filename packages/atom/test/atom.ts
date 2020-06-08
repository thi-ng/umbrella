import { isNumber } from "@thi.ng/checks";
import * as assert from "assert";
import { Atom } from "../src/index";

describe("atom", function () {
    let a: Atom<any>;

    beforeEach(() => {
        a = new Atom(23);
    });

    it("can be deref'd", () => {
        assert.equal(a.deref(), 23);
    });

    it("can be equiv'd", () => {
        assert.ok(a.equiv(a));
        assert.ok(!a.equiv(new Atom(23)));
    });

    it("can be reset", () => {
        assert.equal(a.reset(24), 24);
        assert.equal(a.deref(), 24);
    });

    it("can be swapped", () => {
        assert.equal(
            a.swap((x) => x + 1),
            24
        );
        assert.equal(a.deref(), 24);
    });

    it("can add & remove watch", () => {
        assert.ok(
            a.addWatch("foo", () => {}),
            "can't add watch"
        );
        assert.ok((<any>a)._watches && (<any>a)._watches.foo, "watch missing");
        assert.ok(a.removeWatch("foo"), "can't remove watch");
        assert.ok(
            !a.removeWatch("foo"),
            "should fail to remove invalid watch id"
        );
    });

    it("can be watched", () => {
        a.addWatch("foo", (id, prev, curr) => {
            assert.equal(id, "foo", "wrong id");
            assert.equal(prev, 23, "wrong prev");
            assert.equal(curr, 24, "wrong curr");
        });
        a.swap((x) => x + 1);
    });

    it("can be validated", () => {
        assert.throws(() => new Atom("", isNumber));
        a = new Atom(1, isNumber);
        assert.equal(a.reset(2), 2);
        assert.equal(a.reset("3"), 2);
        assert.equal(a.reset(null), 2);
        assert.equal(
            a.swap(() => "3"),
            2
        );
        assert.equal(
            a.swap(() => null),
            2
        );
    });
});
