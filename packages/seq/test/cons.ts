import * as assert from "assert";
import { cons } from "../src";

describe("cons", () => {
    it("cons", () => {
        assert.strictEqual(cons(1).first(), 1);
        assert.strictEqual(cons(1).next(), undefined);
        assert.strictEqual(cons(1, cons(2)).next()!.first(), 2);
        assert.strictEqual(cons(1, cons(2)).next()!.next(), undefined);
    });
});
