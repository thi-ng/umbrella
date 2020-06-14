import * as assert from "assert";
import { cons } from "../src";

describe("cons", () => {
    it("cons", () => {
        assert.equal(cons(1).first(), 1);
        assert.equal(cons(1).next(), undefined);
        assert.equal(cons(1, cons(2)).next()!.first(), 2);
        assert.equal(cons(1, cons(2)).next()!.next(), undefined);
    });
});
