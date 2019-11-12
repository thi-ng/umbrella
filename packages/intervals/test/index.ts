import * as assert from "assert";
import { Classifier, interval as i } from "../src";

describe("intervals", () => {
    it("classify", () => {
        const check = (a: string, b: string, res: Classifier) =>
            assert.equal(i(a).classify(i(b)), res, String(res));
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
});
