import * as assert from "assert";
import { Classifier, interval as i } from "../src";

describe("intervals", () => {
    it("classify", () => {
        const check = (a: string, b: string, res: Classifier) =>
            assert.strictEqual(i(a).classify(i(b)), res, String(res));
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
        assert(a.union(a).equiv(a), "self");
        assert(a.union(i("(0..100)")).equiv(a), "u0");
        assert(a.union(i("[0..100)")).equiv(a), "u1");
        assert(a.union(i("(0..100]")).equiv(a), "u2");
        assert(a.union(i("[0..100]")).equiv(a), "u3");

        assert(a.union(i("(-1..99)")).equiv(i("(-1..100]")), "u4");
        assert(a.union(i("[-1..99)")).equiv(i("[-1..100]")), "u5");
        assert(a.union(i("[1..101)")).equiv(i("[0..101)")), "u6");
        assert(a.union(i("[1..101]")).equiv(i("[0..101]")), "u7");
        assert(a.union(i("(-1..101)")).equiv(i("(-1..101)")), "u8");
        assert(a.union(i("[-1..101)")).equiv(i("[-1..101)")), "u9");
        assert(a.union(i("(-1..101]")).equiv(i("(-1..101]")), "u10");
        assert(a.union(i("[-1..101]")).equiv(i("[-1..101]")), "u11");

        assert(a.union(i("(0..0)")).equiv(a), "u12");
        assert(a.union(i("[0..0]")).equiv(a), "u13");
        assert(a.union(i("(100..100)")).equiv(a), "u14");
        assert(a.union(i("[100..100]")).equiv(a), "u15");

        assert(a.union(i("[-1..0]")).equiv(i("[-1..100]")), "u16");
        assert(a.union(i("[-1..0)")).equiv(i("[-1..100]")), "u17");
        assert(a.union(i("[100..101]")).equiv(i("[0..101]")), "u18");
        assert(a.union(i("(100..101]")).equiv(i("[0..101]")), "u19");
    });

    it("intersection", () => {
        const a = i("[0..100]");
        assert(a.intersection(a)!.equiv(a), "self");
        assert(a.intersection(i("(0..100)"))!.equiv(i("(0..100)")), "i0");
        assert(a.intersection(i("[0..100)"))!.equiv(i("[0..100)")), "i1");
        assert(a.intersection(i("(0..100]"))!.equiv(i("(0..100]")), "i2");
        assert(a.intersection(i("[0..100]"))!.equiv(i("[0..100]")), "i3");

        assert(a.intersection(i("(-1..99)"))!.equiv(i("[0..99)")), "i4");
        assert(a.intersection(i("[-1..99)"))!.equiv(i("[0..99)")), "i5");
        assert(a.intersection(i("[1..101)"))!.equiv(i("[1..100]")), "i6");
        assert(a.intersection(i("[1..101]"))!.equiv(i("[1..100]")), "i7");
        assert(a.intersection(i("(-1..101)"))!.equiv(i("[0..100]")), "i8");
        assert(a.intersection(i("[-1..101)"))!.equiv(i("[0..100]")), "i9");
        assert(a.intersection(i("(-1..101]"))!.equiv(i("[0..100]")), "i10");
        assert(a.intersection(i("[-1..101]"))!.equiv(i("[0..100]")), "i11");

        assert(a.intersection(i("(0..0)")) === undefined, "i12");
        assert(a.intersection(i("[0..0]"))!.equiv(i("[0..0]")), "i13");
        assert(a.intersection(i("(100..100)")) === undefined, "i14");
        assert(a.intersection(i("[100..100]"))!.equiv(i("[100..100]")), "i15");

        assert(a.intersection(i("[-1..0]"))!.equiv(i("[0..0]")), "i16");
        assert(a.intersection(i("[-1..0)")) === undefined, "i17");
        assert(a.intersection(i("[100..101]"))!.equiv(i("[100..100]")), "i18");
        assert(a.intersection(i("(100..101]")) === undefined, "i19");
    });

    it("compare", () => {
        const a = i("[0..1]");
        const b = i("(0..1]");
        const c = i("[0..1)");
        const d = i("(0..1)");
        assert.strictEqual(a.compare(a), 0, "aa");
        assert.strictEqual(a.compare(b), -1, "ab");
        assert.strictEqual(a.compare(c), 1, "ac");
        assert.strictEqual(a.compare(d), -1, "ad");
    });

    it("clamp", () => {
        const eps = 1e-3;
        for (let [x, a, b, c, d] of [
            [-1, 0, eps, 0, eps],
            [2, 1, 1, 1 - eps, 1 - eps],
            [0.5, 0.5, 0.5, 0.5, 0.5],
        ]) {
            assert.strictEqual(i("[0,1]").clamp(x, eps), a);
            assert.strictEqual(i("(0,1]").clamp(x, eps), b);
            assert.strictEqual(i("[0,1)").clamp(x, eps), c);
            assert.strictEqual(i("(0,1)").clamp(x, eps), d);
        }
    });
});
