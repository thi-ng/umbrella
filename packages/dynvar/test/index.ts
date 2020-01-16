import * as assert from "assert";
import { dynvar } from "../src";

describe("dynvar", () => {
    it("basic", () => {
        const a = dynvar(1);
        assert.equal(a.deref(), 1);
        a.bind(2);
        assert.equal(a.deref(), 2);
        a.bind(3);
        assert.equal(a.deref(), 3);
        a.unbind();
        assert.equal(a.deref(), 2);
        a.set(4);
        assert.equal(a.deref(), 4);
        a.unbind();
        assert.equal(a.deref(), 1);
        assert.throws(() => a.unbind());
    });

    it("withBinding", () => {
        const res: number[] = [];
        const a = dynvar(1);

        const collect = () => {
            const x = a.deref();
            res.push(x);
            if (x < 4) a.withBinding(x + 1, collect);
            res.push(a.deref() * 10);
        };
        collect();

        assert.deepEqual(res, [1, 2, 3, 4, 40, 30, 20, 10]);
        assert.throws(() => a.unbind());
    });

    it("withBinding (error)", () => {
        const a = dynvar(1);
        a.withBinding(2, () => {
            try {
                a.withBinding(3, () => {
                    throw new Error();
                });
            } catch (_) {}
            assert.equal(a.deref(), 2);
        });
        assert.equal(a.deref(), 1);
    });
});
