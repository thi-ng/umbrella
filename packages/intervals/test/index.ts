import * as assert from "assert";
import {
    clamp,
    Classifier,
    classify,
    compare,
    intersection,
    interval as i,
    samples,
    union,
} from "../src";

describe("intervals", () => {
    it("classify", () => {
        const check = (a: string, b: string, res: Classifier) =>
            assert.strictEqual(classify(i(a), i(b)), res, String(res));
        check("[0..100]", "[0..100]", Classifier.EQUIV);
        check("[0..100]", "(0..100]", Classifier.SUPERSET);
        check("[0..100]", "[0..100)", Classifier.SUPERSET);
        check("[0..100]", "(0..100)", Classifier.SUPERSET);
        check("[0..100]", "[10..90]", Classifier.SUPERSET);
        check("[10..90]", "[0..100]", Classifier.SUBSET);
        check("[0..100]", "[100..101]", Classifier.OVERLAP_RIGHT);
        check("[0..100]", "(100..101]", Classifier.DISJOINT_LEFT);
        check("[0..100]", "[-1..0]", Classifier.OVERLAP_LEFT);
        check("[0..100]", "[-1..0)", Classifier.DISJOINT_RIGHT);
    });

    it("union", () => {
        const a = i("[0..100]");
        assert(union(a, a).equiv(a), "self");
        assert(union(a, i("(0..100)")).equiv(a), "u0");
        assert(union(a, i("[0..100)")).equiv(a), "u1");
        assert(union(a, i("(0..100]")).equiv(a), "u2");
        assert(union(a, i("[0..100]")).equiv(a), "u3");

        assert(union(a, i("(-1..99)")).equiv(i("(-1..100]")), "u4");
        assert(union(a, i("[-1..99)")).equiv(i("[-1..100]")), "u5");
        assert(union(a, i("[1..101)")).equiv(i("[0..101)")), "u6");
        assert(union(a, i("[1..101]")).equiv(i("[0..101]")), "u7");
        assert(union(a, i("(-1..101)")).equiv(i("(-1..101)")), "u8");
        assert(union(a, i("[-1..101)")).equiv(i("[-1..101)")), "u9");
        assert(union(a, i("(-1..101]")).equiv(i("(-1..101]")), "u10");
        assert(union(a, i("[-1..101]")).equiv(i("[-1..101]")), "u11");

        assert(union(a, i("(0..0)")).equiv(a), "u12");
        assert(union(a, i("[0..0]")).equiv(a), "u13");
        assert(union(a, i("(100..100)")).equiv(a), "u14");
        assert(union(a, i("[100..100]")).equiv(a), "u15");

        assert(union(a, i("[-1..0]")).equiv(i("[-1..100]")), "u16");
        assert(union(a, i("[-1..0)")).equiv(i("[-1..100]")), "u17");
        assert(union(a, i("[100..101]")).equiv(i("[0..101]")), "u18");
        assert(union(a, i("(100..101]")).equiv(i("[0..101]")), "u19");
    });

    it("intersection", () => {
        const a = i("[0..100]");
        assert(intersection(a, a)!.equiv(a), "self");
        assert(intersection(a, i("(0..100)"))!.equiv(i("(0..100)")), "i0");
        assert(intersection(a, i("[0..100)"))!.equiv(i("[0..100)")), "i1");
        assert(intersection(a, i("(0..100]"))!.equiv(i("(0..100]")), "i2");
        assert(intersection(a, i("[0..100]"))!.equiv(i("[0..100]")), "i3");

        assert(intersection(a, i("(-1..99)"))!.equiv(i("[0..99)")), "i4");
        assert(intersection(a, i("[-1..99)"))!.equiv(i("[0..99)")), "i5");
        assert(intersection(a, i("[1..101)"))!.equiv(i("[1..100]")), "i6");
        assert(intersection(a, i("[1..101]"))!.equiv(i("[1..100]")), "i7");
        assert(intersection(a, i("(-1..101)"))!.equiv(i("[0..100]")), "i8");
        assert(intersection(a, i("[-1..101)"))!.equiv(i("[0..100]")), "i9");
        assert(intersection(a, i("(-1..101]"))!.equiv(i("[0..100]")), "i10");
        assert(intersection(a, i("[-1..101]"))!.equiv(i("[0..100]")), "i11");

        assert(intersection(a, i("(0..0)")) === undefined, "i12");
        assert(intersection(a, i("[0..0]"))!.equiv(i("[0..0]")), "i13");
        assert(intersection(a, i("(100..100)")) === undefined, "i14");
        assert(intersection(a, i("[100..100]"))!.equiv(i("[100..100]")), "i15");

        assert(intersection(a, i("[-1..0]"))!.equiv(i("[0..0]")), "i16");
        assert(intersection(a, i("[-1..0)")) === undefined, "i17");
        assert(intersection(a, i("[100..101]"))!.equiv(i("[100..100]")), "i18");
        assert(intersection(a, i("(100..101]")) === undefined, "i19");
    });

    it("compare", () => {
        const a = i("[0..1]");
        const b = i("(0..1]");
        const c = i("[0..1)");
        const d = i("(0..1)");
        assert.strictEqual(compare(a, a), 0, "aa");
        assert.strictEqual(compare(a, b), -1, "ab");
        assert.strictEqual(compare(a, c), 1, "ac");
        assert.strictEqual(compare(a, d), -1, "ad");
    });

    it("clamp", () => {
        const eps = 1e-3;
        for (let [x, a, b, c, d] of [
            [-1, 0, eps, 0, eps],
            [2, 1, 1, 1 - eps, 1 - eps],
            [0.5, 0.5, 0.5, 0.5, 0.5],
        ]) {
            assert.strictEqual(clamp(i("[0,1]"), x, eps), a);
            assert.strictEqual(clamp(i("(0,1]"), x, eps), b);
            assert.strictEqual(clamp(i("[0,1)"), x, eps), c);
            assert.strictEqual(clamp(i("(0,1)"), x, eps), d);
        }
    });

    it("samples", () => {
        assert.deepStrictEqual(
            [...samples(i(10, 12), 5)],
            [10, 10.5, 11, 11.5, 12]
        );
        assert.deepStrictEqual(
            [...samples(i(10, 12, true, false), 5)],
            [10.5, 11, 11.5, 12]
        );
        assert.deepStrictEqual(
            [...samples(i(10, 12, false, true), 5)],
            [10, 10.5, 11, 11.5]
        );
        assert.deepStrictEqual(
            [...samples(i(10, 12, true, true), 5)],
            [10.5, 11, 11.5]
        );
    });
});
